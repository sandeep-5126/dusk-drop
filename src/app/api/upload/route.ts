import { NextRequest, NextResponse } from "next/server";
import createUploadSession from "@/utils/createUploadSession";
import generateFileID from "@/utils/generateFileID";
import dbConnect from "@lib/dbConnect";
import calculateFileExpireTime from "@/utils/calculateFileExpireTime";
import getFileFolderID from "@/utils/getFileFolderID";
import setFolderExpireTime from "@/utils/setFolderExpireTime";
import { sendProgress } from "../sse/sseManager";
import createFileDownloadLink from "@/utils/createFileDownloadLink";
import formatFileSize from "@/utils/formatFileSize";
import axios from "axios";
import { sendMessage } from "../sse/sseManager";

export async function POST(req: NextRequest) {
  try {
    const filename = decodeURIComponent(req.headers.get("X-File-Name") || "");
    const fileSize = parseInt(req.headers.get("X-File-Size") || "0", 10);
    const fileExpiration = req.headers.get("X-File-Expiration") || "";
    const sessionId = req.headers.get("X-Session-Id") || "";
    const { sharePointExpireTime: fileExpireTime, mongodbExpireTime } =
      calculateFileExpireTime(parseInt(fileExpiration));

    await dbConnect();

    let CHUNK_SIZE = 500 * 1024;
    if (fileSize > 50 * 1024 * 1024 * 1024) CHUNK_SIZE = 50 * 1024 * 1024;
    else if (fileSize > 10 * 1024 * 1024 * 1024) CHUNK_SIZE = 25 * 1024 * 1024;
    else if (fileSize > 1 * 1024 * 1024 * 1024) CHUNK_SIZE = 15 * 1024 * 1024;
    else if (fileSize > 100 * 1024 * 1024) CHUNK_SIZE = 10 * 1024 * 1024;
    else if (fileSize > 50 * 1024 * 1024) CHUNK_SIZE = 5 * 1024 * 1024;
    else if (fileSize > 10 * 1024 * 1024) CHUNK_SIZE = 2 * 1024 * 1024;
    else if (fileSize > 2 * 1024 * 1024) CHUNK_SIZE = 1 * 1024 * 1024;

    if (!filename || !fileSize) {
      return NextResponse.json(
        { message: "Missing required headers" },
        { status: 400 }
      );
    }

    const fileId = await generateFileID(mongodbExpireTime);
    const { uploadSessionURL, accessToken } = await createUploadSession(
      fileId,
      filename
    );

    const reader = req.body?.getReader();
    if (!reader)
      return NextResponse.json(
        { message: "No readable stream" },
        { status: 400 }
      );

    let chunkBuffer = Buffer.alloc(0);
    let start = 0;
    let uploadedBytes = 0;
    sendMessage(sessionId, "Uploading...");

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      chunkBuffer = Buffer.concat([chunkBuffer, Buffer.from(value)]);
      uploadedBytes += value?.byteLength || 0;

      const rawProgress = (uploadedBytes / fileSize) * 100;
      const progress = Math.round(rawProgress * 100) / 100;
      sendProgress(sessionId, progress);

      while (chunkBuffer.length >= CHUNK_SIZE) {
        const uploadChunk = chunkBuffer.subarray(0, CHUNK_SIZE);
        chunkBuffer = chunkBuffer.subarray(CHUNK_SIZE);

        let retry: number = 0;
        let chunkUploadCompleted: boolean = false;
        while (retry < 3 && !chunkUploadCompleted) {
          const end = start + uploadChunk.length - 1;
          const contentRange = `bytes ${start}-${end}/${fileSize}`;
          await axios
            .put(uploadSessionURL, uploadChunk, {
              headers: {
                "Content-Range": contentRange,
                "Content-Type": "application/octet-stream",
              },
              timeout: 1200000,
            })
            .then(() => {
              chunkUploadCompleted = true;
            })
            .catch(() => {
              console.log("retrying...");
              retry++;
            });
        }
        if (!chunkUploadCompleted) {
          return NextResponse.json(
            { message: "Upload failed" },
            { status: 500 }
          );
        }
        start += uploadChunk.length;
      }
    }

    if (chunkBuffer.length > 0) {
      const end = start + chunkBuffer.length - 1;
      const contentRange = `bytes ${start}-${end}/${fileSize}`;
      await axios.put(uploadSessionURL, chunkBuffer, {
        headers: {
          "Content-Range": contentRange,
          "Content-Type": "application/octet-stream",
        },
        timeout: 1200000,
      });
    }
    sendProgress(sessionId, 100.0);
    sendMessage(sessionId, "Creating download link...");
    const { SharepointFolderId, SharepointFileId, fileType } =
      await getFileFolderID(fileId, accessToken);
    await setFolderExpireTime(fileExpireTime, SharepointFolderId, accessToken);
    await createFileDownloadLink(
      SharepointFileId,
      fileId,
      fileExpireTime,
      accessToken,
      filename,
      formatFileSize(fileSize),
      fileType
    );

    return NextResponse.json({
      message: "Upload complete",
      fileId,
      filename,
      downloadUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/download/${fileId}`,
    });
  } catch (error: unknown) {
    console.error("Upload error:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Upload failed", error: error.message },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { message: "Upload failed", error: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
