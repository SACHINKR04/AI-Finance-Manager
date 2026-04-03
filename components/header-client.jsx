"use client";

import React from "react";
import { Button } from "./ui/button";
import { PenBox, LayoutDashboard, Home } from "lucide-react";
import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { ThemeToggle } from "./theme-toggle";

export default function HeaderClient() {
  return (
    <>
      <div className="hidden md:flex items-center space-x-8">
        <SignedOut>
          <a href="#features" className="text-ink-light hover:text-ink font-sans transition-colors">
            Features
          </a>
          <a href="#testimonials" className="text-ink-light hover:text-ink font-sans transition-colors">
            Testimonials
          </a>
        </SignedOut>
      </div>

      <div className="flex items-center space-x-6">
        <ThemeToggle />
        <SignedIn>
          <Link
            href="/"
            className="text-ink-light hover:text-ink font-sans transition-colors flex items-center gap-2"
          >
            <Button variant="ghost" className="rounded-2xl hover:bg-ink/5">
              <Home size={18} />
              <span className="hidden md:inline">Home</span>
            </Button>
          </Link>
          <Link
            href="/dashboard"
            className="text-ink-light hover:text-ink font-sans transition-colors flex items-center gap-2"
          >
            <Button variant="outline" className="rounded-2xl border-ink/20 hover:bg-ink/5">
              <LayoutDashboard size={18} />
              <span className="hidden md:inline">Dashboard</span>
            </Button>
          </Link>
          <a href="/transaction/create">
            <Button className="flex items-center gap-2 rounded-2xl bg-ink text-paper hover:bg-ink-light">
              <PenBox size={18} />
              <span className="hidden md:inline">Add Transaction</span>
            </Button>
          </a>
        </SignedIn>
        <SignedOut>
          <SignInButton forceRedirectUrl="/dashboard">
            <Button variant="outline" className="rounded-2xl border-ink/20 text-ink hover:bg-ink/5 px-6">
              Login
            </Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-10 h-10 border-2 border-paper rounded-full",
              },
            }}
          />
        </SignedIn>
      </div>
    </>
  );
}
