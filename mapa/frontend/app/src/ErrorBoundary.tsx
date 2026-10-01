import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary] Caught error:', error, info.componentStack)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback

      return (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: '#0a0f1c',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
          color: '#4fc3f7',
          gap: '16px',
          padding: '24px',
        }}>
          <div style={{
            fontSize: '48px',
            marginBottom: '8px',
            color: '#f44336',
          }}>
            &#9888;
          </div>
          <h1 style={{
            fontSize: '22px',
            fontWeight: 700,
            color: '#e0e6ed',
            margin: 0,
            letterSpacing: '1px',
          }}>
            Rendering Error
          </h1>
          <p style={{
            fontSize: '13px',
            color: '#667788',
            maxWidth: '480px',
            textAlign: 'center',
            margin: 0,
          }}>
            {this.state.error?.message || 'An unexpected error occurred while rendering the map.'}
          </p>
          <button
            onClick={this.handleRetry}
            style={{
              marginTop: '8px',
              padding: '10px 28px',
              borderRadius: '8px',
              border: '1px solid #4fc3f7',
              background: 'rgba(79,195,247,0.12)',
              color: '#4fc3f7',
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '1px',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(79,195,247,0.25)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(79,195,247,0.12)')}
          >
            RETRY
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
