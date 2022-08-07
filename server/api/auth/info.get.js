import DB, { rollback, transaction, commit } from '~/server/database/models'
import { isEmpty, pick } from '#lodash'

export default defineEventHandler(async (e) => {
  const { Admin } = DB
  const adminContext = e.context?.admin

  if (isEmpty(adminContext)) {
    return createError({
      statusCode: 401,
      statusMessage: 'Token missing, info'
    })
  }

  const trans = await transaction()

  try {
    const dataAdmin = await Admin.findOne({
      where: {
        username: adminContext.username
      },
      transaction: trans
    })
    if (isEmpty(dataAdmin)) {
      await rollback(trans)
      return createError({
        statusCode: 401,
        statusMessage: 'Token invalid'
      })
    }
    await commit(trans)
    return pick(dataAdmin, ['username', 'nama_depan', 'nama_belakang', 'photo_profile'])
  } catch (err) {
    await rollback(trans)
    return createError({
      statusCode: 401,
      statusMessage: 'Token invalid'
    })
  }
})
