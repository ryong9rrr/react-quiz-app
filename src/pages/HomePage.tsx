import React from 'react'
import styled from '@emotion/styled'
import { PALETTE } from '@/styles/theme'

export default function HomePage() {
  return <Container>HomePage</Container>
}

const Container = styled.div`
  margin-top: 150px;
  padding: 24px;
  border: 2px solid ${PALETTE.green[1]};
  border-radius: 8px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 16px;
  text-align: center;
`
