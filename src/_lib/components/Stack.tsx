import React, { CSSProperties } from 'react'
import styled from '@emotion/styled'
import { Colors } from '@/_lib/constants/theme'

interface Props {
  children?: React.ReactNode
  justifyContent?: CSSProperties['justifyContent']
  alignItems?: CSSProperties['alignItems']
  borderColor?: 'none' | string
  padding?: CSSProperties['padding']
}

export default function Stack({
  children,
  justifyContent = 'center',
  alignItems = 'center',
  borderColor = Colors.green200,
  padding = '24px',
}: Props) {
  return (
    <StyledStack
      justifyContent={justifyContent}
      alignItems={alignItems}
      borderColor={borderColor}
      padding={padding}
    >
      {children}
    </StyledStack>
  )
}

const StyledStack = styled.div<{
  justifyContent: CSSProperties['justifyContent']
  alignItems: CSSProperties['alignItems']
  borderColor: 'none' | string
  padding: CSSProperties['padding']
}>`
  border: ${({ borderColor }) => (borderColor === 'none' ? 'none' : `2px solid ${borderColor}`)};
  border-radius: 8px;
  padding: ${({ padding }) => padding};
  display: flex;
  flex-direction: column;
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  gap: 16px;
`
