import axios from "axios";
import Token from "@models/Token";
import dbConnect from "@lib/dbConnect";

async function createUploadSession(fileId: string, fileName: string) {
  const DriveID = process.env.SharePointDriveID;
  const FolderID = process.env.SharePointFolderID;
  if (!DriveID || !FolderID) {
    throw new Error("DriveID or FolderID is not defined");
  }

  try {
    await dbConnect();
    const tokenDocument = await Token.findOne({ id: 1234567890 });
    if (!tokenDocument) {
      throw new Error("Token not found in database");
    }

    const accessToken = tokenDocument.value;

    const GRAPH_API = `https://graph.microsoft.com/v1.0/drives/${DriveID}/items/${FolderID}:/`;
    const API_URL = `${GRAPH_API}${fileId}/${fileName}:/createUploadSession`;

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await axios.post(API_URL, {}, config);
    const uploadSessionURL = response.data.uploadUrl;

    return {
      uploadSessionURL,
      accessToken,
    };
  } catch (error) {
    throw error;
  }
}

export default createUploadSession;
