import { unescape } from 'html-escaper'

export const decodeString = (str: string) => {
  const targets = {
    '&#039;': "'",
  }

  Object.entries(targets).forEach(([key, value]) => {
    str = str.replaceAll(key, value)
  })
  return unescape(str)
}

export const convertTimeDiff = (timeDiff: number) => {
  timeDiff /= 1000
  const hour = Math.floor(timeDiff / 3600)
  timeDiff %= 3600
  const min = Math.floor(timeDiff / 60)
  timeDiff %= 60
  const sec = Math.floor(timeDiff)
  return { hour, min, sec }
}
