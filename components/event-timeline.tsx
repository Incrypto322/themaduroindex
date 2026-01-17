"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Newspaper, Shield, Handshake, TrendingUp, TrendingDown } from "lucide-react"
import { getMockTriggerEvents, type TriggerEvent } from "@/lib/tension-data"
import { cn } from "@/lib/utils"

function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)

  if (seconds < 60) return "just now"
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  return `${Math.floor(seconds / 86400)}d ago`
}

function getEventIcon(type: TriggerEvent["type"]) {
  switch (type) {
    case "military":
      return Shield
    case "diplomatic":
      return Handshake
    case "news":
      return Newspaper
    default:
      return Newspaper
  }
}

export function EventTimeline() {
  const [showAll, setShowAll] = useState(false)
  const allEvents = getMockTriggerEvents()
  const events = showAll ? allEvents : allEvents.slice(0, 5)

  return (
    <Card className="bg-card/50 backdrop-blur border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">{"What's Happening"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        {events.map((event) => {
          const Icon = getEventIcon(event.type)
          const isPositive = event.impact > 0

          return (
            <div
              key={event.id}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
            >
              <div
                className={cn(
                  "p-2 rounded-lg",
                  event.type === "military" && "bg-tension-high/20 text-tension-high",
                  event.type === "diplomatic" && "bg-tension-guarded/20 text-tension-guarded",
                  event.type === "news" && "bg-tension-elevated/20 text-tension-elevated",
                )}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{event.description}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{formatTimeAgo(event.timestamp)}</p>
              </div>
              <div
                className={cn(
                  "flex items-center gap-1 text-sm font-mono",
                  isPositive ? "text-tension-high" : "text-tension-low",
                )}
              >
                {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {isPositive ? "+" : ""}
                {event.impact}
              </div>
            </div>
          )
        })}

        {allEvents.length > 5 && (
          <Button variant="ghost" className="w-full mt-2 text-muted-foreground" onClick={() => setShowAll(!showAll)}>
            {showAll ? "Show less" : `Load more (${allEvents.length - 5} more)`}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
