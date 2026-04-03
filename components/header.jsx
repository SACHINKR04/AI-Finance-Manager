import React from "react";
import { Button } from "./ui/button";
import { PenBox, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { checkUser } from "@/lib/checkUser";
import Image from "next/image";
import HeaderClient from "./header-client";

const Header = async () => {
  await checkUser();

  return (
    <header className="fixed top-0 w-full bg-background/90 backdrop-blur-sm z-50 border-b border-border shadow-sm">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2">
            <Image 
              src="/logo.png" 
              alt="FinSight AI Graphic Logo" 
              width={48} 
              height={48} 
              className="w-10 h-10 object-contain drop-shadow-sm"
            />
            <span className="text-xl font-extrabold tracking-wide text-blue-900 dark:text-[#F3E5D8]">
              FINSIGHT
            </span>
            <span className="text-xl font-light text-blue-500">
              | AI
            </span>
          </div>
        </Link>

        <HeaderClient />
      </nav>
    </header>
  );
};

export default Header;
