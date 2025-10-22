"use client";

import { Card } from "@/components/ui/card";
import { Zap, Shield, Wallet, Database } from "lucide-react";
import AnimatedGridBackground from "./AnimatedGridBackground";

const features = [
  {
    icon: Wallet,
    title: "Connect Wallet",
    description: "Link your Sui wallet instantly. No signup required.",
    color: "neon-cyan",
  },
  {
    icon: Database,
    title: "Permanent Storage",
    description: "Store your profile and projects permanently using Walrus.",
    color: "neon-magenta",
  },
  {
    icon: Zap,
    title: "Zero Gas Fees",
    description: "Use sponsored transactions. Create profiles for free.",
    color: "neon-lime",
  },
  {
    icon: Shield,
    title: "Community Verified",
    description: "Get verified by community admins. Build trust on-chain.",
    color: "neon-cyan",
  },
];

export default function FeatureSection() {
  return (
    <section id="features" className="relative min-h-screen py-20 px-4 bg-background">
      <AnimatedGridBackground />
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black uppercase text-center mb-4 neon-magenta">
          Powerful Features
        </h2>
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
          Everything you need to build your on-chain developer identity
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Card
                key={idx}
                className="bg-card border-3 border-border pixel-shadow p-6 hover:border-primary transition-all duration-300 hover:scale-105 cursor-pointer group"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 bg-card border-2 border-primary rounded ${feature.color}`}
                  >
                    <Icon size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-black uppercase mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
