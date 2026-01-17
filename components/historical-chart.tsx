"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"
import { getMockHistoricalData, type HistoricalDataPoint } from "@/lib/tension-data"

type TimeRange = "7d" | "30d" | "90d"

export function HistoricalChart() {
  const [timeRange, setTimeRange] = useState<TimeRange>("7d")

  const getDays = (range: TimeRange) => {
    switch (range) {
      case "7d":
        return 7
      case "30d":
        return 30
      case "90d":
        return 90
    }
  }

  const data = getMockHistoricalData(getDays(timeRange))

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const point = payload[0].payload as HistoricalDataPoint
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-xl">
          <p className="text-sm text-muted-foreground">{point.date}</p>
          <p className="text-2xl font-mono font-bold">{point.index}</p>
          {point.event && <p className="text-xs text-tension-elevated mt-1">{point.event}</p>}
        </div>
      )
    }
    return null
  }

  return (
    <Card className="bg-card/50 backdrop-blur border-border/50">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">Historical Trend</CardTitle>
        <div className="flex gap-1">
          {(["7d", "30d", "90d"] as TimeRange[]).map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setTimeRange(range)}
              className="text-xs h-7"
            >
              {range}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] md:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="tensionGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={60} stroke="hsl(var(--tension-elevated))" strokeDasharray="5 5" opacity={0.5} />
              <ReferenceLine y={80} stroke="hsl(var(--tension-critical))" strokeDasharray="5 5" opacity={0.5} />
              <Area
                type="monotone"
                dataKey="index"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
                fill="url(#tensionGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center gap-6 mt-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-tension-elevated opacity-50" style={{ borderTop: "2px dashed" }} />
            <span>Elevated (60)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-tension-critical opacity-50" style={{ borderTop: "2px dashed" }} />
            <span>Critical (80)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
