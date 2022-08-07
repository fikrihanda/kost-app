import DB, { commit, rollback, transaction } from '~/server/database/models'

export default defineEventHandler(async (e) => {
  const { KategoriKost } = DB
  const body = useBody(e)
  const trans = await transaction()

  try {
    await KategoriKost.create(body, {
      transaction: trans
    })
    await commit(trans)
    return Promise.resolve()
  } catch(err) {
    await rollback(trans)
    return Promise.resolve(err)
  }
})
