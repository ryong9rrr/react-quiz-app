import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'

export default function Clock() {
  const { minutes, seconds } = useClock()

  return (
    <StyledClock className="clock">
      <div className="digits">
        <span className="minutes">{minutes < 10 ? `0${minutes}` : minutes}</span>
        <span>:</span>
        <span className="seconds">{seconds < 10 ? `0${seconds}` : seconds}</span>
      </div>
    </StyledClock>
  )
}

const StyledClock = styled.div`
  display: flex;
  justify-content: flex-end;

  digits {
    display: flex;
    font-size: 16px;
    font-weight: bold;
  }
`

function useClock(start = getStartTime()) {
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

export function quit() {
  const start = getStartTime()
  const timer = Math.floor((Date.now() - start) / 1000)
  const seconds = timer % 60
  const minutes = Math.floor(timer / 60)
  sessionStorage.setItem('quiz-time', `${minutes}:${seconds}`)
  sessionStorage.removeItem('quiz-start-time')
}

export function getTime() {
  return sessionStorage.getItem('quiz-time')
}

function getStartTime() {
  sessionStorage.removeItem('quiz-time')
  const startTime = sessionStorage.getItem('quiz-start-time')
  if (startTime === null) {
    const now = Date.now()
    sessionStorage.setItem('quiz-start-time', String(now))
    return now
  }
  return Number(startTime)
}
