import React from 'react'
import styled from '@emotion/styled'

interface Props {
  level?: 1 | 2 | 3 | 4 | 5 | 6
}

export default function Spacing({ level = 3 }: Props) {
  return <StyledSpacing level={level} />
}

const StyledSpacing = styled.div<{ level: 1 | 2 | 3 | 4 | 5 | 6 }>`
  height: ${({ level }) => level * 30}px;
`
