import React, { ReactNode } from 'react'
import { Helmet } from 'react-helmet'

export function PageContainer({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <Helmet title={`${title} | Mini-Quiz`} />
      {children}
    </>
  )
}
