import React, { useMemo } from 'react'
import { NavigateOptions, useNavigate } from 'react-router-dom'

export function useRouter() {
  const navigate = useNavigate()
  return useMemo(() => {
    return {
      back(step = 1) {
        navigate(step)
      },
      push(path: RoutePath, options?: NavigateOptions) {
        navigate(path, options)
      },
    }
  }, [navigate])
}

export type RoutePath = '/' | '/solve' | '/result' | '/note'
