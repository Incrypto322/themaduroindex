"use client"

import { useEffect, useState } from "react"
import { TrendingUp, TrendingDown, Minus, Activity } from "lucide-react"
import { getTensionLevel, getTensionLabel, getTensionColor, type TensionData } from "@/lib/tension-data"
import { cn } from "@/lib/utils"
import { MaduroMascot } from "@/components/maduro-mascot"
import { Disclaimer } from "@/components/disclaimer"

interface TensionGaugeProps {
  data: TensionData
}

export function TensionGauge({ data }: TensionGaugeProps) {
  const [displayIndex, setDisplayIndex] = useState(0)
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

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8">
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

      <div className="relative z-10 w-full max-w-3xl mx-auto">
        <Disclaimer />
      </div>
    </div>
  )
}
