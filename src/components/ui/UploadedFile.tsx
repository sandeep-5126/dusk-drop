import React, { useState } from "react";
import { FaLink } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa6";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { MdContentCopy } from "react-icons/md";
import Link from "next/link";

const UploadedFile = ({
  fileLink,
  expiration,
  size,
  fileName,
}: {
  fileLink: string;
  expiration: string;
  size: string;
  fileName: string;
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopyLink = () => {
    navigator.clipboard.writeText(fileLink);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };
  return (
    <div className="flex flex-col gap-5 py-3">
      <h2 className="text-2xl font-semibold leading-none tracking-tight text-gray-200 text-start">
        Your file is ready to share
      </h2>
      <div className="p-6 space-y-4 border rounded-lg border-gray-800 bg-gray-900/70">
        <div className="grid sm:grid-cols-[auto_1fr_auto] grid-cols-[auto_1fr] gap-1 items-start">
          <div className="p-2.5 mr-3 rounded-md bg-blue-500/20 ">
            <FaLink className="w-6 h-6 text-blue-400" />
          </div>
          <div className="text-start">
            <h3 className="break-all text-base font-medium text-start text-gray-200">
              {fileName}
            </h3>
            <p className="text-sm text-gray-500">{size} • Uploaded just now</p>
          </div>
          <div className="sm:flex hidden items-center px-3 py-1 text-xs rounded-full bg-cyan-500/20 text-cyan-400 whitespace-nowrap">
            <FaRegClock className="w-3 h-3 mr-1" />
            {expiration}
          </div>
        </div>
        <div className="flex sm:hidden w-fit items-center px-3 py-1 text-xs rounded-full bg-cyan-500/20 text-cyan-400 whitespace-nowrap">
          <FaRegClock className="w-3 h-3 mr-1" />
          {expiration}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center"></div>
        </div>

        <div className="flex sm:flex-row flex-col sm:gap-1 gap-2  p-3 rounded-lg bg-gray-800/70">
          <input
            type="text"
            value={fileLink}
            readOnly
            className="flex-1 bg-transparent border-none text-gray-300 focus:outline-none text-sm w-full sm:text-start text-center"
          />
          <PrimaryButton
            handleClick={handleCopyLink}
            className="flex mx-auto items-center justify-center text-xs gap-1 px-2 py-1 rounded-md bg-none hover:bg-cyan-400/10"
          >
            <MdContentCopy className="w-3 h-3 mr-1" />
            {isCopied ? "Copied!" : "Copy"}
          </PrimaryButton>
        </div>
      </div>
      <div className="flex justify-end mt-2">
        <Link
          href={fileLink}
          className="w-fit font-medium cursor-pointer bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-2 px-4 rounded-md"
        >
          View Download Page
        </Link>
      </div>
    </div>
  );
};

export default UploadedFile;
