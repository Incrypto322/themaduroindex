"use client"

import { Flame, Twitter, Github, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-tension-elevated/20 flex items-center justify-center">
                <Flame className="h-5 w-5 text-tension-elevated" />
              </div>
              <div>
                <h3 className="font-bold">Maduro Index</h3>
                <p className="text-xs text-muted-foreground">Shit's About to Go Down Meter</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm">
              Satirical geopolitical tension tracking based on news sentiment analysis. For entertainment and
              educational purposes only.
            </p>
            <div className="flex gap-2 mt-4">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9" asChild>
                <a href="https://t.me/maduroindex" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#how-it-works" className="hover:text-foreground transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-foreground transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-foreground transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Get Updates</h4>
            <p className="text-sm text-muted-foreground mb-3">Join our Telegram for instant alerts.</p>
            <Button asChild className="w-full bg-[#0088cc] hover:bg-[#0077b5]">
              <a href="https://t.me/maduroindex" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4 mr-2" />
                Join Telegram
              </a>
            </Button>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border/50 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Maduro Index. Satirical project for entertainment only.
          </p>
          <p className="text-xs text-muted-foreground">Built with News API + Claude AI</p>
        </div>
      </div>
    </footer>
  )
}
