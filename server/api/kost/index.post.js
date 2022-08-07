import { isEmpty } from '#lodash'
import DB, { commit, rollback, transaction } from '~/server/database/models'

export default defineEventHandler(async (e) => {
  const { Kost, KategoriKost } = DB
  const body = useBody(e)
  const trans = await transaction()

  try {
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

    await Kost.create(body, {
      transaction: trans
    })
    await commit(trans)
    return Promise.resolve()
  } catch(err) {
    await rollback(trans)
    return Promise.resolve(err)
  }
})
