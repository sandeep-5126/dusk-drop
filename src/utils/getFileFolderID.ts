import axios from "axios";
import capitalizeFirstLetter from "./capitalizeFirstLetter";

async function getFileFolderID(folderName: string, accessToken: string) {
  const DriveID = process.env.SharePointDriveID;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const API_URL = `https://graph.microsoft.com/v1.0/drives/${DriveID}/root:/${folderName}?expand=children`;
  try {
    const response = await axios.get(API_URL, { headers });
    const fileType: string =
      response.data.children[0].file.mimeType.split("/")[0] || "unknown";
    console.log(fileType);

    return {
      SharepointFolderId: response.data.id,
      SharepointFileId: response.data.children[0].id,
      fileType: capitalizeFirstLetter(fileType),
    };
  } catch (error) {
    throw error;
  }
}

export default getFileFolderID;
