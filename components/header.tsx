"use client"

import { Flame, Github, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { cn } from "@/lib/utils"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-tension-elevated/20 flex items-center justify-center">
              <Flame className="h-5 w-5 text-tension-elevated" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">Maduro Index</h1>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Shit's About to Go Down Meter
              </p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </a>
            <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              FAQ
            </a>
            <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
            <Button variant="outline" size="sm">
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </Button>
          </nav>

          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile nav */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300",
            mobileMenuOpen ? "max-h-48 pb-4" : "max-h-0",
          )}
        >
          <nav className="flex flex-col gap-2 pt-2">
            <a
              href="#how-it-works"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              How It Works
            </a>
            <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2">
              FAQ
            </a>
            <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2">
              About
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}
