import { unescape } from 'html-escaper'

const targets = {
  '&#039;': "'",
}

export const decodeString = (str: string) => {
  Object.entries(targets).forEach(([key, value]) => {
    str = str.replaceAll(key, value)
  })
  return unescape(str)
}
