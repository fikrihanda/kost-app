import { isEmpty } from '#lodash'
import DB, { commit, rollback, transaction, Sequelize } from '~/server/database/models'

export default defineEventHandler(async (e) => {
  const { Kost } = DB
  const { Op } = Sequelize
  const query = useQuery(e)
  const trans = await transaction()

  const { page = 1, perpage = 10, nama = '', alamat = '', kategori = '' } = query
  const where = {}

  if (!isEmpty(nama)) {
    where.nama = { [Op.like]: `%${nama}` }
  }

  if (!isEmpty(alamat)) {
    where.alamat = { [Op.like]: `%${alamat}` }
  }

  if (!isEmpty(kategori)) {
    where.kategori = { [Op.eq]: kategori }
  }

  try {
    const { count, rows } = await Kost.findAndCountAll({
      where,
      offset: (parseInt(page) - 1) * parseInt(perpage),
      limit: parseInt(perpage)
    })

    if (count === 0) {
      await rollback(trans)
      return createError({
        statusCode: 404,
        statusMessage: 'Kost tidak ada'
      })
    }

    await commit(trans)

    return {
      lists: rows,
      pagination: {
        page,
        perpage,
        total: count
      }
    }
  } catch(err) {
    await rollback(trans)
    return Promise.reject(err)
  }
})
