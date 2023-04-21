import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'

import Text from './Text'
import Button from './Button'
import { PALETTE } from '@/styles/theme'

interface Props {
  text: string
  path: string
  pathMessage: string
}

export default function RedirectionGuide({ text, path, pathMessage }: Props) {
  const navigate = useNavigate()

  const handleClickButton = () => {
    navigate(path)
  }

  return (
    <Container>
      <Text size="xlg">{text}</Text>
      <Button onClick={handleClickButton}>{pathMessage}</Button>
    </Container>
  )
}

const Container = styled.div`
  margin-top: 50px;
  border: 2px solid ${PALETTE.green[1]};
  border-radius: 8px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`
