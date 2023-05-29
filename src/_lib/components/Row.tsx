import React, { CSSProperties, PropsWithChildren } from 'react'
import styled from '@emotion/styled'

interface Props extends PropsWithChildren {
  alignItems?: CSSProperties['alignItems']
  gap?: CSSProperties['gap']
}

export default function Row({ children, alignItems = 'flex-start', gap = '4px' }: Props) {
  return (
    <StyledRow alignItems={alignItems} gap={gap}>
      {children}
    </StyledRow>
  )
}

const StyledRow = styled.div<{
  alignItems: CSSProperties['alignItems']
  gap: CSSProperties['gap']
}>`
  display: flex;
  align-items: ${({ alignItems }) => alignItems};
  gap: ${({ gap }) => gap};
`
