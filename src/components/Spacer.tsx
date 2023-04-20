import React from 'react'
import styled from '@emotion/styled'

interface SpacerProps {
  height: number
}

export default function Spacer({ ...props }: SpacerProps) {
  return <Container {...props} />
}

const Container = styled.div<SpacerProps>`
  height: ${({ height }) => height}px;
`
