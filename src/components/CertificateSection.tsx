"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from "lucide-react"
import AnimatedGridBackground from "./AnimatedGridBackground"

const certificates = [
  {
    title: "Sui Developer Certified",
    issuer: "Sui Foundation",
    date: "Jan 2024",
    verified: true,
  },
  {
    title: "Smart Contract Auditor",
    issuer: "OpenZeppelin",
    date: "Dec 2023",
    verified: true,
  },
  {
    title: "Web3 Security Expert",
    issuer: "Trail of Bits",
    date: "Nov 2023",
    verified: true,
  },
  {
    title: "DeFi Protocol Developer",
    issuer: "Aave Academy",
    date: "Oct 2023",
    verified: true,
  },
]

export default function CertificateSection() {
  return (
    <section id="certificates" className="relative py-20 px-4 bg-background">
      <AnimatedGridBackground />
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black uppercase text-center mb-4 neon-cyan">Achievements</h2>
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
          Self-issued certificates and community-verified achievements
        </p>

        <div className="space-y-4">
          {certificates.map((cert, idx) => (
            <Card
              key={idx}
              className="relative bg-card border-3 border-border pixel-shadow p-6 hover:border-accent transition-all duration-300 flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-accent/20 border-2 border-accent rounded">
                  <CheckCircle className="neon-lime" size={24} />
                </div>
                <div>
                  <h3 className="font-black uppercase text-lg">{cert.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {cert.issuer} • {cert.date}
                  </p>
                </div>
              </div>
              {cert.verified && (
                <Badge className="bg-accent text-accent-foreground uppercase font-black">Verified</Badge>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
