import { isEmpty } from '#lodash'
import DB, { commit, rollback, Sequelize, transaction } from '~/server/database/models'

export default defineEventHandler(async (e) => {
  const { KategoriKost } = DB
  const { Op } = Sequelize
  const body = useBody(e)
  const id = e.context.params?.id

  if (isEmpty(id)) {
    return createError({
      statusCode: 404,
      statusMessage: 'Id Kategori Kost kosong'
    })
  }

  const trans = await transaction()

  try {
    const findKost = await KategoriKost.findOne({
      where: {
        id: {
          [Op.eq]: id
        }
      },
      transaction: trans
    })
    if (isEmpty(findKost)) {
      await rollback(trans)
      return createError({
        statusCode: 404,
        statusMessage: 'Kategori Kost tidak ditemukan'
      })
    }
    await Kost.update(body, {
      where: {
        id: {
          [Op.eq]: id
        }
      },
      transaction: trans
    })
    await commit(trans)
    return Promise.resolve()
  } catch(err) {
    await rollback(trans)
    return Promise.resolve(err)
  }
})
