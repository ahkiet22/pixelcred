"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"
import Image from "next/image"
import AnimatedGridBackground from "./AnimatedGridBackground"

const projects = [
  {
    title: "Sui DeFi Protocol",
    description: "Built a decentralized exchange on Sui with 10M+ TVL",
    tags: ["Sui", "DeFi", "Smart Contracts"],
    image: "/vercel.svg",
  },
  {
    title: "NFT Marketplace",
    description: "Created an NFT marketplace with advanced filtering and bidding",
    tags: ["NFT", "Web3", "React"],
    image: "/vercel.svg",
  },
  {
    title: "Wallet Integration",
    description: "Developed multi-chain wallet integration library",
    tags: ["Wallet", "SDK", "TypeScript"],
    image: "/vercel.svg",
  },
  {
    title: "DAO Governance",
    description: "Built governance system for decentralized autonomous organization",
    tags: ["DAO", "Governance", "Solidity"],
    image: "/vercel.svg",
  },
  {
    title: "Token Launchpad",
    description: "Created platform for launching new tokens on Sui",
    tags: ["Token", "Launchpad", "Web3"],
    image: "/vercel.svg",
  },
  {
    title: "Analytics Dashboard",
    description: "Built real-time analytics for blockchain transactions",
    tags: ["Analytics", "Data", "Dashboard"],
    image: "/vercel.svg",
  },
]

export default function ProjectSection() {
  return (
    <section id="projects" className="relative py-20 px-4 bg-card/30">
      <AnimatedGridBackground />
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black uppercase text-center mb-4 neon-lime">Showcase Projects</h2>
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
          Display your best work and prove your expertise to the community
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <Card
              key={idx}
              className="relative Achievementsbg-white border-3 border-border pixel-shadow overflow-hidden hover:border-secondary transition-all duration-300 hover:scale-105 group cursor-pointer"
            >
              <div className="relative overflow-hidden h-40 bg-muted">
                <Image
                  width={100}
                  height={100}
                  src={project.image || "/vercel.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-black uppercase mb-2 text-lg">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <Badge key={i} variant="outline" className="text-xs uppercase font-bold">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <button className="flex items-center gap-2 text-primary font-bold uppercase text-sm hover:gap-3 transition-all">
                  View Project
                  <ExternalLink size={16} />
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
