"use client";

import { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { uploadMediaWithFlow } from "@/helpers/upload-media-walrus";
import {
  useCurrentAccount,
} from "@mysten/dapp-kit";

export default function CreateDevProfile() {
  const [profile, setProfile] = useState({
    name: "",
    username: "",
    avatar: "",
    github: "",
    linkedin: "",
    website: "",
    bio: "",
    slushWallet: "",
  });

  const account = useCurrentAccount();

  // Hàm xử lý thay đổi input
  const handleChange = (field: string, value: string) => {
    setProfile({ ...profile, [field]: value });
  };

  // Hàm copy wallet
  const handleCopyWallet = () => {
    navigator.clipboard.writeText(profile.slushWallet);
    alert("Wallet address copied!");
  };

  // Hàm upload hình ảnh
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      console.log("Upload avatar:", file.name);

      const uploadedUrl = await uploadMediaWithFlow(file, account);

      console.log("✅ Upload thành công:", uploadedUrl);
      setProfile((prev) => ({ ...prev, avatar: uploadedUrl }));
    } catch (error) {
      console.error("❌ Upload failed:", error);
      alert("Upload thất bại! Vui lòng thử lại hoặc chọn file khác.");
    } finally {
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profile submitted:", profile);
    alert("Profile submitted! Check console.");
  };

  return (
    <div className="max-w-4xl mx-auto mt-16 p-6 md:p-12 space-y-8 ">
      <h1 className="text-3xl md:text-4xl font-bold text-center">
        Create Developer Profile
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Left Column - Avatar & Wallet */}
        <Card className="space-y-4 text-black! border-4! border-black! shadow-[5px_5px_0_#000]! rounded-none">
          <CardHeader>
            <CardTitle>Avatar</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            {profile.avatar && (
              <Image
                src={profile.avatar}
                alt="Avatar"
                width={120}
                height={120}
                className="rounded-full border-2 border-gray-300"
              />
            )}
            <Input
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              className="mt-2"
            />
          </CardContent>

          <CardHeader>
            <CardTitle>Wallet</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <Input
              placeholder="Slush Wallet"
              value={profile.slushWallet}
              onChange={(e) => handleChange("slushWallet", e.target.value)}
            />
            <Button variant="outline" onClick={handleCopyWallet}>
              <Copy className="w-4 h-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Right Column - Info & Socials */}
        <Card className="space-y-4 text-black! border-4! border-black! shadow-[5px_5px_0_#000]! rounded-none">
          <CardHeader>
            <CardTitle>Basic Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                placeholder="Hữu Bảo"
                value={profile.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Username</Label>
              <Input
                placeholder="huubao"
                value={profile.username}
                onChange={(e) => handleChange("username", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Bio</Label>
              <Input
                placeholder="Short bio..."
                value={profile.bio}
                onChange={(e) => handleChange("bio", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>GitHub</Label>
              <Input
                placeholder="https://github.com/username"
                value={profile.github}
                onChange={(e) => handleChange("github", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>LinkedIn</Label>
              <Input
                placeholder="https://linkedin.com/in/username"
                value={profile.linkedin}
                onChange={(e) => handleChange("linkedin", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Website</Label>
              <Input
                placeholder="https://example.com"
                value={profile.website}
                onChange={(e) => handleChange("website", e.target.value)}
              />
            </div>

            <Button type="submit" className="w-full mt-4">
              Create Profile
            </Button>
          </CardContent>
        </Card>
      </form>

      {/* Preview */}
      {profile.name && (
        <Card className="mt-8 p-6">
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row items-center gap-6">
            {profile.avatar && (
              <Image
                src={profile.avatar}
                alt="Avatar"
                width={100}
                height={100}
                className="rounded-full border-2 border-gray-300"
              />
            )}
            <div className="space-y-2">
              <h2 className="text-xl font-bold">{profile.name}</h2>
              <p className="text-gray-500">@{profile.username}</p>
              <p>{profile.bio}</p>
              <div className="flex gap-4 mt-2">
                {profile.github && (
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    GitHub
                  </a>
                )}
                {profile.linkedin && (
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:underline"
                  >
                    LinkedIn
                  </a>
                )}
                {profile.website && (
                  <a
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:underline"
                  >
                    Website
                  </a>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
