"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, Users, Bell } from "lucide-react"

export function TelegramAlerts() {
  return (
    <Card className="bg-card/50 backdrop-blur border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <Bell className="h-4 w-4" />
          Get Alerts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#0088cc]/20 flex items-center justify-center">
            <MessageCircle className="h-6 w-6 text-[#0088cc]" />
          </div>
          <div>
            <h3 className="font-semibold">Join Our Telegram Channel</h3>
            <p className="text-sm text-muted-foreground">Instant alerts when the index changes</p>
          </div>
        </div>

        <Button asChild className="w-full bg-[#0088cc] hover:bg-[#0077b5] text-white">
          <a href="https://t.me/maduroindex" target="_blank" rel="noopener noreferrer">
            Get Telegram Alerts
            <span className="ml-2">📱</span>
          </a>
        </Button>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Users className="h-3 w-3" />
          <span>Bot coming soon - channel launches with first 100 users</span>
        </div>

        <div className="pt-2 border-t border-border/50">
          <p className="text-xs text-muted-foreground">Get notified when:</p>
          <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-tension-elevated" />
              Index jumps 20+ points
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-tension-high" />
              Index enters Elevated or Code Red
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-tension-low" />
              Daily summary reports
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
