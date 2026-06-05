type LetterProps = { char: string; delay: number; className?: string };

const ACCENT =
  "italic bg-gradient-to-r from-primary via-emerald-400 to-primary bg-clip-text text-transparent";

function Letter({ char, delay, className }: LetterProps) {
  return (
    <span className="inline-block overflow-hidden align-bottom">
      <span
        className={`inline-block opacity-0 animate-letter-rise ${className ?? ""}`}
        style={{ animationDelay: `${delay}ms` }}
      >
        {char === " " ? "\u00a0" : char}
      </span>
    </span>
  );
}

function AnimatedWord({ text, startDelay, className }: { text: string; startDelay: number; className?: string }) {
  return text.split("").map((char, i) => (
    <Letter key={`${text}-${i}`} char={char} delay={startDelay + i * 50} className={className} />
  ));
}

type Part = { text: string; accent?: boolean };

function AnimatedRevealTitle({ parts, ariaLabel }: { parts: Part[]; ariaLabel: string }) {
  let delay = 0;
  return (
    <h1 className="mt-4 md:mt-6 text-2xl md:text-4xl font-bold tracking-tight" aria-label={ariaLabel}>
      {parts.map((part, i) => {
        const start = delay;
        delay += part.text.length * 50;
        return (
          <span key={i} className="inline">
            <AnimatedWord
              text={part.text}
              startDelay={start}
              className={part.accent ? ACCENT : undefined}
            />
          </span>
        );
      })}
    </h1>
  );
}

export function MorningTitle() {
  return (
    <AnimatedRevealTitle
      ariaLabel="Good morning"
      parts={[{ text: "Good " }, { text: "morning", accent: true }]}
    />
  );
}

export function ShotTenderTitle() {
  return (
    <AnimatedRevealTitle
      ariaLabel="Shot-Tender"
      parts={[{ text: "Shot-" }, { text: "Tender", accent: true }]}
    />
  );
}
