import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface CodeBlockProps {
  code: string
  language?: string
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

  return (
    <div className="relative my-3 rounded-lg border border-border/70 bg-muted/40 p-3 sm:p-4 text-xs sm:text-sm font-mono overflow-hidden">
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-border/40 text-muted-foreground text-xs select-none">
        <span>{language || 'bash'}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
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
