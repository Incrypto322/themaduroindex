"use client"

import { Pizza, Newspaper, FileText } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { TensionData } from "@/lib/tension-data"

interface ScoreBreakdownProps {
  data: TensionData
}

export function ScoreBreakdown({ data }: ScoreBreakdownProps) {
  const pentagonContribution = Math.round(data.pentagonScore * 3) // 30% weight
  const newsContribution = Math.round(data.newsSentiment * 7) // 70% weight

  return (
    <Card className="bg-card/50 backdrop-blur border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">Score Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Pentagon Meter */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Pizza className="h-5 w-5 text-tension-elevated" />
              <span className="font-medium">Pentagon Activity</span>
            </div>
            <span className="font-mono text-lg">{data.pentagonScore}/10</span>
          </div>
          <Progress value={data.pentagonScore * 10} className="h-2" />
          <p className="text-xs text-muted-foreground">{pentagonContribution} pts contribution (30% weight)</p>
        </div>

        {/* News Sentiment */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Newspaper className="h-5 w-5 text-tension-guarded" />
              <span className="font-medium">News Sentiment</span>
            </div>
            <span className="font-mono text-lg">{data.newsSentiment}/10</span>
          </div>
          <Progress value={data.newsSentiment * 10} className="h-2" />
          <p className="text-xs text-muted-foreground">{newsContribution} pts contribution (70% weight)</p>
        </div>

        {/* Articles analyzed */}
        <div className="pt-4 border-t border-border/50">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <FileText className="h-4 w-4" />
            <span>{data.articlesAnalyzed} articles analyzed this cycle</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
