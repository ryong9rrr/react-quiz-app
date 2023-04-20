import React, { Suspense } from 'react'
import styled from '@emotion/styled'

const NotFound = React.lazy(() => import('@/components/NotFound'))

export default function NotFoundPage() {
  return (
    <>
      <Suspense>
        <NotFound />
      </Suspense>
      <Texts>
        <div>존재하지 않는 페이지입니다.</div>
        <button>홈으로</button>
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
