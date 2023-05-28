import React from 'react'
import styled from '@emotion/styled'

interface Props {
  level?: number
}

export default function Spacing({ level = 6 }: Props) {
  return <StyledSpacing level={level} />
}

const StyledSpacing = styled.div<{ level: number }>`
  height: ${({ level }) => level * 10}px;
`
