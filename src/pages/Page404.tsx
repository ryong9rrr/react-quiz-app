import React from 'react'
import Lottie from 'lottie-react'
import Text from '@/_lib/components/Text'
import Button from '@/_lib/components/Button'
import Stack from '@/_lib/components/Stack'
import { data } from '@/_lib/constants/notFoundLottie'
import { useRouter } from './routing'

export default function Page404() {
  const router = useRouter()

  return (
    <>
      <Lottie
        height={400}
        width={400}
        loop
        autoPlay
        animationData={data}
        rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
      />
      <Stack>
        <Text size="lg">존재하지 않는 페이지입니다.</Text>
        <Button onClick={() => router.push('/')}>홈으로</Button>
      </Stack>
    </>
  )
}
