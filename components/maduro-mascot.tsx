"use client"

import { getTensionLevel, type TensionLevel } from "@/lib/tension-data"

interface MaduroMascotProps {
  index: number
}

export function MaduroMascot({ index }: MaduroMascotProps) {
  const level = getTensionLevel(index)

  return (
    <div className="relative w-48 h-64 md:w-64 md:h-80">
      {/* Thermometer */}
      <div className="absolute right-0 top-4 w-8 h-56 md:h-72 bg-muted/30 rounded-full border border-border/50 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-8 bg-muted/50 rounded-full" />
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 rounded-t-full transition-all duration-1000"
          style={{
            height: `${Math.max(10, index)}%`,
            background:
              level === "critical"
                ? "linear-gradient(to top, #dc2626, #f97316)"
                : level === "high"
                  ? "linear-gradient(to top, #f97316, #eab308)"
                  : level === "elevated"
                    ? "linear-gradient(to top, #eab308, #22c55e)"
                    : level === "guarded"
                      ? "linear-gradient(to top, #22c55e, #3b82f6)"
                      : "linear-gradient(to top, #3b82f6, #06b6d4)",
          }}
        />
        {/* Temperature marks */}
        <div className="absolute top-2 left-0 w-full flex flex-col justify-between h-[85%] px-1">
          {[100, 80, 60, 40, 20].map((mark) => (
            <div key={mark} className="flex items-center gap-1">
              <div className="w-1 h-px bg-muted-foreground/50" />
              <span className="text-[8px] text-muted-foreground">{mark}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Maduro character */}
      <div className="relative w-40 md:w-52">
        <MaduroCharacter level={level} />
      </div>

      {/* Environment effects */}
      <EnvironmentEffects level={level} />
    </div>
  )
}

function MaduroCharacter({ level }: { level: TensionLevel }) {
  const getExpression = () => {
    switch (level) {
      case "low":
      case "guarded":
        return { eyes: "squint", mouth: "shiver", eyebrows: "worried" }
      case "elevated":
        return { eyes: "normal", mouth: "neutral", eyebrows: "normal" }
      case "high":
        return { eyes: "wide", mouth: "grimace", eyebrows: "raised" }
      case "critical":
        return { eyes: "panic", mouth: "scream", eyebrows: "panic" }
    }
  }

  const expr = getExpression()
  const isCold = level === "low" || level === "guarded"
  const isHot = level === "high"
  const isBurning = level === "critical"

  return (
    <svg viewBox="0 0 200 280" className="w-full h-full">
      {/* Body */}
      <ellipse cx="100" cy="220" rx="50" ry="40" fill="#1e3a5f" />
      {/* Suit/shoulders */}
      <path d="M50 180 Q50 220 60 250 L140 250 Q150 220 150 180 Q125 165 100 165 Q75 165 50 180" fill="#1e3a5f" />
      <path d="M85 165 L100 200 L115 165" fill="#c41e3a" /> {/* Tie */}
      {/* Head */}
      <ellipse
        cx="100"
        cy="100"
        rx="55"
        ry="65"
        fill={isCold ? "#9cb4d4" : isBurning ? "#ff6b6b" : isHot ? "#ffb366" : "#deb887"}
        className="transition-all duration-500"
      />
      {/* Hair */}
      <ellipse cx="100" cy="50" rx="45" ry="25" fill="#1a1a1a" />
      <path d="M55 50 Q55 80 60 100 Q55 80 55 50" fill="#1a1a1a" />
      <path d="M145 50 Q145 80 140 100 Q145 80 145 50" fill="#1a1a1a" />
      {/* Mustache */}
      <path d="M70 115 Q85 125 100 120 Q115 125 130 115 Q120 130 100 128 Q80 130 70 115" fill="#1a1a1a" />
      {/* Eyes */}
      <g className={isBurning ? "animate-pulse" : ""}>
        {expr.eyes === "squint" ? (
          <>
            <path d="M70 85 Q80 80 90 85" stroke="#1a1a1a" strokeWidth="3" fill="none" />
            <path d="M110 85 Q120 80 130 85" stroke="#1a1a1a" strokeWidth="3" fill="none" />
          </>
        ) : expr.eyes === "panic" ? (
          <>
            <ellipse cx="80" cy="85" rx="12" ry="15" fill="white" />
            <ellipse cx="120" cy="85" rx="12" ry="15" fill="white" />
            <circle cx="80" cy="88" r="6" fill="#1a1a1a" />
            <circle cx="120" cy="88" r="6" fill="#1a1a1a" />
            <circle cx="82" cy="86" r="2" fill="white" />
            <circle cx="122" cy="86" r="2" fill="white" />
          </>
        ) : expr.eyes === "wide" ? (
          <>
            <ellipse cx="80" cy="85" rx="10" ry="12" fill="white" />
            <ellipse cx="120" cy="85" rx="10" ry="12" fill="white" />
            <circle cx="80" cy="87" r="5" fill="#1a1a1a" />
            <circle cx="120" cy="87" r="5" fill="#1a1a1a" />
          </>
        ) : (
          <>
            <ellipse cx="80" cy="85" rx="8" ry="10" fill="white" />
            <ellipse cx="120" cy="85" rx="8" ry="10" fill="white" />
            <circle cx="80" cy="87" r="4" fill="#1a1a1a" />
            <circle cx="120" cy="87" r="4" fill="#1a1a1a" />
          </>
        )}
      </g>
      {/* Eyebrows */}
      {expr.eyebrows === "worried" && (
        <>
          <path d="M65 70 Q75 75 90 73" stroke="#1a1a1a" strokeWidth="3" fill="none" />
          <path d="M135 70 Q125 75 110 73" stroke="#1a1a1a" strokeWidth="3" fill="none" />
        </>
      )}
      {expr.eyebrows === "raised" && (
        <>
          <path d="M65 68 Q77 63 90 68" stroke="#1a1a1a" strokeWidth="3" fill="none" />
          <path d="M135 68 Q123 63 110 68" stroke="#1a1a1a" strokeWidth="3" fill="none" />
        </>
      )}
      {expr.eyebrows === "panic" && (
        <>
          <path d="M65 62 Q77 58 90 65" stroke="#1a1a1a" strokeWidth="4" fill="none" />
          <path d="M135 62 Q123 58 110 65" stroke="#1a1a1a" strokeWidth="4" fill="none" />
        </>
      )}
      {/* Mouth */}
      {expr.mouth === "shiver" && (
        <path
          d="M80 138 Q85 142 90 138 Q95 142 100 138 Q105 142 110 138 Q115 142 120 138"
          stroke="#1a1a1a"
          strokeWidth="2"
          fill="none"
          className="animate-pulse"
        />
      )}
      {expr.mouth === "neutral" && <path d="M85 140 Q100 145 115 140" stroke="#1a1a1a" strokeWidth="2" fill="none" />}
      {expr.mouth === "grimace" && <path d="M80 138 Q100 148 120 138" stroke="#1a1a1a" strokeWidth="2" fill="none" />}
      {expr.mouth === "scream" && <ellipse cx="100" cy="145" rx="15" ry="12" fill="#1a1a1a" />}
      {/* Sweat drops for hot/burning */}
      {(isHot || isBurning) && (
        <>
          <ellipse
            cx="55"
            cy="90"
            rx="4"
            ry="6"
            fill="#60a5fa"
            className="animate-bounce"
            style={{ animationDelay: "0ms" }}
          />
          <ellipse
            cx="145"
            cy="95"
            rx="3"
            ry="5"
            fill="#60a5fa"
            className="animate-bounce"
            style={{ animationDelay: "200ms" }}
          />
          <ellipse
            cx="50"
            cy="110"
            rx="3"
            ry="5"
            fill="#60a5fa"
            className="animate-bounce"
            style={{ animationDelay: "400ms" }}
          />
        </>
      )}
    </svg>
  )
}

function EnvironmentEffects({ level }: { level: TensionLevel }) {
  const isCold = level === "low" || level === "guarded"
  const isHot = level === "high"
  const isBurning = level === "critical"

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Snowflakes for cold */}
      {isCold && (
        <>
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute text-blue-300 animate-fall"
              style={{
                left: `${10 + i * 12}%`,
                top: `${-10 + (i % 3) * 10}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${2 + (i % 2)}s`,
              }}
            >
              ❄
            </div>
          ))}
        </>
      )}

      {/* Heat waves for hot */}
      {isHot && (
        <div className="absolute bottom-0 left-0 right-0 h-20">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute bottom-0 w-8 bg-gradient-to-t from-orange-500/30 to-transparent animate-heat-wave"
              style={{
                left: `${10 + i * 20}%`,
                height: `${40 + i * 10}px`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Flames for burning */}
      {isBurning && (
        <>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl md:text-3xl animate-flame"
              style={{
                left: `${5 + i * 15}%`,
                bottom: `${10 + (i % 3) * 5}%`,
                animationDelay: `${i * 0.15}s`,
              }}
            >
              🔥
            </div>
          ))}
        </>
      )}
    </div>
  )
}
