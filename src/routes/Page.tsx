import React from 'react'
import { Helmet } from 'react-helmet'

interface Props {
  route: {
    title: string
    renderPage: () => () => JSX.Element
  }
}

export default function Page({ route }: Props) {
  const PageComponent = route.renderPage()

  return (
    <>
      <Helmet title={route.title} />
      <PageComponent />
    </>
  )
}
