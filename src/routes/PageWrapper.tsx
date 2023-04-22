import React from 'react'
import { Helmet } from 'react-helmet'
import styled from '@emotion/styled'

interface Props {
  route: {
    title: string
    renderPage: () => () => JSX.Element
  }
}

export default function Page({ route }: Props) {
  const PageComponent = route.renderPage()

  return (
    <Main>
      <Helmet title={route.title} />
      <PageComponent />
    </Main>
  )
}
const Main = styled.main`
  margin: 0 auto;
  min-width: 380px;
  max-width: 512px;
  padding: 20px 16px;
`
