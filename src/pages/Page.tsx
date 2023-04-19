import React from 'react'
import { Helmet } from 'react-helmet'

interface Props {
  title: string
  pageComponent: React.ReactNode
}

export default function Page({ title, pageComponent }: Props) {
  return (
    <>
      <Helmet title={title} />
      {pageComponent}
    </>
  )
}
