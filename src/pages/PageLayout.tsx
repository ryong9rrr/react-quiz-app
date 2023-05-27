import React, { ReactNode } from 'react'
import styled from '@emotion/styled'

export function PageLayout({ children }: { children: ReactNode }) {
  return <Main>{children}</Main>
}
const Main = styled.main`
  margin: 0 auto;
  min-width: 380px;
  max-width: 512px;
  padding: 20px 16px;
`
