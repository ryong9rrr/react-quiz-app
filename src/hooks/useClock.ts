import React, { useEffect, useState } from 'react'

export default function useClock(start = getStartTime()) {
  const [timer, setTimer] = useState(0)

  useEffect(() => {
    const handler = setInterval(() => {
      setTimer(Math.floor((Date.now() - start) / 1000))
    }, 1000)
    return () => clearTimeout(handler)
  }, [start])

  const seconds = timer % 60
  const minutes = Math.floor(timer / 60)
  return { minutes, seconds }
}

export function getStartTime() {
  sessionStorage.removeItem('quiz-time')
  const startTime = sessionStorage.getItem('quiz-start-time')
  if (startTime === null) {
    const now = Date.now()
    sessionStorage.setItem('quiz-start-time', String(now))
    return now
  }
  return Number(startTime)
}

export function pad(timer: number) {
  return timer < 10 ? `0${timer}` : `${timer}`
}

export function quit() {
  const start = getStartTime()
  const timer = Math.floor((Date.now() - start) / 1000)
  const seconds = timer % 60
  const minutes = Math.floor(timer / 60)
  sessionStorage.setItem('quiz-time', `${pad(minutes)}:${pad(seconds)}`)
  sessionStorage.removeItem('quiz-start-time')
}

export function getTime() {
  return sessionStorage.getItem('quiz-time')
}
