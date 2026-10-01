import ErrorBoundary from './ErrorBoundary'
import DDoSMap from './DDoSMap'

export default function App() {
  return (
    <ErrorBoundary>
      <DDoSMap />
    </ErrorBoundary>
  )
}
