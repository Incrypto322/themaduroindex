"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Share2, Copy, Twitter, Facebook, Linkedin, Check, Download } from "lucide-react"
import { getTensionLevel, getTensionLabel, type TensionData } from "@/lib/tension-data"
import { cn } from "@/lib/utils"

interface ShareCardProps {
  data: TensionData
}

export function ShareCard({ data }: ShareCardProps) {
  const [copied, setCopied] = useState(false)
  const level = getTensionLevel(data.currentIndex)
  const label = getTensionLabel(level)

  const shareText = `🌍 Global Tension Index: ${data.currentIndex}/100 (${label})\n\nTracking geopolitical stability in real-time.\n\n#GlobalTensionIndex #Geopolitics`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent(shareText)

    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    }

    window.open(urls[platform], "_blank", "width=600,height=400")
  }

  return (
    <Card className="bg-card/50 backdrop-blur border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <Share2 className="h-4 w-4" />
          Share Index
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Mini preview card */}
        <div
          className={cn(
            "p-4 rounded-lg border border-border/50 bg-background/50",
            level === "critical" && "border-tension-critical/30",
          )}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Tension Index</p>
              <p className="text-3xl font-mono font-bold">{data.currentIndex}</p>
            </div>
            <div
              className={cn(
                "px-3 py-1 rounded-full text-xs font-semibold uppercase",
                level === "low" && "bg-tension-low/20 text-tension-low",
                level === "guarded" && "bg-tension-guarded/20 text-tension-guarded",
                level === "elevated" && "bg-tension-elevated/20 text-tension-elevated",
                level === "high" && "bg-tension-high/20 text-tension-high",
                level === "critical" && "bg-tension-critical/20 text-tension-critical",
              )}
            >
              {label}
            </div>
          </div>
          <p className="text-[10px] text-muted-foreground mt-2">Last updated: {data.lastUpdated.toLocaleString()}</p>
        </div>

        {/* Share buttons */}
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" onClick={handleCopyLink} className="w-full bg-transparent">
            {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
            {copied ? "Copied!" : "Copy Link"}
          </Button>
          <Button variant="outline" size="sm" className="w-full bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Save Image
          </Button>
        </div>

        {/* Social share */}
        <div className="flex items-center justify-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => handleShare("twitter")} className="h-9 w-9">
            <Twitter className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => handleShare("facebook")} className="h-9 w-9">
            <Facebook className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => handleShare("linkedin")} className="h-9 w-9">
            <Linkedin className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
