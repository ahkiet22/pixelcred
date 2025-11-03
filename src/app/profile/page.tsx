"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Globe, User } from "lucide-react";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { getProfile } from "@/utils/sponsor-transaction";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnimatedGridBackgroundColor from "@/components/AnimatedGridBackgroundColor";
import { Loading } from "@/components/Loading";
import { toast } from "sonner";
import { PetMascot } from "@/components/pet-mascot";

type TProfileData = {
  name: string;
  username: string;
  avatar: string;
  github: string;
  linkedin: string;
  website: string;
  bio: string;
  slushWallet: string;
  verified: boolean;
};

export default function DeveloperProfile() {
  const [profile, setProfile] = useState<TProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const account = useCurrentAccount();

  useEffect(() => {
    const fetchDataProfile = async () => {
      if (!account?.address) return;
      try {
        setIsLoading(true);
        const data = await getProfile(String(account.address));
        // console.log(data)
        if (data) {
          setProfile({
            avatar: data.avatar,
            name: data.name,
            username: data.username,
            github: data.github,
            linkedin: data.linkedin,
            website: data.website,
            bio: data.bio,
            slushWallet: String(account.address),
            verified: data.verified,
          });
        }
      } catch (error) {
        toast("Errors", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
          closeButton: true,
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchDataProfile();
  }, [account?.address]);

  // console.log(profile?.avatar);
  return (
    <>
      <main className="relative min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
        <Loading isLoading={isLoading} />
        <AnimatedGridBackgroundColor />
        <div className="mt-12 max-w-7xl relative z-10 mx-auto px-6 md:px-8 lg:px-12 space-y-6 bg-white transition-shadow duration-300 border-4 border-black shadow-[5px_5px_0_#000] p-2">
          {/* Header Card with Avatar */}
          <Card className="overflow-hidden shadow-lg transition-shadow duration-300 border-black border border-dashed">
            <div className="bg-linear-to-br from-primary/10 to-primary/5 p-8 text-center">
              <div className="flex justify-center mb-4">
                {profile?.avatar ? (
                  <div className="relative w-24 h-24 rounded-full overflow-hidden ring-4 ring-primary/20 shadow-lg">
                    <Image
                      width={100}
                      height={100}
                      src={profile.avatar}
                      alt={profile.username || "Profile"}
                      className="object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    {!profile.avatar && (
                      <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-transparent flex items-center justify-center">
                        <User className="w-8 h-8 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-full bg-linear-to-br from-primary/20 to-primary/10 flex items-center justify-center ring-4 ring-primary/20 shadow-lg">
                    <User className="w-10 h-10 text-muted-foreground" />
                  </div>
                )}
              </div>

              <h1 className="text-3xl font-bold text-foreground mb-2">
                {profile?.name || "Your Name"}
              </h1>
              <p className="text-lg text-primary font-semibold mb-1">
                @{profile?.username || "username"}
              </p>
            </div>
          </Card>

          {/* About Section */}
          <Tabs defaultValue="profile" className="w-full overflow-auto">
            <TabsList>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="certificates">Certificates</TabsTrigger>
            </TabsList>
            <TabsContent value="profile" className="space-y-6 w-full">
              <Card className="p-6 shadow-md transition-shadow duration-300 border-black border border-dashed">
                <h2 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                  <div className="w-1 h-6 bg-primary rounded-full" />
                  About
                </h2>
                <p className="text-foreground/80 leading-relaxed">
                  {profile?.bio || "Add your bio to see it here..."}
                </p>
              </Card>

              {/* Socials Section */}
              <Card className="p-6 shadow-md  transition-shadow duration-300 border-black border border-dashed">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-primary rounded-full" />
                  Connect
                </h2>
                <div className="grid grid-cols-3 gap-3">
                  <a
                    href={profile?.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <Button
                      variant="outline"
                      className="w-full flex items-center justify-center gap-2 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-200 shadow-sm hover:shadow-md bg-transparent"
                    >
                      <Github size={18} />
                      <span className="hidden sm:inline text-xs font-medium">
                        GitHub
                      </span>
                    </Button>
                  </a>
                  <a
                    href={profile?.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <Button
                      variant="outline"
                      className="w-full flex items-center justify-center gap-2 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-200 shadow-sm hover:shadow-md bg-transparent"
                    >
                      <Linkedin size={18} />
                      <span className="hidden sm:inline text-xs font-medium">
                        LinkedIn
                      </span>
                    </Button>
                  </a>
                  <a
                    href={profile?.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <Button
                      variant="outline"
                      className="w-full flex items-center justify-center gap-2 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-200 shadow-sm hover:shadow-md bg-transparent"
                    >
                      <Globe size={18} />
                      <span className="hidden sm:inline text-xs font-medium">
                        Website
                      </span>
                    </Button>
                  </a>
                </div>
              </Card>

              {/* Wallet Section */}
              <Card className="p-6 shadow-md transition-shadow duration-300 border-black border border-dashed">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-primary rounded-full" />
                  Wallet
                </h2>
                <div className="flex items-center gap-2 bg-muted/50 p-4 rounded-lg border border-border/30">
                  <code className="flex-1 text-xs sm:text-sm text-muted-foreground font-mono break-all">
                    {account?.address || "Connect wallet..."}
                  </code>
                </div>
              </Card>
            </TabsContent>
            {/* Projects Section */}
            <TabsContent value="projects" className="space-y-6 w-full">
              <Card className="p-6 shadow-md border-black border border-dashed transition-shadow duration-300">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-primary rounded-full" />
                  Featured Projects
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      title: "SlushPay Dashboard",
                      description:
                        "A Web3-integrated dashboard that lets users manage blockchain-based transactions with smooth UI and sponsor fee-free transfers.",
                      tech: ["Next.js", "Tailwind", "Sui SDK"],
                      link: "https://github.com/yourname/slushpay-dashboard",
                    },
                    {
                      title: "NFT Marketplace",
                      description:
                        "Full-stack marketplace for minting, listing, and trading NFTs with Sui blockchain integration.",
                      tech: ["React", "TypeScript", "Sui", "Vercel"],
                      link: "https://github.com/yourname/nft-marketplace",
                    },
                    {
                      title: "DevProfile Portal",
                      description:
                        "A modern developer portfolio with wallet login and verified identity features.",
                      tech: ["Next.js", "Framer Motion", "shadcn/ui"],
                      link: "https://github.com/yourname/devprofile",
                    },
                  ].map((project, i) => (
                    <Card
                      key={i}
                      className="p-4 border border-black border-dashed hover:shadow-[4px_4px_0_#000] transition-all duration-200 bg-white"
                    >
                      <h3 className="font-bold text-lg mb-1">
                        {project.title}
                      </h3>
                      <p className="text-sm text-foreground/80 mb-3">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((t, j) => (
                          <span
                            key={j}
                            className="text-xs bg-primary/10 border border-primary/30 text-primary px-2 py-1 rounded-full"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary font-semibold hover:underline"
                      >
                        View Project →
                      </a>
                    </Card>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Certificates Section */}
            <TabsContent value="certificates" className="space-y-6 w-full">
              <Card className="p-6 shadow-md border-black border border-dashed transition-shadow duration-300">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-primary rounded-full" />
                  Certificates
                </h2>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Blockchain Developer - Sui Certified",
                      org: "Sui Foundation",
                      date: "August 2024",
                      image: "/certificates/sui-cert.png",
                      link: "https://sui.io/certificates/12345",
                    },
                    {
                      title: "Full-Stack Web Development",
                      org: "freeCodeCamp",
                      date: "May 2023",
                      image: "/certificates/fcc-fullstack.png",
                      link: "https://freecodecamp.org/certificates/abc123",
                    },
                    {
                      title: "Smart Contract Engineering",
                      org: "Alchemy University",
                      date: "January 2024",
                      image: "/certificates/alchemy.png",
                      link: "https://university.alchemy.com/certs/xyz789",
                    },
                  ].map((cert, i) => (
                    <Card
                      key={i}
                      className="overflow-hidden border border-black border-dashed hover:shadow-[4px_4px_0_#000] transition-all duration-200 bg-white"
                    >
                      <div className="relative w-full h-40 bg-muted/20">
                        <Image
                          src={cert.image}
                          alt={cert.title}
                          fill
                          className="object-contain p-4"
                        />
                      </div>
                      <div className="p-4 space-y-2">
                        <h3 className="font-bold text-base">{cert.title}</h3>
                        <p className="text-sm text-foreground/80">
                          {cert.org} • {cert.date}
                        </p>
                        <a
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary font-semibold hover:underline"
                        >
                          View Certificate →
                        </a>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  );
}
