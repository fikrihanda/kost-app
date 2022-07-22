import fs from 'node:fs'
import { Sequelize as Sq } from 'sequelize'
import configDb from '../config/database.json'

const env = process.env.NODE_ENV || 'development'
const config = configDb[env]
const db = {}

let sq
if (config.use_env_variable) {
  sq = new Sq(process.env[config.use_env_variable], config)
} else {
  sq = new Sq(config.database, config.username, config.password, config)
}

const fileImportAsync = fs
  .readdirSync('./server/database/models')
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== 'index.js') && (file.slice(-3) === '.js')
  })
  .map(async file => {
    return await import(`../../server/database/models/${file}`)
  })

Promise.all(fileImportAsync).then(fileImportSync => {
  fileImportSync.forEach(models => {
    const model = models.default(sq, Sq.DataTypes)
    db[model.name] = model
  })
})

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

export const sequelize = sq
export const Sequelize = Sq
export const transaction = async () => await sequelize.transaction()
export const rollback = async (trans) => await trans.rollback()
export const commit = async (trans) => await trans.commit()

export default db
