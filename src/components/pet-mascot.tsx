"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  text: string;
  duration: number;
};

const messages: Message[] = [
  { text: "Hello there!", duration: 3000 },
  { text: "Keep shipping!", duration: 3000 },
  { text: "You're awesome!", duration: 3000 },
  { text: "Let's build something cool!", duration: 3000 },
];

const playBoopSound = () => {
  const audioContext = new (window.AudioContext ||
    (window as any).webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.connect(gain);
  gain.connect(audioContext.destination);

  oscillator.frequency.value = 400;
  oscillator.type = "sine";

  gain.gain.setValueAtTime(0.3, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.1);
};

export function PetMascot() {
  const [isHovered, setIsHovered] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<string | null>(null);
  const [messageIndex, setMessageIndex] = useState(0);
  const [position, setPosition] = useState({ x: -60, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const petRef = useRef<HTMLDivElement>(null);
  const autoWaveTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const savedPosition = localStorage.getItem("petPosition");
    if (savedPosition) {
      try {
        const parsed = JSON.parse(savedPosition);
        setPosition(parsed);
      } catch (e) {
        console.error("Failed to parse pet position", e);
      }
    }

    const setAutoWaveTimer = () => {
      autoWaveTimerRef.current = setTimeout(() => {
        setIsHovered(true);
        setTimeout(() => {
          setIsHovered(false);
        }, 2000);
        setAutoWaveTimer();
      }, 15000);
    };
    setAutoWaveTimer();

    return () => {
      if (autoWaveTimerRef.current) {
        clearTimeout(autoWaveTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("petPosition", JSON.stringify(position));
  }, [position]);

  useEffect(() => {
    if (!isHovered) return;

    const timer = setTimeout(() => {
      setCurrentMessage(messages[messageIndex].text);
      const hideTimer = setTimeout(() => {
        setCurrentMessage(null);
        setMessageIndex((prev) => (prev + 1) % messages.length);
      }, messages[messageIndex].duration);
      return () => clearTimeout(hideTimer);
    }, 500);

    return () => clearTimeout(timer);
  }, [isHovered, messageIndex]);

  const handleDragStart = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) return;
    setIsDragging(true);
    dragStartPos.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleDrag = (e: any) => {
    if (!isDragging) return;

    const newX = e.clientX - dragStartPos.current.x;
    const newY = e.clientY - dragStartPos.current.y;

    // Constrain to viewport
    const maxX = window.innerWidth - 80;
    const maxY = window.innerHeight - 80;

    setPosition({
      x: Math.max(-80, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY)),
    });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    playBoopSound();
  };

  useEffect(() => {
    if (!isDragging) return;

    window.addEventListener("pointermove", handleDrag);
    window.addEventListener("pointerup", handleDragEnd);

    return () => {
      window.removeEventListener("pointermove", handleDrag);
      window.removeEventListener("pointerup", handleDragEnd);
    };
  }, [isDragging, position]);

  return (
    <>
      {/* Pet Container - Fixed on left edge, now draggable */}
      <motion.div
        ref={petRef}
        className={`fixed z-50 ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
        animate={isDragging ? {} : isHovered ? { x: 20 } : { x: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onMouseEnter={() => !isDragging && setIsHovered(true)}
        onMouseLeave={() => !isDragging && setIsHovered(false)}
        onPointerDown={handleDragStart}
        draggable={false}
      >
        {/* Speech Bubble */}
        <AnimatePresence>
          {currentMessage && (
            <motion.div
              className="absolute bottom-18 -left-45 w-40 bg-white rounded-lg shadow-lg border-2 border-black p-3 whitespace-normal text-sm font-medium text-foreground"
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              {currentMessage}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pet Body - Duck/Blob Style */}
        <motion.div
          className="relative w-20 h-20 rounded-full bg-linear-to-br from-yellow-200 via-yellow-100 to-yellow-50 border-3 border-black shadow-[3px_3px_0_#000] overflow-hidden"
          animate={
            isHovered
              ? { scale: 1.05, rotate: 5 }
              : { scale: 1, rotate: 0, y: [0, -8, 0] }
          }
          transition={{
            y: {
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            },
            scale: { duration: 0.3 },
            rotate: { duration: 0.3 },
          }}
        >
          {/* Eyes Container */}
          <div className="absolute inset-0 flex items-center justify-center gap-2">
            {/* Left Eye */}
            <motion.div
              className="w-2.5 h-2.5 bg-black rounded-full"
              animate={
                isHovered
                  ? { scaleY: [1, 0.1, 1] }
                  : { scaleY: [1, 0.1, 1, 1, 1] }
              }
              transition={{
                duration: isHovered ? 0.4 : 4,
                repeat: isHovered ? 2 : Number.POSITIVE_INFINITY,
              }}
            />
            {/* Right Eye */}
            <motion.div
              className="w-2.5 h-2.5 bg-black rounded-full"
              animate={
                isHovered
                  ? { scaleY: [1, 0.1, 1] }
                  : { scaleY: [1, 0.1, 1, 1, 1] }
              }
              transition={{
                duration: isHovered ? 0.4 : 4,
                repeat: isHovered ? 2 : Number.POSITIVE_INFINITY,
              }}
            />
          </div>

          {/* Smile */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-1.5 border-b-2 border-black rounded-full" />

          {/* Blush */}
          <div className="absolute top-5 left-1 w-2 h-2 bg-pink-300 rounded-full opacity-60" />
          <div className="absolute top-5 right-1 w-2 h-2 bg-pink-300 rounded-full opacity-60" />
        </motion.div>

        {/* Duck Bill (when hovered) */}
        {isHovered && (
          <motion.div
            className="absolute bottom-6 left-20 w-4 h-3 bg-orange-400 rounded-r-full border-2 border-black"
            initial={{ x: 0, rotate: 0 }}
            animate={{ x: [0, 2, 0], rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY }}
          />
        )}
        {isHovered && (
          <motion.div
            className="absolute bottom-6 right-20 w-4 h-3 bg-orange-400 rounded-l-full border-2 border-black"
            initial={{ x: 0, rotate: 0 }}
            animate={{ x: [0, 2, 0], rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY }}
          />
        )}
      </motion.div>

      {/* Floating paw prints effect on scroll */}
      <motion.div
        className="fixed pointer-events-none text-2xl"
        style={{
          left: `${position.x + 40}px`,
          top: `${position.y - 30}px`,
        }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
      >
        🐾
      </motion.div>
    </>
  );
}
