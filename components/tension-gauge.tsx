"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { TrendingUp, TrendingDown, Minus, Activity, Copy, Check, Download } from "lucide-react"
import { getTensionLevel, getTensionLabel, getTensionColor, type TensionData } from "@/lib/tension-data"
import { cn } from "@/lib/utils"
import { MaduroMascot } from "@/components/maduro-mascot"
import { Button } from "@/components/ui/button"
import { toPng } from "html-to-image"

// X (Twitter) icon component
function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

interface TensionGaugeProps {
  data: TensionData
}

export function TensionGauge({ data }: TensionGaugeProps) {
  const [displayIndex, setDisplayIndex] = useState(0)
  const [copied, setCopied] = useState(false)
  const [capturing, setCapturing] = useState(false)
  const captureRef = useRef<HTMLDivElement>(null)
  
  const level = getTensionLevel(data.currentIndex)
  const label = getTensionLabel(level)
  const colorClass = getTensionColor(level)

  // Animated counter effect
  useEffect(() => {
    const duration = 1500
    const steps = 60
    const increment = data.currentIndex / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= data.currentIndex) {
        setDisplayIndex(data.currentIndex)
        clearInterval(timer)
      } else {
        setDisplayIndex(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [data.currentIndex])

  const TrendIcon = data.trend === "up" ? TrendingUp : data.trend === "down" ? TrendingDown : Minus

  const shareText = `The Maduro Index is at ${data.currentIndex}/100 (${label})\n\nShit's About to Go Down Meter\n\n#MaduroIndex`

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy link:", error)
      // Fallback: select text in a temporary input
      const input = document.createElement("input")
      input.value = window.location.href
      document.body.appendChild(input)
      input.select()
      document.execCommand("copy")
      document.body.removeChild(input)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const captureImage = useCallback(async () => {
    if (!captureRef.current) return null
    
    setCapturing(true)
    try {
      const dataUrl = await toPng(captureRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: '#0a0a0f',
        skipFonts: true,
        cacheBust: true,
        includeQueryParams: true,
        filter: (node) => {
          // Skip problematic elements that cause CORS issues
          if (node instanceof Element) {
            const tagName = node.tagName?.toLowerCase()
            if (tagName === 'link' && node.getAttribute('rel') === 'stylesheet') {
              return false
            }
          }
          return true
        },
      })
      return dataUrl
    } catch (error) {
      console.error("Failed to capture image:", error)
      return null
    } finally {
      setCapturing(false)
    }
  }, [])

  const handleDownload = async () => {
    const dataUrl = await captureImage()
    if (!dataUrl) return

    const link = document.createElement("a")
    link.download = `maduro-index-${data.currentIndex}.png`
    link.href = dataUrl
    link.click()
  }

  const handleShareX = async () => {
    const dataUrl = await captureImage()
    
    // X/Twitter doesn't support direct image upload via intent, 
    // so we'll open the share dialog with text and encourage saving image
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent(shareText)
    
    // If we have an image, prompt to download first
    if (dataUrl) {
      // Create a blob and try to use Web Share API if available
      if (navigator.share && navigator.canShare) {
        try {
          const response = await fetch(dataUrl)
          const blob = await response.blob()
          const file = new File([blob], `maduro-index-${data.currentIndex}.png`, { type: "image/png" })
          
          if (navigator.canShare({ files: [file] })) {
            await navigator.share({
              text: shareText,
              url: window.location.href,
              files: [file],
            })
            return
          }
        } catch (error) {
          console.error("Web Share failed:", error)
        }
      }
      
      // Fallback: download image and open X
      const link = document.createElement("a")
      link.download = `maduro-index-${data.currentIndex}.png`
      link.href = dataUrl
      link.click()
    }
    
    // Open X share dialog
    try {
      const shareUrl = `https://x.com/intent/tweet?text=${text}&url=${url}`
      const popup = window.open(shareUrl, "_blank", "width=600,height=400")
      if (!popup) {
        console.error("Popup blocked. Please allow popups for this site.")
        // Fallback: open in same window
        window.location.href = shareUrl
      }
    } catch (error) {
      console.error("Failed to open X share dialog:", error)
    }
  }

  return (
    <div className="relative flex flex-col items-center justify-center py-8 md:py-12">
      {/* Pulsing background glow for elevated+ levels */}
      {level !== "low" && level !== "guarded" && (
        <div
          className={cn(
            "absolute inset-0 rounded-full blur-3xl opacity-20",
            level === "elevated" && "bg-tension-elevated",
            level === "high" && "bg-tension-high",
            level === "critical" && "bg-tension-critical animate-pulse",
          )}
        />
      )}

      {/* Capturable area for sharing */}
      <div ref={captureRef} className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8 p-8">
        {/* Mascot on the left */}
        <div className="hidden lg:block">
          <MaduroMascot index={data.currentIndex} />
        </div>

        {/* Main index number */}
        <div className="flex flex-col items-center">
          <div className="flex items-baseline gap-2">
            <span
              className={cn(
                "font-mono text-8xl md:text-[12rem] lg:text-[14rem] font-bold tracking-tighter leading-none",
                colorClass,
              )}
            >
              {displayIndex}
            </span>
            <span className="text-2xl md:text-4xl text-muted-foreground font-light">/100</span>
          </div>

          {/* Status label */}
          <div
            className={cn(
              "mt-4 px-6 py-2 rounded-full text-lg md:text-xl font-semibold uppercase tracking-wider",
              level === "low" && "bg-tension-low/20 text-tension-low",
              level === "guarded" && "bg-tension-guarded/20 text-tension-guarded",
              level === "elevated" && "bg-tension-elevated/20 text-tension-elevated",
              level === "high" && "bg-tension-high/20 text-tension-high",
              level === "critical" && "bg-tension-critical/20 text-tension-critical animate-pulse",
            )}
          >
            {label}
          </div>

          {/* Trend indicator */}
          <div className="mt-4 flex items-center gap-2 text-muted-foreground">
            <TrendIcon
              className={cn(
                "h-5 w-5",
                data.trend === "up" && "text-tension-high",
                data.trend === "down" && "text-tension-low",
              )}
            />
            <span className="text-sm">
              {data.trend === "up" ? "+" : data.trend === "down" ? "-" : ""}
              {Math.abs(data.trendChange)} pts from yesterday
            </span>
          </div>

          {/* Live indicator */}
          <div className="mt-6 flex items-center gap-2">
            <Activity className="h-4 w-4 text-tension-low animate-pulse" />
            <span className="text-xs uppercase tracking-wider text-muted-foreground">Live Monitoring Active</span>
          </div>
        </div>

        {/* Mascot on mobile (below) */}
        <div className="lg:hidden mt-6">
          <MaduroMascot index={data.currentIndex} />
        </div>
      </div>

      {/* Share buttons - centered under the gauge */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 mt-4">
        <span className="text-sm text-muted-foreground uppercase tracking-wider">Share:</span>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleShareX}
          disabled={capturing}
          className="bg-transparent border-border/50 hover:bg-foreground/5 gap-2"
        >
          <XIcon className="h-4 w-4" />
          Post to X
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleDownload}
          disabled={capturing}
          className="bg-transparent border-border/50 hover:bg-foreground/5 gap-2"
        >
          <Download className="h-4 w-4" />
          {capturing ? "Capturing..." : "Save Image"}
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleCopyLink}
          className="bg-transparent border-border/50 hover:bg-foreground/5 gap-2"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied!" : "Copy Link"}
        </Button>
      </div>
    </div>
  )
}
