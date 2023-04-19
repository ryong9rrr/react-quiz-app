import React from 'react'
import { Helmet } from 'react-helmet'

import { Layout } from '@/components/Layout'

interface Props {
  route: {
    title: string
    renderPage: () => () => JSX.Element
  }
}

export default function Page({ route }: Props) {
  const PageComponent = route.renderPage()

  return (
    <Layout>
      <Helmet title={route.title} />
      <PageComponent />
    </Layout>
  )
}
