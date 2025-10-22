"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { TextEffect } from "./text-effect";
import AnimatedGridBackground from "./AnimatedGridBackground";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20">
      {/* Animated background grid */}
      <AnimatedGridBackground />
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(0deg, transparent 24%, rgba(0, 255, 255, 0.1) 25%, rgba(0, 255, 255, 0.1) 26%, transparent 27%, transparent 74%, rgba(0, 255, 255, 0.1) 75%, rgba(0, 255, 255, 0.1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 255, 255, 0.1) 25%, rgba(0, 255, 255, 0.1) 26%, transparent 27%, transparent 74%, rgba(0, 255, 255, 0.1) 75%, rgba(0, 255, 255, 0.1) 76%, transparent 77%, transparent)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        {/* Main Headline */}
        <div className="mb-8 space-y-4">
          <TextEffect />
        </div>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 font-mono">
          Create permanent developer profiles on Sui blockchain. Showcase
          projects, earn certificates, and prove your skills on-chain. No gas
          fees.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button
            size="lg"
            className="uppercase font-black pixel-shadow bg-primary hover:bg-primary/90 text-primary-foreground border-3 border-black shadow-[5px_5px_0_#000] text-base"
          >
            <span>Launch App</span>
            <ArrowRight className="ml-2" size={20} />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="uppercase font-black pixel-shadow bg-white border-3 border-black shadow-[5px_5px_0_#000]"
          >
            Read Docs
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto">
          <div className="bg-card border-3 border-secondary pixel-shadow p-4 hover:shadow-[3px_3px_0_#000] hover:border-black hover:-translate-y-1 animate-[slide-in-bottom_0.6s_ease-out] animate-fill-both hover:scale-105 hover:rotate-2 transition-all duration-400">
            <div className="text-2xl md:text-3xl font-black neon-cyan">
              1000+
            </div>
            <div className="text-xs md:text-sm uppercase font-bold text-muted-foreground">
              Developers
            </div>
          </div>
          <div className="bg-card border-3 border-secondary pixel-shadow p-4 hover:shadow-[3px_3px_0_#000] hover:border-black hover:-translate-y-1 animate-[slide-in-bottom_0.6s_ease-out] animate-fill-both hover:scale-105 hover:rotate-2 transition-all duration-400">
            <div className="text-2xl md:text-3xl font-black neon-magenta">
              5000+
            </div>
            <div className="text-xs md:text-sm uppercase font-bold text-muted-foreground">
              Profiles
            </div>
          </div>
          <div className="bg-card border-3 border-secondary pixel-shadow p-4 hover:shadow-[3px_3px_0_#000] hover:border-black hover:-translate-y-1 animate-[slide-in-bottom_0.6s_ease-out] animate-fill-both hover:scale-105 hover:rotate-2 transition-all duration-400">
            <div className="text-2xl md:text-3xl font-black neon-lime">$0</div>
            <div className="text-xs md:text-sm uppercase font-bold text-muted-foreground">
              Gas Fees
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
