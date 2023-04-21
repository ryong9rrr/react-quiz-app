import styled from '@emotion/styled'
import React, { CSSProperties } from 'react'
import { FONT_SIZE } from '@/styles/theme'

interface Props {
  children: React.ReactNode
  size?: keyof typeof FONT_SIZE
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
  font-size: ${({ size }) => FONT_SIZE[size || 'md']}px;
  font-weight: ${({ bold }) => (bold ? '600' : '400')};

  display: flex;
  flex-direction: column;
  gap: 10px;
`
