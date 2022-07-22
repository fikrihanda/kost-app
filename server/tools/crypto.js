import { createCipheriv, scryptSync, createDecipheriv } from 'node:crypto'
import Buffer from 'node:buffer'

const algorithm = 'aes-192-cbc'
const iv = Buffer.Buffer.alloc(16, 0)
const config = useRuntimeConfig()

export const decrypt = function (data) {
  const key = scryptSync(config.passwordKey, 'GfG', 24)
  const decipher = createDecipheriv(algorithm, key, iv)
  let decryptedData = decipher.update(data, 'hex', 'utf-8')
  decryptedData += decipher.final('utf8')
  return decryptedData
}

export const encrypt = function (data) {
  const key = scryptSync(config.passwordKey, 'GfG', 24)
  const cipher = createCipheriv(algorithm, key, iv)
  let encryptedData = cipher.update(data, 'utf-8', 'hex')
  encryptedData += cipher.final('hex')
  return encryptedData
}
