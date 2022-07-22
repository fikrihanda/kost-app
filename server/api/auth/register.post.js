import { isEmpty } from '#lodash'
import DB, { rollback, transaction, commit } from '~/server/database/models'
import { encrypt } from '~/server/tools/crypto'

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

    if (!isEmpty(admin)) {
      return createError({
        statusCode: 500,
        statusMessage: 'Username sudah ada'
      })
    }

    const encPass = encrypt(body.password)

    await Admin.create({
      username: body.username,
      password: encPass,
      nama_depan: body.username
    }, { transaction: trans })

    await commit(trans)

    return { success: true }
  } catch (err) {
    await rollback(trans)
    return Promise.reject(err)
  }
})
