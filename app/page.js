"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import {
  featuresData,
  howItWorksData,
  statsData,
  testimonialsData,
} from "@/data/landing";
import HeroSection from "@/components/hero";
import Link from "next/link";
import { motion } from "framer-motion";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background dark:bg-dark-bg text-foreground overflow-hidden font-sans transition-colors duration-500">
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section (Optional, kept clean for continuity) */}
      <section className="py-12 bg-transparent">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsData.map((stat, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={index}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold font-serif text-ink dark:text-dark-heading mb-2 transition-colors">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-ink-light dark:text-dark-text transition-colors">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-serif font-bold text-center mb-16 text-ink dark:text-dark-heading transition-colors"
          >
            Everything you need to manage your finances
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresData.map((feature, index) => {
              // Alternate border colors and dark mode glows
              const IS_EVEN = index % 2 === 0;
              const borderColorClasses = IS_EVEN 
                ? "border-teal-accent dark:border-teal-glow dark:shadow-[0_0_15px_rgba(79,209,197,0.2)]" 
                : "border-gold-accent dark:border-brass-glow dark:shadow-[0_0_15px_rgba(246,173,85,0.2)]";
              const iconColorClasses = IS_EVEN 
                ? "text-ink dark:text-teal-glow" 
                : "text-ink dark:text-brass-glow";

              return (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  key={index}
                >
                  <Card className={`paper-card relative p-8 h-full border-[3px] ${borderColorClasses} transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}>
                    <CardContent className="space-y-4 p-0 text-left">
                      <div className={`${iconColorClasses} -rotate-2 transform scale-125 origin-left mb-6 inline-block transition-colors`}>
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold text-ink dark:text-dark-heading transition-colors">{feature.title}</h3>
                      <p className="text-sm text-ink-light dark:text-dark-text leading-relaxed transition-colors">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-background dark:bg-dark-bg transition-colors">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-serif font-bold text-center mb-16 text-ink dark:text-dark-heading transition-colors"
          >
            How It Works
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorksData.map((step, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={index}
              >
                <Card className="paper-card relative p-8 h-full border border-border dark:border-brass-glow/50 shadow-md dark:shadow-[0_0_15px_rgba(246,173,85,0.1)] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden">
                  <CardContent className="p-0 z-10 relative">
                    <div className="flex items-center space-x-4 mb-4">
                       <div className="text-gold-accent dark:text-brass-glow -rotate-2 transform scale-110 transition-colors">
                          {step.icon}
                       </div>
                       <h3 className="text-lg font-bold text-ink dark:text-dark-heading transition-colors">{step.title}</h3>
                    </div>
                    <p className="text-sm text-ink-light dark:text-dark-text leading-relaxed transition-colors">{step.description}</p>
                  </CardContent>
                  {/* Giant floating number mimicking the screenshot */}
                  <div className="absolute -top-4 -right-2 text-[120px] leading-none font-serif font-bold text-gold-accent dark:text-brass-glow opacity-20 dark:opacity-10 pointer-events-none select-none transition-colors">
                    {index + 1}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 linen-texture relative border-y border-border/50 transition-colors">
        <div className="container mx-auto px-4 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-serif font-bold text-center mb-16 text-ink dark:text-dark-heading transition-colors"
          >
            What Our Users Say
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonialsData.map((testimonial, index) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={index}
              >
                <Card className="paper-card p-6 h-full border border-border/80 dark:border-teal-glow/40 shadow-md dark:shadow-[0_0_15px_rgba(79,209,197,0.1)] transition-all duration-300">
                  <CardContent className="p-0 flex flex-col justify-between h-full space-y-6">
                    
                    <div className="flex items-center">
                      <div className="ml-4">
                        <div className="font-bold font-serif text-ink dark:text-dark-heading transition-colors">{testimonial.name}</div>
                        <div className="text-xs text-ink-light dark:text-dark-text/70 transition-colors">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-ink dark:text-dark-text leading-relaxed transition-colors">
                      &quot;{testimonial.quote}&quot;
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Box Section */}
      <section className="py-24 bg-background dark:bg-dark-bg transition-colors">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Card className="paper-card max-w-4xl mx-auto border-2 border-gold-accent/20 dark:border-brass-glow/50 bg-paper shadow-2xl dark:shadow-[0_0_30px_rgba(246,173,85,0.15)] p-12 text-center relative overflow-visible transition-colors">
              <CardContent className="relative z-10 p-0 flex flex-col items-center">
                <div className="flex flex-col md:flex-row items-center justify-between w-full space-y-6 md:space-y-0">
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-ink dark:text-dark-heading text-left max-w-xl transition-colors">
                    Ready to Take Control of Your Finances?
                  </h2>
                  
                  <div className="flex sm:flex-row justify-center items-center gap-4">
                    <Link href="/dashboard" className="w-full sm:w-auto">
                      <Button
                        size="lg"
                        className="w-full bg-ink dark:bg-brass-glow text-paper dark:text-dark-bg hover:bg-ink-light dark:hover:bg-brass-glow/80 transition-transform rounded-xl px-10 py-6 text-lg font-sans shadow-lg"
                      >
                        Start Your Free Trial
                      </Button>
                    </Link>
                  </div>
                </div>
                <p className="text-xs text-ink-light dark:text-dark-text/50 mt-8 transition-colors">
                  © Copyright @ FinSight AI.com - contact@finsight.ai
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
