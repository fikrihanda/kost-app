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
  let dataAdmin

  try {
    dataAdmin = await Admin.findOne({
      where: {
        username: adminContext.username
      },
      transaction: trans
    })
    await commit(trans)
  } catch (err) {
    await rollback(trans)
    return createError({
      statusCode: 401,
      statusMessage: 'Token invalid'
    })
  }

  if (isEmpty(dataAdmin)) {
    return createError({
      statusCode: 401,
      statusMessage: 'Token invalid'
    })
  }

  return pick(dataAdmin, ['username', 'nama_depan', 'nama_belakang', 'photo_profile'])
})
