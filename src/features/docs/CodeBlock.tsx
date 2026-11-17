import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface CodeBlockProps {
  code: string
  language?: string
}

const LANGUAGE_LABELS: Record<string, string> = {
  bash: 'Terminal',
  chat: 'Instruksi Chat (@cuan)',
  html: 'HTML',
  js: 'JavaScript',
  json: 'JSON',
  yaml: 'YAML',
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
    }
  }

  const label = language ? (LANGUAGE_LABELS[language] || language) : 'Terminal'

  return (
    <div className="relative my-3 rounded-xl border border-border/70 bg-muted/30 p-3 sm:p-4 text-xs sm:text-sm font-mono overflow-hidden">
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-border/40 text-muted-foreground text-xs select-none">
        <span className="font-sans font-medium text-[11px] tracking-wide text-muted-foreground/80">{label}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors cursor-pointer select-none"
          title="Salin kode"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-500" />
              <span className="text-emerald-500 text-[11px]">Tersalin</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span className="text-[11px]">Salin</span>
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto text-foreground whitespace-pre leading-relaxed scrollbar-thin">
        <code>{code}</code>
      </pre>
    </div>
  )
}
