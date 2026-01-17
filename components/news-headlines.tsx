"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, Handshake, DollarSign, AlertTriangle } from "lucide-react"
import { getMockHeadlines, type NewsHeadline } from "@/lib/tension-data"
import { cn } from "@/lib/utils"

function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)

  if (seconds < 60) return "just now"
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  return `${Math.floor(seconds / 86400)}d ago`
}

function getCategoryIcon(category: NewsHeadline["category"]) {
  switch (category) {
    case "military":
      return Shield
    case "diplomatic":
      return Handshake
    case "economic":
      return DollarSign
    case "crisis":
      return AlertTriangle
  }
}

function getTensionColor(score: number): string {
  if (score <= 3) return "bg-tension-low"
  if (score <= 5) return "bg-tension-guarded"
  if (score <= 7) return "bg-tension-elevated"
  if (score <= 8.5) return "bg-tension-high"
  return "bg-tension-critical"
}

export function NewsHeadlines() {
  const [showAll, setShowAll] = useState(false)
  const allHeadlines = getMockHeadlines()
  const headlines = showAll ? allHeadlines : allHeadlines.slice(0, 4)

  return (
    <Card className="bg-card/50 backdrop-blur border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">Top Tension Headlines</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {headlines.map((headline) => {
          const Icon = getCategoryIcon(headline.category)

          return (
            <div
              key={headline.id}
              className="group p-3 rounded-lg border border-border/50 hover:border-border hover:bg-secondary/30 transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5">
                      <Icon className="h-3 w-3 mr-1" />
                      {headline.source}
                    </Badge>
                    <span className="text-[10px] text-muted-foreground">{formatTimeAgo(headline.timestamp)}</span>
                  </div>
                  <p className="text-sm font-medium leading-tight">{headline.headline}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className={cn("w-2 h-2 rounded-full", getTensionColor(headline.tensionScore))} />
                  <span className="text-xs font-mono text-muted-foreground">{headline.tensionScore.toFixed(1)}</span>
                </div>
              </div>
            </div>
          )
        })}

        {allHeadlines.length > 4 && (
          <Button variant="ghost" className="w-full mt-2 text-muted-foreground" onClick={() => setShowAll(!showAll)}>
            {showAll ? "Show less" : `View all ${allHeadlines.length} headlines`}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
