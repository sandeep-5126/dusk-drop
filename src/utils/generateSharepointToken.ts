import axios from "axios";

const generateSharepointToken = async () => {
  const TenantID = process.env.SharePointTenantID;
  const ClientID = process.env.SharePointClientID;
  const ClientSecret = process.env.SharePointClientSecret;
  if (!TenantID) {
    throw new Error("TenantID is not defined");
  }
  if (!ClientID) {
    throw new Error("ClientID is not defined");
  }
  if (!ClientSecret) {
    throw new Error("ClientSecret is not defined");
  }
  const data = new URLSearchParams();
  data.append("grant_type", "client_credentials");
  data.append("client_id", ClientID);
  data.append("client_secret", ClientSecret);
  data.append("scope", "https://graph.microsoft.com/.default");

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  const url = `https://login.microsoftonline.com/${TenantID}/oauth2/v2.0/token`;
  try {
    const response = await axios.post(url, data, config);
    const token = response.data.access_token;
    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw error;
  }
};
export default generateSharepointToken;
