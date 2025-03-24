import axios from "axios";

async function setFolderExpireTime(
  time: string,
  folderId: string,
  accessToken: string
) {
  const DriveID = process.env.SharePointDriveID;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const API_URL = `https://graph.microsoft.com/v1.0/drives/${DriveID}/items/${folderId}/listItem/fields`;
  const data = {
    ExpireTime: time,
  };
  try {
    await axios.patch(API_URL, data, { headers });
  } catch (error) {
    throw error;
  }
}

export default setFolderExpireTime;
