"use client"

import { Github, Twitter, Zap } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-card border-t-4 border-primary py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="text-xl font-black uppercase mb-4">
              <span className="neon-cyan">PIXEL</span>
              <span className="neon-magenta">CRED</span>
            </div>
            <p className="text-sm text-muted-foreground">On-chain developer identity on Sui blockchain</p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-black uppercase mb-4 text-sm">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Security
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Roadmap
                </a>
              </li>
            </ul>
          </div>

          {/* Developers */}
          <div>
            <h4 className="font-black uppercase mb-4 text-sm">Developers</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  GitHub
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Examples
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-black uppercase mb-4 text-sm">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Privacy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t-2 border-border pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">© 2025 PixelCred. Built on Sui blockchain.</p>
          <div className="flex gap-4">
            <a href="#" className="p-2 hover:bg-background rounded transition-colors">
              <Github size={20} />
            </a>
            <a href="#" className="p-2 hover:bg-background rounded transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="p-2 hover:bg-background rounded transition-colors">
              <Zap size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
