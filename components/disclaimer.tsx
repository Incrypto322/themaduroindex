import { AlertTriangle } from "lucide-react"

export function Disclaimer() {
  return (
    <div className="mt-8 p-4 md:p-6 rounded-xl bg-muted/30 border border-border/50">
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-semibold text-sm uppercase tracking-wider mb-2">Disclaimer</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            This is a satirical data visualization project for entertainment and educational purposes only. Not
            affiliated with any government agency. Data based on public news sources and historical patterns. Do not use
            for actual decision-making. All political figures are used in satirical context.
          </p>
        </div>
      </div>
    </div>
  )
}
