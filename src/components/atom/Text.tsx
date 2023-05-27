import styled from '@emotion/styled'
import React, { CSSProperties } from 'react'
import { FontSize } from '@/_lib/constants/theme'

interface Props {
  children: React.ReactNode
  size?: keyof typeof FontSize
  bold?: boolean
  style?: CSSProperties
}

export default function Text({ children, size = 'sm', bold = false, style = {} }: Props) {
  return (
    <Container size={size} bold={bold} style={style}>
      {children}
    </Container>
  )
}

const Container = styled.div<Props>`
  font-size: ${({ size }) => FontSize[size || 'md']}px;
  font-weight: ${({ bold }) => (bold ? '600' : '400')};

  display: flex;
  flex-direction: column;
  gap: 10px;
`
