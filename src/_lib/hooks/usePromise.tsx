import { useState } from 'react'

export default function usePromise(fn: () => void) {
  const [status, setStatus] = useState<'loading' | 'idle' | 'complete' | 'error'>('idle')

  const trigger = async () => {
    setStatus('loading')
    try {
      await fn()
      setStatus('complete')
    } catch (e) {
      setStatus('error')
    }
  }

  return { status, trigger }
}
