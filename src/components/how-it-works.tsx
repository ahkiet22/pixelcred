// Updated component with create profile
"use client";

import { useState } from "react";
import AnimatedGridBackground from "./AnimatedGridBackground";
import { ArrowRight } from "lucide-react";

export default function HowItWorksSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const steps = [
    {
      num: "1",
      title: "CREATE PROFILE",
      desc: "Set up your personal Web3 profile to get started",
      color: "#FFA500",
    },
    {
      num: "2",
      title: "UPLOAD AVATAR",
      desc: "Customize your identity with an NFT or image avatar",
      color: "#661DFA",
    },
    {
      num: "3",
      title: "ADD PROJECTS",
      desc: "Showcase your skills and Web3 achievements",
      color: "#AA6E00",
    },
    {
      num: "4",
      title: "GET VERIFIED",
      desc: "Earn your builder badge and grow your reputation",
      color: "#C76BD9",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20 bg-white/90 border-t-8 border-black scroll-mt-20"
    >
      <AnimatedGridBackground />
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase mb-20 text-center text-black [text-shadow:10px_10px_0_#ff0080] hover:[text-shadow:14px_14px_0_#ff0080] transition-all duration-300">
          CREATE YOUR PROFILE
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={i}>
              <div className="text-5xl font-black text-black mb-6 text-center flex gap-x-12 justify-around items-center">
                <span>Step {step.num}</span>{" "}
                {i !== steps.length - 1 && <ArrowRight className="text-5xl font-black" size={40} />}
              </div>
              <div
                className="h-[236px] w-[284px] border-6 border-black shadow-[12px_12px_0_#000] p-8 hover:shadow-[18px_18px_0_#000] hover:-translate-y-3 hover:rotate-2 hover:scale-105 transition-all duration-500 animate-[slide-in-bottom_0.6s_ease-out] animate-fill-both cursor-pointer group relative overflow-hidden"
                style={{
                  backgroundColor: step.color,
                  animationDelay: `${i * 0.15}s`,
                }}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div
                  className={`absolute inset-0 bg-white opacity-0 ${
                    hoveredCard === i ? "opacity-20" : ""
                  } transition-opacity duration-300`}
                />
                <h3 className="text-2xl md:text-3xl font-black uppercase mb-4 text-white [text-shadow:2px_2px_0_rgba(255,255,255,0.5)] relative z-10">
                  {step.title}
                </h3>
                <p className="text-lg md:text-xl font-bold text-white [text-shadow:1px_1px_0_rgba(255,255,255,0.5)] relative z-10">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
