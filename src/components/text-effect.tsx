"use client";

import { TypewriterEffectSmooth } from "./ui/typewriter-effect";

export function TextEffect() {
  const words = [
    {
      text: "BUILD YOUR",
      className: "neo drop-shadow-lg",
    },
    {
      text: "ON-CHAIN",
      className: "text-blue-500 neon-lime drop-shadow-lg",
    },
    {
      text: "IDENTITY",
      className: "neon-magenta drop-shadow-lg",
    },
  ];
  return (
    <TypewriterEffectSmooth
      words={words}
      className="text-5xl md:text-7xl font-black uppercase tracking-wider leading-tight"
    />
  );
}
