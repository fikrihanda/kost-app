import { isEmpty } from '#lodash'
import DB, { commit, rollback, transaction, Sequelize } from '~/server/database/models'

export default defineEventHandler(async (e) => {
  const { KategoriKost } = DB
  const { Op } = Sequelize
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
    await commit(trans)
    return findKost
  } catch (err) {
    await rollback(trans)
    return Promise.reject(err)
  }
})
