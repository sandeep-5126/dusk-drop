import mongoose, { Document, Schema } from "mongoose";

export interface IToken extends Document {
  id: number;
  value: string;
  expiresAt: Date;
}

const TokenSchema: Schema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  value: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Token =
  mongoose.models.Token || mongoose.model<IToken>("Token", TokenSchema);

export default Token;
