import styled from '@emotion/styled'
import React from 'react'

interface Props {
  children: React.ReactNode
}

export function Layout({ children }: Props) {
  return (
    <Container>
      <Main>{children}</Main>
    </Container>
  )
}

const Container = styled.div`
  min-height: 100vh;
`

const Main = styled.main`
  margin: 0 auto;
  min-width: 380px;
  max-width: 512px;
  padding: 20px 16px;
`
