import { NextResponse } from "next/server";
import Token from "@/models/Token";
import dbConnect from "@/lib/dbConnect";
import generateSharepointToken from "@/utils/generateSharepointToken";

export async function GET() {
  try {
    await dbConnect();

    const tokenDocument = await Token.findOne({ id: 1234567890 });

    if (!tokenDocument) {
      const newToken = await generateSharepointToken();
      const newTokenDocument = new Token({
        id: 1234567890,
        value: newToken,
        expiresAt: new Date(Date.now() + 7200000),
      });
      await newTokenDocument.save();
      return NextResponse.json(
        { message: "Token created successfully" },
        { status: 200 }
      );
    }

    const tokenExpired = tokenDocument.expiresAt < new Date();
    if (tokenExpired) {
      // delete token
      await Token.deleteOne({ id: 1234567890 });
      const newToken = await generateSharepointToken();
      const newTokenDocument = new Token({
        id: 1234567890,
        value: newToken,
        expiresAt: new Date(Date.now() + 7200000),
      });
      await newTokenDocument.save();
      return NextResponse.json(
        { message: "Token updated successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Token is still valid" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error updating token:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
