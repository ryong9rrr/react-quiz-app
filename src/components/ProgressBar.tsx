import React from 'react'
import styled from '@emotion/styled'

import { PALETTE } from '@/styles/theme'

interface ProgressProps {
  value: number
  height?: number
}

export default function ProgressBar({ value, height = 30, ...props }: ProgressProps) {
  return (
    <ProgressContainer {...props}>
      <Rail height={height} />
      <Track height={height} style={{ width: `${value}%` }} />
    </ProgressContainer>
  )
}

const ProgressContainer = styled.div`
  position: relative;
  width: 100%;
  height: 16px;
`

const Rail = styled.div<Pick<ProgressProps, 'height'>>`
  position: absolute;
  top: 6px;
  left: 0;
  width: 100%;
  height: ${({ height }) => height}px;
  border-radius: 2px;
  background-color: ${PALETTE.green[1]};
`

const Track = styled.div<Pick<ProgressProps, 'height'>>`
  position: absolute;
  top: 6px;
  left: 0;
  width: 0;
  height: ${({ height }) => height}px;
  border-radius: 2px;
  background-color: ${PALETTE.green[2]};
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
