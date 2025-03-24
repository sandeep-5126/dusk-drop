import React from "react";
import { FaRegFile } from "react-icons/fa";
import formatFileSize from "@/utils/formatFileSize";
import ProgressAnimated from "@components/ui/ProgressBar";

interface Props {
  file: File[];
  progress: number;
  uploadMessage: string;
}

const ProgressCard = ({ file, progress, uploadMessage }: Props) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="p-4 space-y-2 border rounded-lg border-gray-800 bg-gray-900/50">
        <div className="grid grid-cols-[auto_1fr_auto] gap-1 p-3 items-center rounded-md bg-gray-800/50 group hover:bg-gray-800 transition-colors">
          <FaRegFile className="w-5 h-5 mr-2 text-blue-400" />
          <p className="text-sm text-gray-300 truncate w-full text-start">
            {file[0].name}
          </p>
          <p className="ml-auto text-xs text-gray-500">
            {formatFileSize(file[0].size)}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <ProgressAnimated progress={progress} />
        {uploadMessage === "Preparing file for upload..." && (
          <div className="flex flex-col gap-2">
            <p>Preparing file for upload...</p>
            <p className="text-xs opacity-50">
              This may take a few seconds depend on the size of the file
            </p>
          </div>
        )}
        {uploadMessage === "Uploading..." && (
          <div className="flex flex-col gap-2">
            <p>Uploading... {Number.isNaN(progress) ? 0 : progress}%</p>
            <div>
              <p className="text-xs opacity-50">
                Please stay on this tab while uploading large files
              </p>
              <p className="text-xs opacity-50 text-red-500 font-bold">
                Please ensure that your internet speed is at least 100 Kbps to
                avoid upload failures.
              </p>
            </div>
          </div>
        )}
        {uploadMessage !== "Preparing file for upload..." &&
          uploadMessage !== "Uploading..." && <p>{uploadMessage}</p>}
      </div>
    </div>
  );
};

export default ProgressCard;
