import File from "@models/File";
import dbConnect from "@lib/dbConnect";

function generateRandomCode(): string {
  return Math.floor(100000000 + Math.random() * 900000000).toString();
}

async function generateFileID(mongodbExpireTime: Date): Promise<string> {
  try {
    await dbConnect();
    let uniqueIdFount = false;
    let fileId = "";
    while (!uniqueIdFount) {
      const newFileId = generateRandomCode();
      const existingId = await File.findOne({ id: newFileId });
      if (!existingId) {
        uniqueIdFount = true;
        fileId = newFileId;
        const newFile = new File({
          id: Number(newFileId),
          expiresAt: mongodbExpireTime,
        });
        await newFile.save();
      }
    }
    return fileId;
  } catch (error) {
    console.error("Error generating file ID:", error);
    throw new Error("Error generating file ID");
  }
}

export default generateFileID;
