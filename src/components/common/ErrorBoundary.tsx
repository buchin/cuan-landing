import { Component, ErrorInfo, ReactNode } from 'react'
import { RefreshCw } from 'lucide-react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)

    // Check if error is due to chunk mismatch after a new deployment
    const msg = error.message?.toLowerCase() || ''
    const isChunkOrMimeError =
      msg.includes('dynamically imported module') ||
      msg.includes('loading chunk') ||
      msg.includes('failed to fetch') ||
      msg.includes('mime type') ||
      msg.includes('unexpected token \'<\'')

    if (isChunkOrMimeError) {
      const key = 'cuan_chunk_reload_ts'
      const lastReload = sessionStorage.getItem(key)
      const now = Date.now()
      if (!lastReload || now - parseInt(lastReload, 10) > 10000) {
        sessionStorage.setItem(key, String(now))
        window.location.reload()
      }
    }
  }

  private handleReload = () => {
    window.location.reload()
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-dvh flex flex-col items-center justify-center bg-background text-foreground px-4 text-center">
          <div className="max-w-md p-6 rounded-2xl border border-border/70 bg-card/60 shadow-lg space-y-4">
            <h2 className="text-xl font-bold tracking-tight">Pembaruan Sistem Tersedia</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Versi terbaru aplikasi telah terpasang di server. Silakan muat ulang halaman untuk memperbarui data tampilan Anda.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={this.handleReload}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-foreground text-background text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Muat Ulang Halaman</span>
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
