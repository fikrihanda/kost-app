import { isEmpty } from '#lodash'
import DB, { commit, rollback, Sequelize, transaction } from '~/server/database/models'

export default defineEventHandler(async (e) => {
  const { Kost, KategoriKost } = DB
  const { Op } = Sequelize
  const body = useBody(e)
  const id = e.context.params?.id

  if (isEmpty(id)) {
    return createError({
      statusCode: 404,
      statusMessage: 'Id kost kosong'
    })
  }

  const trans = await transaction()

  try {
    const findKost = await Kost.findOne({
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
        statusMessage: 'Kost tidak ditemukan'
      })
    }

    if (!isEmpty(body?.kategori) && body?.kategori !== findKost.kategori) {
      const findKategoriKost = await KategoriKost.findOne({
        where: {
          id: body.kategori
        },
        transaction: trans
      })

      if (isEmpty(findKategoriKost)) {
        await rollback(trans)
        return createError({
          statusCode: 404,
          statusMessage: 'Id Kategori Kost kosong'
        })
      }
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
