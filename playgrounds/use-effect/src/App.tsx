import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'

type ApiPost = {
  userId: number
  id: number
  title: string
  body: string
}

function DataFetchDemo() {
  const [data, setData] = useState<ApiPost | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [retryIndex, setRetryIndex] = useState<number>(0)

  // Stable URL for demo; could be made configurable
  const url = useMemo(() => 'https://jsonplaceholder.typicode.com/posts/1', [])

  useEffect(() => {
    const abortController = new AbortController()
    const { signal } = abortController

    let isMounted = true
    setLoading(true)
    setError(null)

    ;(async () => {
      try {
        const response = await fetch(url, { signal })
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }
        const json = (await response.json()) as ApiPost
        if (isMounted) {
          setData(json)
        }
      } catch (err) {
        if (signal.aborted) return
        const message = err instanceof Error ? err.message : 'Unknown error'
        if (isMounted) setError(message)
      } finally {
        if (isMounted) setLoading(false)
      }
    })()

    return () => {
      isMounted = false
      abortController.abort()
    }
  }, [url, retryIndex])

  return (
    <div className="card" style={{ textAlign: 'left' }}>
      <h2>useEffect: Data Fetch with Cancel/Retry</h2>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <button onClick={() => setRetryIndex((i) => i + 1)} disabled={loading}>
          {loading ? 'Loading…' : 'Retry'}
        </button>
        {error && (
          <span style={{ color: 'crimson' }} role="alert">
            Error: {error}
          </span>
        )}
      </div>
      <pre style={{ background: '#111', color: '#0f0', padding: 12, borderRadius: 8, overflowX: 'auto' }}>
        {loading ? 'Loading…' : JSON.stringify(data, null, 2)}
      </pre>
      <small>
        Cleanup: in-flight request is aborted on retry/unmount via AbortController.
      </small>
    </div>
  )
}

function TimerDemo() {
  const [secondsLeft, setSecondsLeft] = useState<number>(30)
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const intervalRef = useRef<number | null>(null)

  // Start/stop interval based on isRunning
  useEffect(() => {
    if (!isRunning) return

    intervalRef.current = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          // Auto-stop when reaches 0
          setIsRunning(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isRunning])

  const toggle = () => setIsRunning((r) => !r)
  const reset = () => {
    setIsRunning(false)
    setSecondsLeft(30)
  }

  return (
    <div className="card" style={{ textAlign: 'left' }}>
      <h2>useEffect: Countdown Timer with Cleanup</h2>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <strong style={{ fontSize: 24 }}>{secondsLeft}s</strong>
        <button onClick={toggle}>{isRunning ? 'Pause' : 'Start'}</button>
        <button onClick={reset}>Reset</button>
      </div>
      <small>
        Cleanup: interval cleared on pause/reset/unmount via effect cleanup.
      </small>
    </div>
  )
}

function App() {
  return (
    <>
      <h1>useEffect Exercises</h1>
      <DataFetchDemo />
      <TimerDemo />
    </>
  )
}

export default App
