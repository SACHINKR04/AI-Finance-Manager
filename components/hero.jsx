"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto text-center flex flex-col items-center">
        <motion.h1 
          className="text-5xl md:text-7xl lg:text-[85px] leading-tight pb-6 text-foreground font-serif max-w-5xl mx-auto dark:text-dark-heading transition-colors"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Navigate Your Finances with Clarity and Confidence
        </motion.h1>
        
        <motion.p 
          className="text-xl text-ink-light dark:text-dark-text mb-8 max-w-2xl mx-auto font-sans transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          A comprehensive tool designed to help you understand your spending
          and make smarter, more confident choices, with a human touch.
        </motion.p>
        
        <motion.div 
          className="flex justify-center space-x-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link href="/dashboard">
            <Button size="lg" className="px-10 py-6 text-lg rounded-2xl bg-ink dark:bg-brass-glow text-paper dark:text-dark-bg hover:bg-ink-light dark:hover:bg-brass-glow/80 shadow-lg transition-colors">
              Get Started
            </Button>
          </Link>
        </motion.div>

        <motion.div 
          className="w-full max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl dark:shadow-[0_0_30px_rgba(246,173,85,0.15)] border-4 border-paper dark:border-dark-bg relative transition-all duration-500"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {/* We are using the generated collaborative hero image swapping via tailwind classes */}
          <div className="relative w-full aspect-[21/9]">
            <Image
              src="/hero-collab.png"
              fill
              className="object-cover block dark:hidden"
              alt="Professionals collaborating in a warm office"
              priority
            />
            <Image
              src="/hero-dark.png"
              fill
              className="object-cover hidden dark:block"
              alt="Professionals working late under warm lamplight"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
