import { AlertTriangle } from "lucide-react"

export function Disclaimer() {
  return (
    <div className="w-full bg-yellow-500/10 border-b border-yellow-500/30">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-center gap-2 text-center">
          <AlertTriangle className="h-4 w-4 text-yellow-500 flex-shrink-0" />
          <p className="text-xs md:text-sm text-yellow-500/90">
            <span className="font-semibold">Satirical project for entertainment only.</span>{" "}
            <span className="hidden sm:inline">Not affiliated with any government. Do not use for decision-making.</span>
          </p>
        </div>
      </div>
    </div>
  )
}
