import React from 'react'
import styled from '@emotion/styled'
import { Colors } from '@/_lib/constants/theme'

interface Props {
  percentage: number
  height?: number
}

export default function ProgressBar({ percentage, height = 30 }: Props) {
  return (
    <StyledProgressBar>
      <Rail height={height} />
      <Track height={height} style={{ width: `${percentage}%` }} />
    </StyledProgressBar>
  )
}

const StyledProgressBar = styled.div`
  position: relative;
  width: 100%;
  height: 16px;
`

const Rail = styled.div<{ height: number }>`
  position: absolute;
  top: 6px;
  left: 0;
  width: 100%;
  height: ${({ height }) => height}px;
  border-radius: 2px;
  background-color: ${Colors.green200};
`

const Track = styled.div<{ height: number }>`
  position: absolute;
  top: 6px;
  left: 0;
  width: 0;
  height: ${({ height }) => height}px;
  border-radius: 2px;
  background-color: ${Colors.green300};
  background-size: 20px 20px;
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.15) 75%,
    transparent 75%,
    transparent 100%
  );

  animation: move 1000ms linear infinite;
  transition: width 100ms linear;

  @keyframes move {
    from {
      background-position: 0 0;
    }
    to {
      background-position: 40px 0;
    }
  }
`
