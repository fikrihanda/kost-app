import { isEmpty, pick } from '#lodash'
import DB, { commit, rollback, transaction } from '~/server/database/models'
import { decrypt } from '~/server/tools/crypto'
import { sign } from '~/server/tools/jwt'


export default defineEventHandler(async (e) => {
  const { Admin } = DB
  const body = await useBody(e)
  const trans = await transaction()

  try {
    const admin =  await Admin.findOne({
      where: {
        username: body.username
      },
      transaction: trans
    })

    if (isEmpty(admin)) {
      await rollback(trans)
      return createError({
        statusCode: 500,
        statusMessage: 'Username tidak ada'
      })
    }

    const dec = decrypt(admin.password)


    if (dec !== body.password) {
      return createError({
        statusCode: 500,
        statusMessage: 'Password anda salah'
      })
    }

    const jwtSign = await sign(pick(admin, ['username']))
    await commit(trans)

    return {
      token: jwtSign
    }

  } catch (err) {
    await rollback(trans)
    return Promise.reject(err)
  }
})
