import React, { Suspense } from 'react'
import styled from '@emotion/styled'

import * as Atom from '@/components/atom'
import { useRouter } from './routing'

const NotFound = React.lazy(() => import('@/components/NotFound'))

export default function Page404() {
  const router = useRouter()

  return (
    <>
      <Suspense>
        <NotFound />
      </Suspense>
      <Texts>
        <Atom.Text size="lg">존재하지 않는 페이지입니다.</Atom.Text>
        <Atom.Button onClick={() => router.push('/')}>홈으로</Atom.Button>
      </Texts>
    </>
  )
}

const Texts = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`
