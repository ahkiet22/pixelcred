"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import AnimatedGridBackgroundColor from "@/components/AnimatedGridBackgroundColor";
import { Loading } from "@/components/Loading";

type Developer = {
  name: string;
  username: string;
  avatar: string;
  bio: string;
  verified: boolean;
};

export default function DevelopersPage() {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDevelopers = async () => {
      setIsLoading(true);
      try {
        const data = [
          {
            name: "Alice Nguyen",
            username: "alice.dev",
            avatar: "/avatars/alice.png",
            bio: "Full-stack developer & blockchain enthusiast",
            verified: true,
          },
          {
            name: "Bob Tran",
            username: "bob.web3",
            avatar: "/avatars/bob.png",
            bio: "Smart contract engineer @Sui",
            verified: false,
          },
          {
            name: "Carol Vu",
            username: "carol.codes",
            avatar: "/avatars/carol.png",
            bio: "Frontend wizard with a love for Tailwind and motion UI",
            verified: true,
          },
        ];
        setDevelopers(data);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDevelopers();
  }, []);

  const filtered = developers.filter(
    (dev) =>
      dev.name.toLowerCase().includes(query.toLowerCase()) ||
      dev.username.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className="relative min-h-screen bg-background py-8 px-6 md:px-12">
      <Loading isLoading={isLoading} />
      <AnimatedGridBackgroundColor />

      <div className="relative z-10 max-w-6xl mx-auto mt-16 space-y-8 bg-white border-4 border-black shadow-[5px_5px_0_#000] p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-foreground">Developers</h1>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search developers..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-64 border border-black border-dashed focus-visible:ring-0"
            />
            <Button variant="outline" className="border-black border-dashed">
              <Search className="w-4 h-4 mr-1" /> Search
            </Button>
          </div>
        </div>

        {/* Developer Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((dev, i) => (
            <Link key={i} href={`/developers/${dev.username}`}>
              <Card className="p-4 border border-black border-dashed hover:shadow-[4px_4px_0_#000] w-[350px] h-[166px] transition-all duration-200 bg-white cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border border-black">
                    <Image
                      src={dev.avatar}
                      alt={dev.name}
                      width={56}
                      height={56}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg group-hover:text-primary transition">
                      {dev.name}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      @{dev.username}
                    </p>
                  </div>
                </div>
                <p className="text-sm mt-3 text-foreground/80 line-clamp-2">
                  {dev.bio}
                </p>
              </Card>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">
            No developers found.
          </p>
        )}
      </div>
    </main>
  );
}
