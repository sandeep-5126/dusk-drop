import mongoose, { Document, Schema } from "mongoose";

export interface IFile extends Document {
  id: number;
  downloadUrl: string;
  expiresAt: Date;
  createdAt: Date;
  fileName: string;
  fileSize: string;
  fileType: string;
  downloads: number;
}

const FileSchema: Schema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  downloadUrl: {
    type: String,
    default: "",
    required: false,
  },
  fileName: {
    type: String,
    default: "",
    required: false,
  },
  fileSize: {
    type: String,
    default: "",
    required: false,
  },
  fileType: {
    type: String,
    default: "",
    required: false,
  },
  downloads: {
    type: Number,
    default: 0,
    required: false,
  },
  expiresAt: {
    type: Date,
    required: true,
    expires: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const File = mongoose.models.File || mongoose.model<IFile>("File", FileSchema);

export default File;
