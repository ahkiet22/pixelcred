"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, Github, Globe, Linkedin, User } from "lucide-react";
import { useCurrentAccount, useSignTransaction } from "@mysten/dapp-kit";
import { sendSponsoredTransaction } from "@/utils/sponsor-transaction";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
// -- React hook form --
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AnimatedGridBackgroundColor from "@/components/AnimatedGridBackgroundColor";

type TProfileData = {
  name: string;
  username: string;
  avatar: string;
  github: string;
  linkedin: string;
  website: string;
  bio: string;
};

export default function CreateDevProfile() {
  const textField = (fieldName: string) =>
    yup
      .string()
      .min(3, `${fieldName} must be at least 3 characters`)
      .max(255, `${fieldName} must not exceed 255 characters`)
      .required(`${fieldName} is required`);

  const urlField = (fieldName: string) =>
    yup
      .string()
      .min(3, `${fieldName} must be at least 3 characters`)
      .max(255, `${fieldName} must not exceed 255 characters`)
      .url(`${fieldName} must be a valid URL`)
      .required(`${fieldName} is required`);

  const schema = yup.object().shape({
    name: textField("Product Name"),
    username: textField("Username"),
    avatar: urlField("Avatar"),
    github: urlField("Github"),
    linkedin: urlField("LinkedIn"),
    website: urlField("Website"),
    bio: textField("Bio"),
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const account = useCurrentAccount();
  const { mutateAsync: signTransaction } = useSignTransaction();

  const handleCopyWallet = () => {
    navigator.clipboard.writeText(account?.address ?? "");
  };

  // Hàm upload hình ảnh
  // const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;

  //   try {
  //     console.log("Upload avatar:", file.name);

  //     const uploadedUrl = await uploadMediaWithFlow(file, account);

  //     console.log("✅ Upload thành công:", uploadedUrl);
  //     setProfile((prev) => ({ ...prev, avatar: uploadedUrl }));
  //   } catch (error) {
  //     console.error("❌ Upload failed:", error);
  //     alert("Upload thất bại! Vui lòng thử lại hoặc chọn file khác.");
  //   } finally {
  //   }
  // };

  const onSubmit = async (data: TProfileData) => {
    if (data && account) {
      const secretKey = process.env.NEXT_PUBLIC_SPONSOR_PRIVATE_KEY;
      const sponsorSigner = Ed25519Keypair.fromSecretKey(String(secretKey));
      await sendSponsoredTransaction(
        account?.address,
        async (tx) => {
          const { signature } = await signTransaction({
            transaction: tx,
            chain: "sui:testnet",
          });
          return signature;
        },
        sponsorSigner,
        data
      );
    }
    console.log("DONE", data);
  };

  return (
    <div className="relative flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 py-12 px-4 sm:px-6 lg:px-8">
      <AnimatedGridBackgroundColor />
      {/* <h1 className="text-3xl md:text-4xl font-bold text-center">
        Create Developer Profile
      </h1> */}
      <div className="grid lg:grid-cols-2 gap-8 mt-12">
        <form className="sticky top-8" onSubmit={handleSubmit(onSubmit)}>
          <Card className="p-6 transition-shadow duration-300 border-4 border-black shadow-[5px_5px_0_#000] rounded-none">
            <h2 className="text-2xl font-semibold text-foreground mb-6">
              Profile Information
            </h2>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground flex items-center gap-1">
                  <span className="text-destructive">*</span> Avatar URL
                </label>
                <Controller
                  name="avatar"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="avatar"
                      type="text"
                      placeholder="https://image.com/avatar.jpg"
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/50 border border-black"
                    />
                  )}
                />
                {errors.avatar && (
                  <p className="text-destructive text-xs font-medium">
                    {errors.avatar.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">
                  Wallet Address
                </label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Slush Wallet"
                    value={account?.address}
                    readOnly
                    disabled
                    className="bg-muted/50 text-muted-foreground border border-black"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCopyWallet}
                    className="px-3 hover:bg-primary hover:text-primary-foreground transition-colors duration-200 bg-transparent"
                    title="Copy wallet address"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground flex items-center gap-1">
                  <span className="text-destructive">*</span> Full Name
                </label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="name"
                      type="text"
                      placeholder="David Chen"
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/50 border border-black"
                    />
                  )}
                />
                {errors.name && (
                  <p className="text-destructive text-xs font-medium">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground flex items-center gap-1">
                  <span className="text-destructive">*</span> Username
                </label>
                <Controller
                  name="username"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="username"
                      type="text"
                      placeholder="davidchen"
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/50 border border-black"
                    />
                  )}
                />
                {errors.username && (
                  <p className="text-destructive text-xs font-medium">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground flex items-center gap-1">
                  <span className="text-destructive">*</span> Bio
                </label>
                <Controller
                  name="bio"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="bio"
                      type="text"
                      placeholder="Full-stack developer passionate about Web3"
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/50 border border-black"
                    />
                  )}
                />
                {errors.bio && (
                  <p className="text-destructive text-xs font-medium">
                    {errors.bio.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground flex items-center gap-1">
                  <span className="text-destructive">*</span> GitHub URL
                </label>
                <Controller
                  name="github"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="github"
                      type="text"
                      placeholder="https://github.com/davidchen"
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/50 border border-black"
                    />
                  )}
                />
                {errors.github && (
                  <p className="text-destructive text-xs font-medium">
                    {errors.github.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground flex items-center gap-1">
                  <span className="text-destructive">*</span> LinkedIn URL
                </label>
                <Controller
                  name="linkedin"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="linkedin"
                      type="text"
                      placeholder="https://linkedin.com/in/davidchen"
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/50 border border-black"
                    />
                  )}
                />
                {errors.linkedin && (
                  <p className="text-destructive text-xs font-medium">
                    {errors.linkedin.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground flex items-center gap-1">
                  <span className="text-destructive">*</span> Website URL
                </label>
                <Controller
                  name="website"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="website"
                      type="text"
                      placeholder="https://davidchen.dev"
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/50 border border-black"
                    />
                  )}
                />
                {errors.website && (
                  <p className="text-destructive text-xs font-medium">
                    {errors.website.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                variant={"outline"}
                className="w-full rounded-none transition-shadow duration-300 border-4 border-black shadow-[5px_5px_0_#000] p-2 hover:shadow-none hover:translate-y-0.5 ease-in-out"
              >
                Create Profile
              </Button>
            </div>
          </Card>
        </form>

        {/* Preview */}
        {watch() && (
          <div className="space-y-6 transition-shadow duration-300 border-4 border-black shadow-[5px_5px_0_#000] p-2">
            {/* Header Card with Avatar */}
            <Card className="overflow-hidden shadow-lg border border-border/50 hover:shadow-xl transition-shadow duration-300">
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-8 text-center">
                <div className="flex justify-center mb-6">
                  {watch("avatar") ? (
                    <div className="relative w-24 h-24 rounded-full overflow-hidden ring-4 ring-primary/20 shadow-lg">
                      {/* <Image
                          src={watch("avatar") || "/placeholder.svg"}
                          alt={watch("username") || "Profile"}
                          fill
                          className="object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = "none"
                          }}
                        /> */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent flex items-center justify-center">
                        <User className="w-8 h-8 text-muted-foreground" />
                      </div>
                    </div>
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center ring-4 ring-primary/20 shadow-lg">
                      <User className="w-10 h-10 text-muted-foreground" />
                    </div>
                  )}
                </div>

                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {watch("name") || "Your Name"}
                </h1>
                <p className="text-lg text-primary font-semibold mb-1">
                  @{watch("username") || "username"}
                </p>
              </div>
            </Card>

            {/* About Section */}
            <Card className="p-6 shadow-md border border-border/50 hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                <div className="w-1 h-6 bg-primary rounded-full" />
                About
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                {watch("bio") || "Add your bio to see it here..."}
              </p>
            </Card>

            {/* Socials Section */}
            <Card className="p-6 shadow-md border border-border/50 hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <div className="w-1 h-6 bg-primary rounded-full" />
                Connect
              </h2>
              <div className="grid grid-cols-3 gap-3">
                <a
                  href={watch("github")}
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
                  href={watch("linkedin")}
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
                  href={watch("website")}
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
            <Card className="p-6 shadow-md border border-border/50 hover:shadow-lg transition-shadow duration-300">
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
          </div>
        )}
      </div>
    </div>
  );
}
