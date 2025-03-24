// calculate expire time in ISO 8601 format

function calculateFileExpireTime(expirationId: number): {
  sharePointExpireTime: string;
  mongodbExpireTime: Date;
} {
  const now = new Date();
  let expirationTime: Date;

  switch (expirationId) {
    case 1:
      expirationTime = new Date(now.getTime() + 1 * 60 * 60 * 1000);
      break;
    case 2:
      expirationTime = new Date(now.getTime() + 3 * 60 * 60 * 1000);
      break;
    case 3:
      expirationTime = new Date(now.getTime() + 6 * 60 * 60 * 1000);
      break;
    case 4:
      expirationTime = new Date(now.getTime() + 12 * 60 * 60 * 1000);
      break;
    case 5:
      expirationTime = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      break;
    case 6:
      expirationTime = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      break;
    case 7:
      expirationTime = new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000);
      break;
    case 8:
      expirationTime = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
      break;
    default:
      expirationTime = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
      break;
  }

  return {
    sharePointExpireTime: expirationTime.toISOString(),
    mongodbExpireTime: expirationTime,
  };
}

export default calculateFileExpireTime;
