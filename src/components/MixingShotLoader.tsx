export function MixingShotLoader() {
  return (
    <div
      className="mt-5 rounded-2xl bg-secondary/30 border border-border p-8 flex flex-col items-center"
      role="status"
      aria-live="polite"
      aria-label="Mixing your shot"
    >
      <svg viewBox="0 0 120 150" className="w-28 h-36 text-foreground" aria-hidden="true">
        <defs>
          <linearGradient id="juice-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.78 0.2 142)" />
            <stop offset="100%" stopColor="oklch(0.58 0.19 142)" />
          </linearGradient>
          <clipPath id="glass-clip">
            <path d="M42 52 L50 128 Q52 134 60 134 Q68 134 70 128 L78 52 Z" />
          </clipPath>
        </defs>

        {/* Pour stream */}
        <rect
          x="57"
          y="8"
          width="6"
          height="44"
          rx="2"
          fill="url(#juice-gradient)"
          className="animate-pour-stream origin-top"
        />

        {/* Droplets */}
        <circle cx="54" cy="46" r="2" fill="oklch(0.68 0.19 142)" className="animate-pour-drop" style={{ animationDelay: "0.2s" }} />
        <circle cx="66" cy="50" r="1.5" fill="oklch(0.72 0.18 142)" className="animate-pour-drop" style={{ animationDelay: "0.5s" }} />

        {/* Liquid fill */}
        <g clipPath="url(#glass-clip)">
          <rect
            x="38"
            y="52"
            width="44"
            height="90"
            fill="url(#juice-gradient)"
            className="animate-juice-fill"
          />
          <ellipse
            cx="60"
            cy="52"
            rx="18"
            ry="3"
            fill="oklch(0.82 0.16 142)"
            className="animate-juice-surface"
          />
        </g>

        {/* Glass outline */}
        <path
          d="M42 52 L50 128 Q52 134 60 134 Q68 134 70 128 L78 52"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.35"
        />
        <path
          d="M38 52 L82 52"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.2"
        />
      </svg>

      <p className="mt-5 text-sm font-semibold text-primary">Mixing your shot…</p>
    </div>
  );
}
