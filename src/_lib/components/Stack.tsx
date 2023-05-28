import React, { CSSProperties } from 'react'
import styled from '@emotion/styled'
import { Colors } from '@/_lib/constants/theme'

interface Props {
  children?: React.ReactNode
  style?: CSSProperties
}

export default function Stack({ children, style = {} }: Props) {
  return <StyledStack style={{ ...style }}>{children}</StyledStack>
}

const StyledStack = styled.div`
  border: 2px solid ${Colors.green200};
  border-radius: 8px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`
