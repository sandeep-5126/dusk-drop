import React from "react";
import Link from "next/link";
import Image from "next/image";
import { VscGithub } from "react-icons/vsc";

const Header = () => {
  return (
    <header className="fixed top-0 z-50 w-full border-b backdrop-blur-sm border-gray-800 p-5 sm:p-6">
      <div className="flex justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 flex justify-center items-center">
            <Image
              className=""
              src="/logo.svg"
              alt="DuskDrop logo"
              width={100}
              height={30}
            />
          </div>
          <span className="text-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
            DuskDrop
          </span>
        </Link>
        <div className="flex justify-center items-center">
          <Link
            href="https://github.com/sandeep-rajputt/Dusk-Drop"
            target="_blank"
          >
            <VscGithub size={25} />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
