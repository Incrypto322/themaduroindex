"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TensionGauge } from "@/components/tension-gauge"
import { ScoreBreakdown } from "@/components/score-breakdown"
import { HistoricalChart } from "@/components/historical-chart"
import { EventTimeline } from "@/components/event-timeline"
import { NewsHeadlines } from "@/components/news-headlines"
import { LiveUpdates } from "@/components/live-updates"
import { TelegramAlerts } from "@/components/telegram-alerts"
import { HowItWorks } from "@/components/how-it-works"
import { FAQSection } from "@/components/faq-section"
import { Disclaimer } from "@/components/disclaimer"
import { getMockTensionData } from "@/lib/tension-data"


export default function HomePage() {
  const [tensionData, setTensionData] = useState(getMockTensionData())

  const handleRefresh = () => {
    // Simulate refresh with slightly modified data
    setTensionData((prev) => ({
      ...prev,
      lastUpdated: new Date(),
      nextUpdate: new Date(Date.now() + 1000 * 60 * 360),
    }))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Disclaimer banner at the very top */}
      <Disclaimer />
      
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Hero section with main gauge */}
        <section className="relative mb-12">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-tension-elevated/5 rounded-full blur-3xl" />
          </div>

          <TensionGauge data={tensionData} />
        </section>

        {/* Dashboard grid */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Left column - Score breakdown and updates */}
          <div className="space-y-6">
            <ScoreBreakdown data={tensionData} />
            <LiveUpdates
              lastUpdated={tensionData.lastUpdated}
              nextUpdate={tensionData.nextUpdate}
              onRefresh={handleRefresh}
            />
          </div>

          {/* Middle column - Charts and headlines */}
          <div className="space-y-6 lg:col-span-2">
            <HistoricalChart />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <NewsHeadlines />
              <EventTimeline />
            </div>
          </div>
        </section>

        <section className="mb-12">
          <TelegramAlerts />
        </section>

        {/* How it works */}
        <div id="how-it-works">
          <HowItWorks />
        </div>

        {/* FAQ */}
        <div id="faq">
          <FAQSection />
        </div>

        <section id="about" className="py-12 md:py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">About This Project</h2>
          <div className="max-w-2xl mx-auto space-y-4 text-muted-foreground">
            <p>
              The Maduro Index is inspired by the legendary &quot;Pentagon Pizza Index&quot; — the observation that
              late-night pizza deliveries to the Pentagon would historically spike before major military operations.
            </p>
            <p>
              Our modern interpretation uses AI-powered news sentiment analysis to track geopolitical tension levels in
              real-time, providing a data-driven (and satirical) view of global stability.
            </p>
            <p className="text-sm font-medium text-yellow-500/80">
              This is a satirical, independent project with no government affiliation. Built for entertainment and
              educational purposes only.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
