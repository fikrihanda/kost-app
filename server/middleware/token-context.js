import { isEmpty } from '#lodash'
import { verify } from '~/server/tools/jwt'
import DB, { commit, rollback, transaction } from '~/server/database/models'

export default defineEventHandler(async (e) => {
  const auth = e.req.headers?.Authorization || e.req.headers?.authorization
  const { Admin } = DB

  if (!e.req.url.startsWith('/api')) {
    return
  }

  if (isEmpty(auth)) {
    return
  }

  const token = auth.split(' ')?.[1]
  if (isEmpty(token)) {
    return createError({
      statusCode: 401,
      statusMessage: 'Token missing'
    })
  }

  let veri
  try {
    veri = await verify(token)
    if (isEmpty(veri)) {
      return createError({
        statusCode: 401,
        statusMessage: 'Wrong Token'
      })
    }
  } catch (err) {
    return createError({
      statusCode: 401,
      statusMessage: 'Wrong Token'
    })
  }

  const trans = await transaction()
  try {
    const admin = await Admin.findOne({
      where: {
        username: veri.username
      },
      transaction: trans
    })
    if (isEmpty(admin)) {
      await rollback(trans)
      return createError({
        statusCode: 401,
        statusMessage: 'Wrong Token'
      })
    }
    await commit(trans)
    e.context.admin = {
      username: admin.username
    }
  } catch (err) {
    await rollback(trans)
    return createError({
      statusCode: 401,
      statusMessage: 'Wrong Token'
    })
  }
})
