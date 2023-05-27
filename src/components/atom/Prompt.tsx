import React, { CSSProperties } from 'react'
import styled from '@emotion/styled'

import Text from './Text'
import { Colors } from '@/_lib/constants/theme'

interface Props {
  text: string
  children?: React.ReactNode
  style?: CSSProperties
}

export default function Prompt({ text, children, style = {} }: Props) {
  return (
    <Container style={{ ...style }}>
      <Text size="xlg">{text}</Text>
      {children}
    </Container>
  )
}

const Container = styled.div`
  border: 2px solid ${Colors.green200};
  border-radius: 8px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`
