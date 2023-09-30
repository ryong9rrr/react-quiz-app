import React from 'react'
import styled from '@emotion/styled'
import useClock, { pad } from '@/hooks/useClock'

export default function Clock() {
  const { minutes, seconds } = useClock()

  return (
    <StyledClock className="clock">
      <div className="digits">
        <span className="minutes">{pad(minutes)}</span>
        <span>:</span>
        <span className="seconds">{pad(seconds)}</span>
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
