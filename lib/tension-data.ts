// Mock data and types for the tension index

export type TensionLevel = "low" | "guarded" | "elevated" | "high" | "critical"

export interface TensionData {
  currentIndex: number
  pentagonScore: number
  newsSentiment: number
  articlesAnalyzed: number
  lastUpdated: Date
  nextUpdate: Date
  trend: "up" | "down" | "stable"
  trendChange: number
}

export interface HistoricalDataPoint {
  date: string
  index: number
  event?: string
}

export interface NewsHeadline {
  id: string
  source: string
  headline: string
  tensionScore: number
  timestamp: Date
  category: "military" | "diplomatic" | "economic" | "crisis"
}

export interface TriggerEvent {
  id: string
  type: "news" | "military" | "diplomatic"
  description: string
  impact: number
  timestamp: Date
}

export function getTensionLevel(index: number): TensionLevel {
  if (index <= 20) return "low"
  if (index <= 40) return "guarded"
  if (index <= 60) return "elevated"
  if (index <= 80) return "high"
  return "critical"
}

export function getTensionLabel(level: TensionLevel): string {
  const labels = {
    low: "Low",
    guarded: "Guarded",
    elevated: "Elevated",
    high: "High",
    critical: "Code Red",
  }
  return labels[level]
}

export function getTensionColor(level: TensionLevel): string {
  const colors = {
    low: "text-tension-low",
    guarded: "text-tension-guarded",
    elevated: "text-tension-elevated",
    high: "text-tension-high",
    critical: "text-tension-critical",
  }
  return colors[level]
}

export function getTensionBgColor(level: TensionLevel): string {
  const colors = {
    low: "bg-tension-low",
    guarded: "bg-tension-guarded",
    elevated: "bg-tension-elevated",
    high: "bg-tension-high",
    critical: "bg-tension-critical",
  }
  return colors[level]
}

// Mock data generators
export function getMockTensionData(): TensionData {
  return {
    currentIndex: 67,
    pentagonScore: 7,
    newsSentiment: 6.2,
    articlesAnalyzed: 87,
    lastUpdated: new Date(Date.now() - 1000 * 60 * 45),
    nextUpdate: new Date(Date.now() + 1000 * 60 * 315),
    trend: "up",
    trendChange: 2,
  }
}

export function getMockHistoricalData(days = 7): HistoricalDataPoint[] {
  const data: HistoricalDataPoint[] = []
  const baseScores = [45, 52, 61, 73, 68, 65, 67]
  const events = [
    null,
    null,
    "Military exercise announced",
    "Trade sanctions imposed",
    null,
    "Diplomatic talks resumed",
    null,
  ]

  for (let i = 0; i < days; i++) {
    const date = new Date()
    date.setDate(date.getDate() - (days - 1 - i))
    data.push({
      date: date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
      index: baseScores[i] || Math.floor(Math.random() * 40) + 40,
      event: events[i] || undefined,
    })
  }

  return data
}

export function getMockHeadlines(): NewsHeadline[] {
  return [
    {
      id: "1",
      source: "Reuters",
      headline: "NATO conducts largest military exercise in Eastern Europe since Cold War",
      tensionScore: 8.5,
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      category: "military",
    },
    {
      id: "2",
      source: "AP News",
      headline: "UN Security Council calls emergency session on regional conflict",
      tensionScore: 7.8,
      timestamp: new Date(Date.now() - 1000 * 60 * 90),
      category: "diplomatic",
    },
    {
      id: "3",
      source: "BBC",
      headline: "New sanctions package announced targeting defense sector",
      tensionScore: 6.9,
      timestamp: new Date(Date.now() - 1000 * 60 * 150),
      category: "economic",
    },
    {
      id: "4",
      source: "CNN",
      headline: "Naval vessels repositioned in strategic waterway",
      tensionScore: 7.2,
      timestamp: new Date(Date.now() - 1000 * 60 * 210),
      category: "military",
    },
    {
      id: "5",
      source: "Al Jazeera",
      headline: "Peace negotiations stall as both sides reject compromise",
      tensionScore: 6.5,
      timestamp: new Date(Date.now() - 1000 * 60 * 270),
      category: "diplomatic",
    },
    {
      id: "6",
      source: "The Guardian",
      headline: "Intelligence agencies warn of increased cyber warfare activity",
      tensionScore: 7.0,
      timestamp: new Date(Date.now() - 1000 * 60 * 330),
      category: "crisis",
    },
  ]
}

export function getMockTriggerEvents(): TriggerEvent[] {
  return [
    {
      id: "1",
      type: "military",
      description: "NATO military exercise announced",
      impact: 12,
      timestamp: new Date(Date.now() - 1000 * 60 * 120),
    },
    {
      id: "2",
      type: "diplomatic",
      description: "UN emergency session called",
      impact: 8,
      timestamp: new Date(Date.now() - 1000 * 60 * 240),
    },
    {
      id: "3",
      type: "news",
      description: "New sanctions package reported",
      impact: 5,
      timestamp: new Date(Date.now() - 1000 * 60 * 360),
    },
    {
      id: "4",
      type: "military",
      description: "Naval repositioning detected",
      impact: 7,
      timestamp: new Date(Date.now() - 1000 * 60 * 480),
    },
    {
      id: "5",
      type: "diplomatic",
      description: "Peace talks suspended",
      impact: -3,
      timestamp: new Date(Date.now() - 1000 * 60 * 600),
    },
  ]
}
