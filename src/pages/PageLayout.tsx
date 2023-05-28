import React, { ReactNode } from 'react'
import styled from '@emotion/styled'

export function PageLayout({ children }: { children: ReactNode }) {
  return <Main>{children}</Main>
}
const Main = styled.main`
  box-sizing: border-box;
  max-width: 100%;
  width: 100%;
  padding: 10px;
  margin: 0;
  height: auto;

  @media screen and (min-width: 512px) {
    width: 512px;
    margin: 0 auto;
  }
`
