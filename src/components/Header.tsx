"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import "@mysten/dapp-kit/dist/index.css";
import {
  ConnectButton,
  useCurrentAccount,
  useDisconnectWallet,
  useSuiClientQuery,
} from "@mysten/dapp-kit";
import { shortAddress } from "@/helpers/short-address";
import { ChevronDown, Copy, Eye, LogOut, Settings } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import Image from "next/image";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const account = useCurrentAccount();
  const { mutate: disconnect } = useDisconnectWallet();

  const { data, isLoading, error } = useSuiClientQuery(
    "getBalance",
    {
      owner: account?.address || "",
      coinType: "0x2::sui::SUI",
    },
    {
      enabled: !!account?.address, // chỉ chạy khi đã connect
    }
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  console.log(data, error);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 border-b-4 border-black shadow-[0_4px_0_#000]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="flex items-center justify-between py-4 md:py-5">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* <div className="relative w-12 h-12 md:w-14 md:h-14 border-4 border-black bg-white shadow-[4px_4px_0_#000] group-hover:shadow-[6px_6px_0_#000] group-hover:-translate-y-1 transition-all duration-300">
              <Image
                src="/logo.jpg"
                alt="Poo Town"
                fill
                className="object-cover"
              />
            </div> */}
            <span className="text-xl md:text-2xl font-black uppercase tracking-tight text-black group-hover:text-[#ff0080] transition-colors duration-300">
              Pixel Cred
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            <Link
              href="#how-it-works"
              className="px-5 py-2 font-bold uppercase text-black hover:bg-[#14f195] hover:text-black border-2 border-transparent hover:border-black hover:shadow-[3px_3px_0_#000] transition-all duration-300"
            >
              Features
            </Link>
            <Link
              href="#features"
              className="px-5 py-2 font-bold uppercase text-black hover:bg-[#ffed00] hover:text-black border-2 border-transparent hover:border-black hover:shadow-[3px_3px_0_#000] transition-all duration-300"
            >
              Project
            </Link>
            <Link
              href="#roadmap"
              className="px-5 py-2 font-bold uppercase text-black hover:bg-[#9945ff] hover:text-black border-2 border-transparent hover:border-black hover:shadow-[3px_3px_0_#000] transition-all duration-300"
            >
              Certificates
            </Link>
            <Link
              href="#faq"
              className="px-5 py-2 font-bold uppercase text-black hover:bg-[#ff0080] hover:text-black border-2 border-transparent hover:border-black hover:shadow-[3px_3px_0_#000] transition-all duration-300"
            >
              Docs
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="flex items-center gap-3">
            {/* <div className="text-black border-4 border-black shadow-[5px_5px_0_#000] px-5 md:px-6 py-2 md:py-3 font-black uppercase text-sm md:text-base transition-all duration-300 hover:bg-[#26a0d8] hover:shadow-[7px_7px_0_#000] hover:-translate-y-1 active:shadow-[3px_3px_0_#000] active:translate-y-0 flex items-center gap-2"> */}

            {account ? (
              <Sheet>
                <SheetTrigger>
                  <button className="text-black! border-4! border-black! shadow-[5px_5px_0_#000]! px-5! rounded-none! md:px-6! py-2! md:py-3! font-black! uppercase! text-sm! md:text-base! transition-all! duration-300! hover:bg-[#26a0d8]! hover:shadow-[7px_7px_0_#000]! hover:-translate-y-1! active:shadow-[3px_3px_0_#000]! active:translate-y-0! flex! items-center! gap-2!">
                    {shortAddress(account.address)}
                    <ChevronDown />
                  </button>
                </SheetTrigger>
                <SheetContent className="rounded-2xl">
                  <SheetHeader>
                    <SheetTitle>Account</SheetTitle>
                    <SheetDescription>
                      <div className="w-full max-w-md">
                        <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-purple-600/20 via-blue-600/10 to-slate-900/50 border border-purple-500/20 backdrop-blur-xl p-8 shadow-2xl">
                          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
                          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

                          <div className="relative z-10 space-y-8">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3 flex-1 rounded-2xl ">
                                <div className="flex items-center gap-3 bg-white/30 backdrop-blur-lg rounded-2xl shadow-lg px-2 py-1">
                                  <div className="w-8 h-8 rounded-full bg-linear-to-br from-purple-400 to-blue-400 flex items-center justify-center">
                                    <Image
                                      src={"/sui-sui-logo.png"}
                                      width={100}
                                      height={100}
                                      className="w-5 h-5"
                                      alt="sui"
                                    />
                                  </div>
                                  <p className="text-base font-mono font-semibold text-white">
                                    {shortAddress(account.address)}
                                  </p>
                                </div>
                                <button
                                  onClick={() => {
                                    navigator.clipboard?.writeText(
                                      account.address
                                    );
                                  }}
                                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                  title="Copy address"
                                >
                                  <Copy className="w-5 h-5 text-white hover:text-white" />
                                </button>
                              </div>

                              <button
                                onClick={() => disconnect()}
                                className="hover:text-red-500 hover:bg-white/10 rounded-lg transition-colors p-2"
                              >
                                <LogOut />
                              </button>
                            </div>

                            <div className=" flex items-center gap-x-2  ">
                              <p className="text-sm text-slate-400">Balance:</p>
                              <p className="text-xl font-bold text-white tracking-tight">
                                {Number(data?.totalBalance)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            ) : (
              <ConnectButton
                connectText="CONNECT WALLET"
                className="text-black! border-4! border-black! shadow-[5px_5px_0_#000]! px-5! rounded-none! md:px-6! py-2! md:py-3! font-black! uppercase! text-sm! md:text-base! transition-all! duration-300! hover:bg-[#26a0d8]! hover:shadow-[7px_7px_0_#000]! hover:-translate-y-1! active:shadow-[3px_3px_0_#000]! active:translate-y-0! flex! items-center! gap-2!"
              />
            )}
            {/* </div> */}

            {/* Mobile Menu Button */}
            <button className="lg:hidden bg-black text-white border-4 border-black shadow-[4px_4px_0_#ff0080] px-3 py-2 font-black hover:shadow-[6px_6px_0_#ff0080] hover:-translate-y-1 transition-all duration-300">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
