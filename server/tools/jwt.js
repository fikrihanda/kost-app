import jwt from 'jsonwebtoken'

export const sign = function (data) {
  return new Promise((resolve, reject) => {
    jwt.sign(data, process.env.PASSWORD_KEY, {
      expiresIn: '7d'
    }, (err, token) => {
      if (err) return reject(err)
      return resolve(token)
    })
  })
}

export const verify = function (data) {
  return new Promise((resolve, reject) => {
    jwt.verify(data, process.env.PASSWORD_KEY, {
      expiresIn: '7d'
    }, (err, decode) => {
      if (err) return reject(err)
      return resolve(decode)
    })
  })
}
