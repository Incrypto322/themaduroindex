"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Newspaper, Brain, Pizza, Calculator, AlertTriangle } from "lucide-react"

const steps = [
  {
    icon: Newspaper,
    title: "News Collection",
    description:
      "We scan 100+ major news sources every 6 hours for keywords like military, conflict, crisis, and sanctions.",
  },
  {
    icon: Brain,
    title: "AI Analysis",
    description: "Advanced AI reads each headline and rates the tension level from 0 (peaceful) to 10 (critical).",
  },
  {
    icon: Pizza,
    title: "Pentagon Meter",
    description: "We track military-related news volume to simulate historical Pentagon activity patterns.",
  },
  {
    icon: Calculator,
    title: "Index Calculation",
    description: "Scores are combined with weighted formula (30% Pentagon, 70% News) and updated every 6 hours.",
  },
]

export function HowItWorks() {
  return (
    <section className="py-12 md:py-16">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">How It Works</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Transparent methodology combining news sentiment analysis with historical intelligence patterns.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((step, index) => (
          <Card key={step.title} className="bg-card/50 backdrop-blur border-border/50 relative overflow-hidden">
            <div className="absolute top-3 right-3 text-6xl font-bold text-border/30">{index + 1}</div>
            <CardHeader className="pb-2">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mb-3">
                <step.icon className="h-5 w-5 text-foreground" />
              </div>
              <CardTitle className="text-base">{step.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Disclaimer */}
      <Card className="mt-8 bg-secondary/30 border-border/30">
        <CardContent className="py-4 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-tension-elevated shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Disclaimer:</strong> This is a data-driven analysis tool based on
            publicly available news and historical patterns. Not affiliated with any government agency. For
            informational and entertainment purposes only.
          </p>
        </CardContent>
      </Card>
    </section>
  )
}
