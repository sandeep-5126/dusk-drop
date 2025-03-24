import React, { useCallback, useState } from "react";
import { FaRegFile } from "react-icons/fa";
import formatFileSize from "@/utils/formatFileSize";
import { FiUpload } from "react-icons/fi";
import ExpiringTime from "@/components/ui/ExpiringTime";
import SecondaryButton from "@/components/ui/SecondaryButton";
import PrimaryButton from "@/components/ui/PrimaryButton";
import ProgressCard from "./ProgressCard";

const FileUpload = ({
  file,
  setFile,
  selectedTime,
  setSelectedTime,
  expiringtimes,
  handleUpload,
  progress,
  uploadStatus,
  uploadMessage,
}: {
  file: File[];
  setFile: React.Dispatch<React.SetStateAction<File[]>>;
  selectedTime: { id: number; name: string };
  setSelectedTime: React.Dispatch<
    React.SetStateAction<{ id: number; name: string }>
  >;
  expiringtimes: { id: number; name: string }[];
  handleUpload: () => void;
  progress: number;
  uploadStatus: "none" | "preparing" | "completed";
  uploadMessage: string;
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files) {
      const fileArray = Array.from(e.dataTransfer.files);
      setFile(fileArray);
    }
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const fileArray = Array.from(e.target.files);
        setFile(fileArray);
      }
    },
    []
  );

  return (
    <div className="flex flex-col gap-5">
      <div
        className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg ${
          isDragging
            ? "border-cyan-500 bg-cyan-500/10 glow-cyan"
            : "border-gray-700 hover:border-gray-600 bg-gray-800/30"
        } ${file.length > 0 && "!border-blue-500 !bg-blue-500/10"}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div
          className={`w-20 h-20 mb-4 rounded-full flex items-center justify-center transition-all duration-300 ${
            isDragging ? "bg-cyan-500/20 animate-pulse" : "bg-gray-800"
          } ${file.length > 0 && "!bg-blue-500/20"}`}
        >
          <FiUpload
            className={`w-8 h-8 transition-all duration-300 ${
              isDragging ? "text-cyan-400" : "text-gray-400"
            } ${file.length > 0 && "text-blue-400"} `}
          />
        </div>
        <div className="space-y-2 text-center">
          <h3 className="text-lg font-medium text-gray-200">
            {file.length > 0
              ? `${file.length} file${file.length > 1 ? "s" : ""} selected`
              : "Drag & Drop Files Here"}
          </h3>
          <p className="text-sm text-gray-400">
            {file.length > 0
              ? "Click 'Upload Files' to continue"
              : "Or select files from your device"}
          </p>

          <div className="pt-4">
            <label htmlFor="file-upload">
              <button
                className="py-2 px-5 rounded-md border font-semibold text-sm border-gray-700 bg-gray-800/50 hover:bg-gray-700/50 text-gray-200 hover:-translate-y-1 transition-all duration-300"
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                {file.length === 0 ? "Upload Files" : "Change File"}
              </button>
              <input
                id="file-upload"
                type="file"
                multiple
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>
      </div>
      {uploadStatus !== "none" && (
        <ProgressCard
          progress={progress}
          file={file}
          uploadMessage={uploadMessage}
        />
      )}
      {uploadStatus === "none" && file.length > 0 && (
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

          <>
            <div>
              <h3 className="text-start mb-3 text-sm font-medium text-gray-300">
                File Expiration
              </h3>
              <ExpiringTime
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
                expiringtimes={expiringtimes}
              />
            </div>
            <div className="flex flex-col-reverse sm:flex-row gap-5 mt-5">
              <SecondaryButton
                handleClick={() => {
                  setFile([]);
                }}
                className="w-full py-2 rounded-lg"
              >
                Close
              </SecondaryButton>
              <PrimaryButton
                handleClick={() => handleUpload()}
                className="w-full py-2 rounded-lg"
              >
                Upload File
              </PrimaryButton>
            </div>
          </>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
