"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { RefreshCw, Clock, Wifi } from "lucide-react"
import { cn } from "@/lib/utils"

interface LiveUpdatesProps {
  lastUpdated: Date
  nextUpdate: Date
  onRefresh: () => void
}

export function LiveUpdates({ lastUpdated, nextUpdate, onRefresh }: LiveUpdatesProps) {
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [timeUntilUpdate, setTimeUntilUpdate] = useState("")
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    const updateCountdown = () => {
      const diff = nextUpdate.getTime() - Date.now()
      if (diff <= 0) {
        setTimeUntilUpdate("Updating...")
        return
      }

      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      if (hours > 0) {
        setTimeUntilUpdate(`${hours}h ${minutes}m`)
      } else if (minutes > 0) {
        setTimeUntilUpdate(`${minutes}m ${seconds}s`)
      } else {
        setTimeUntilUpdate(`${seconds}s`)
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    return () => clearInterval(interval)
  }, [nextUpdate])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await onRefresh()
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  return (
    <Card className="bg-card/50 backdrop-blur border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <Wifi className="h-4 w-4 text-tension-low" />
          Live Updates
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Next update countdown */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Next update in:</span>
          </div>
          <span className="font-mono text-lg">{timeUntilUpdate}</span>
        </div>

        {/* Auto-refresh toggle */}
        <div className="flex items-center justify-between">
          <span className="text-sm">Auto-refresh</span>
          <Switch checked={autoRefresh} onCheckedChange={setAutoRefresh} />
        </div>

        {/* Manual refresh button */}
        <Button variant="outline" className="w-full bg-transparent" onClick={handleRefresh} disabled={isRefreshing}>
          <RefreshCw className={cn("h-4 w-4 mr-2", isRefreshing && "animate-spin")} />
          {isRefreshing ? "Refreshing..." : "Refresh Now"}
        </Button>

        {/* Last updated */}
        <p className="text-xs text-muted-foreground text-center">Last updated: {lastUpdated.toLocaleTimeString()}</p>
      </CardContent>
    </Card>
  )
}
