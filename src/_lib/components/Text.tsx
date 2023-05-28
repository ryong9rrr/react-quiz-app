import styled from '@emotion/styled'
import React, { CSSProperties } from 'react'
import { FontSize } from '@/_lib/constants/theme'

interface Props {
  children: React.ReactNode
  size?: keyof typeof FontSize
  bold?: boolean
  style?: CSSProperties
}

export default function Text({ children, size = 'md', bold = false, style = {} }: Props) {
  return (
    <StyledText size={size} bold={bold} style={style}>
      {children}
    </StyledText>
  )
}

const StyledText = styled.div<{ size: keyof typeof FontSize; bold: boolean }>`
  font-size: ${({ size }) => FontSize[size]}px;
  font-weight: ${({ bold }) => (bold ? '600' : '400')};

  display: flex;
  flex-direction: column;
  gap: 10px;
`
