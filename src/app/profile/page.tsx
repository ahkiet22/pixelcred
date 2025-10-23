"use client"

import { useState } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Globe, Copy, Check } from "lucide-react"

const profileData = {
  name: "Hữu Bảo",
  username: "huubao",
  avatar: "/developer-avatar.png",
  github: "https://github.com/lehuubao1810",
  linkedin: "https://www.linkedin.com/in/lehuubao2909/",
  website: "https://lehuubao.vercel.app",
  bio: "I'm a Junior Developer with experience in React, Node.js, Next.js, and React Native. I'm passionate about expanding my skills in Web3 development.",
  slushWallet: "0xd21bc08c287ac02a995e00c121778e7c4d384547ed10e7940994157230d982d7",
}

export default function DeveloperProfile() {
  const [copied, setCopied] = useState(false)

  const handleCopyWallet = () => {
    navigator.clipboard.writeText(profileData.slushWallet)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="relative w-24 h-24 rounded-full overflow-hidden shadow-lg">
              <Image
                src={profileData.avatar || "/placeholder.svg"}
                alt={profileData.name}
                fill
                className="object-cover"
              />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">{profileData.name}</h1>
          <p className="text-lg text-muted-foreground">@{profileData.username}</p>
        </div>

        {/* About Section */}
        <Card className="mb-6 p-6 shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold text-foreground mb-3">About</h2>
          <p className="text-foreground leading-relaxed">{profileData.bio}</p>
        </Card>

        {/* Socials Section */}
        <Card className="mb-6 p-6 shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold text-foreground mb-4">Socials</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a href={profileData.github} target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2 hover:bg-primary hover:text-primary-foreground transition-colors bg-transparent"
              >
                <Github size={20} />
                GitHub
              </Button>
            </a>
            <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2 hover:bg-primary hover:text-primary-foreground transition-colors bg-transparent"
              >
                <Linkedin size={20} />
                LinkedIn
              </Button>
            </a>
            <a href={profileData.website} target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2 hover:bg-primary hover:text-primary-foreground transition-colors bg-transparent"
              >
                <Globe size={20} />
                Website
              </Button>
            </a>
          </div>
        </Card>

        {/* Wallet Section */}
        <Card className="p-6 shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold text-foreground mb-4">Wallet</h2>
          <div className="flex items-center gap-2 bg-muted p-3 rounded-lg">
            <code className="flex-1 text-sm text-muted-foreground font-mono break-all">{profileData.slushWallet}</code>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleCopyWallet}
              className="flex-shrink-0 hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
            </Button>
          </div>
        </Card>
      </div>
    </main>
  )
}
