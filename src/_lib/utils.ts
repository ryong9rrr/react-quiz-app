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
