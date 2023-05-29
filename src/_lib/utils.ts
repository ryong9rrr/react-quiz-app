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

export const makeClock = (entiredSeconds: number) => {
  const seconds = entiredSeconds % 60
  const minutes = Math.floor(entiredSeconds / 60)
  return { minutes, seconds }
}
