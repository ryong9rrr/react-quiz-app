import React from 'react'
import styled from '@emotion/styled'

export default function ResultPage() {
  return (
    <>
      ResultPage
      <ButtonContainer>
        <button>새로운 퀴즈 풀기</button>
      </ButtonContainer>
    </>
  )
}

const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`
