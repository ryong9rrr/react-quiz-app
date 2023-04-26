import React, { Suspense } from 'react'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'

import * as Atom from '@/components/atom'
import { routeTable } from '@/routes'

const NotFound = React.lazy(() => import('@/components/NotFound'))

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <>
      <Suspense>
        <NotFound />
      </Suspense>
      <Texts>
        <Atom.Text size="lg">존재하지 않는 페이지입니다.</Atom.Text>
        <Atom.Button onClick={() => navigate(routeTable.HOME.path)}>홈으로</Atom.Button>
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
