import dbConnect from "@lib/dbConnect";
import axios from "axios";
import File from "@models/File";

async function createFileDownloadLink(
  SharepointFileId: string,
  fileId: string,
  expireTime: string,
  accessToken: string,
  fileName: string,
  fileSize: string,
  fileType: string
) {
  const DriveID: string | undefined = process.env.SharePointDriveID;
  if (!DriveID) throw new Error("SharePointDriveID is not set");
  const API_URL: string = `https://graph.microsoft.com/v1.0/drives/${DriveID}/items/${SharepointFileId}/createLink`;
  const body: { type: string; scope: string; expirationDateTime: string } = {
    type: "view",
    scope: "anonymous",
    expirationDateTime: expireTime,
  };
  const config: { headers: { Authorization: string; "Content-Type": string } } =
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

  try {
    const response = await axios.post(API_URL, body, config);
    const downloadUrl: string = response.data.link.webUrl;
    await dbConnect();
    const existingFile = await File.findOne({ id: fileId });
    if (existingFile) {
      await File.findOneAndUpdate(
        { id: fileId },
        { $set: { downloadUrl, fileName, fileSize, fileType } },
        { new: true }
      );
    } else {
      throw new Error("Unable to create download link");
    }
  } catch (error) {
    throw error;
  }
}

export default createFileDownloadLink;
