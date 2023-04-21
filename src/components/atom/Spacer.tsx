import React from 'react'
import styled from '@emotion/styled'

interface Props {
  height: number
}

export default function Spacer({ ...props }: Props) {
  return <Container {...props} />
}

const Container = styled.div<Props>`
  height: ${({ height }) => height}px;
`
