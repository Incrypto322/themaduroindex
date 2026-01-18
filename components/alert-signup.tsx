"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Bell, Check, Mail } from "lucide-react"

export function AlertSignup() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)
  const [options, setOptions] = useState({
    jumpAlert: true,
    levelChange: true,
    daily: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
    }
  }

  if (subscribed) {
    return (
      <Card className="bg-card/50 backdrop-blur border-border/50">
        <CardContent className="py-8 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-tension-low/20 flex items-center justify-center mb-4">
            <Check className="h-6 w-6 text-tension-low" />
          </div>
          <h3 className="font-semibold mb-1">You&apos;re subscribed!</h3>
          <p className="text-sm text-muted-foreground">We&apos;ll alert you when the index changes significantly.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-card/50 backdrop-blur border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <Bell className="h-4 w-4" />
          Get Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
              required
            />
          </div>

          <div className="space-y-3">
            <p className="text-xs text-muted-foreground">Alert me when:</p>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="jump"
                checked={options.jumpAlert}
                onCheckedChange={(checked) => setOptions((prev) => ({ ...prev, jumpAlert: !!checked }))}
              />
              <Label htmlFor="jump" className="text-sm">
                Index jumps 20+ points
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="level"
                checked={options.levelChange}
                onCheckedChange={(checked) => setOptions((prev) => ({ ...prev, levelChange: !!checked }))}
              />
              <Label htmlFor="level" className="text-sm">
                Index enters Elevated or Code Red
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="daily"
                checked={options.daily}
                onCheckedChange={(checked) => setOptions((prev) => ({ ...prev, daily: !!checked }))}
              />
              <Label htmlFor="daily" className="text-sm">
                Daily summary
              </Label>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Subscribe to Alerts
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
