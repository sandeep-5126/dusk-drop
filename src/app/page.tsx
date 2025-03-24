"use client";
import Card from "@/components/ui/Card";
import { useState, useEffect } from "react";
import FileUpload from "@/components/ui/FileUpload";
import { FiUpload } from "react-icons/fi";
import { GoClock } from "react-icons/go";
import { FaLink } from "react-icons/fa6";
import UploadedFile from "@components/ui/UploadedFile";
import formatFileSize from "@/utils/formatFileSize";
import axios from "axios";

const expiringtimes = [
  { id: 1, name: "After 1 hour" },
  { id: 2, name: "After 3 hour" },
  { id: 3, name: "After 6 hour" },
  { id: 4, name: "After 12 hour" },
  { id: 5, name: "After 1 day" },
  { id: 6, name: "After 7 days" },
  { id: 7, name: "After 15 days" },
  { id: 8, name: "After 30 days" },
];

export default function Home() {
  const [file, setFile] = useState<File[]>([]);
  const [selectedTime, setSelectedTime] = useState(expiringtimes[2]);
  const [uploadStatus, setUploadStatus] = useState<
    "none" | "preparing" | "completed"
  >("none");
  const [uploadLink, setUploadLink] = useState("");
  const [progress, setProgress] = useState<number>(0);
  const [eventSource, setEventSource] = useState<EventSource>();
  const [uploadMessage, setUploadingMessage] = useState<string>(
    "Preparing file for upload..."
  );

  function generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  const generateSessionId = () => {
    return generateUUID();
  };

  const handleUpload = async () => {
    if (!file.length) return;

    const sessionId = generateSessionId();
    const es = new EventSource(`/api/sse?sessionId=${sessionId}`);
    setEventSource(es);

    es.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.message) setUploadingMessage(data.message);
        if (typeof data.progress === "number") {
          console.log(data.progress);
          setProgress(Number(data.progress.toFixed(2)));
        }
      } catch (error) {
        console.error("SSE parse error:", error);
      }
    };

    es.onerror = () => {
      es.close();
      setEventSource(undefined);
    };

    try {
      setUploadStatus("preparing");
      const fileToUpload = file[0];
      const response = await axios.post("/api/upload", fileToUpload, {
        headers: {
          "Content-Type": "application/octet-stream",
          "X-File-Name": encodeURIComponent(fileToUpload.name),
          "X-File-Size": fileToUpload.size.toString(),
          "X-File-Expiration": selectedTime.id.toString(),
          "X-Session-Id": sessionId,
        },
        timeout: 3600000,
      });

      const { data } = response;
      setUploadLink(data.downloadUrl);
      setUploadStatus("completed");
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus("none");
      setProgress(0);
    } finally {
      es?.close();
      setEventSource(undefined);
    }
  };

  useEffect(() => {
    return () => {
      eventSource?.close();
    };
  }, [eventSource]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] min-h-screen items-center justify-items-center pt-20 px-5 pb-0 gap-16">
      <main className="flex row-start-2 items-center">
        <div className="space-y-4 text-center">
          {uploadLink ? (
            <h2 className="text-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 md:text-6xl text-center">
              File Upload Complete
            </h2>
          ) : (
            <div className="space-y-4">
              <h2 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 md:text-6xl text-center">
                Transfer{" "}
                <span className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white px-3 py-2 rounded-lg">
                  100 GB
                </span>{" "}
                easily
              </h2>
              <p className="md:text-lg text-md text-gray-400 text-center">
                Secure file sharing with automatic expiration. No registration
                required.
              </p>
            </div>
          )}

          <Card className="mt-16 mx-auto">
            {uploadLink ? (
              <UploadedFile
                fileLink={uploadLink}
                expiration={`Expires ${selectedTime.name}`}
                size={formatFileSize(file[0].size)}
                fileName={file[0].name}
              />
            ) : (
              <FileUpload
                file={file}
                setFile={setFile}
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
                expiringtimes={expiringtimes}
                handleUpload={handleUpload}
                progress={progress}
                uploadStatus={uploadStatus}
                uploadMessage={uploadMessage}
              />
            )}
          </Card>
          <div className="w-full max-w-4xl py-12 pt-32">
            <h2 className="mb-8 text-2xl font-semibold text-center text-gray-200">
              How It Works
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="p-6 transition-all duration-300 border rounded-lg shadow-lg bg-gray-900/60 border-gray-800 hover:border-cyan-800 hover:shadow-cyan-900/20">
                <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500">
                  <FiUpload className="w-6 h-6 text-white" />
                </div>
                <h3 className="mb-2 text-lg font-medium text-gray-200 text-start">
                  Upload Files
                </h3>
                <p className="text-gray-400 text-start">
                  Drag and drop your files or select them manually. We support
                  all file types up to 100GB.
                </p>
              </div>
              <div className="p-6 transition-all duration-300 border rounded-lg shadow-lg bg-gray-900/60 border-gray-800 hover:border-purple-800 hover:shadow-purple-900/20">
                <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
                  <GoClock className="w-6 h-6 text-white" />
                </div>
                <h3 className="mb-2 text-lg font-medium text-gray-200 text-start">
                  Set Expiration
                </h3>
                <p className="text-gray-400 text-start">
                  Choose how long your files stay available. Files are
                  automatically deleted after expiration.
                </p>
              </div>
              <div className="p-6 transition-all duration-300 border rounded-lg shadow-lg bg-gray-900/60 border-gray-800 hover:border-blue-800 hover:shadow-blue-900/20">
                <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500">
                  <FaLink className="w-6 h-6 text-white" />
                </div>
                <h3 className="mb-2 text-lg font-medium text-gray-200 text-start">
                  Share Link
                </h3>
                <p className="text-gray-400 text-start">
                  Get a secure link to share with anyone. No registration or
                  account needed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
