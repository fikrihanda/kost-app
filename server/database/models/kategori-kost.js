'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class KategoriKost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      KategoriKost.hasMany(models.Kost, {
        foreignKey: 'kategori'
      })
    }
  }
  KategoriKost.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    nama: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'KategoriKost',
    tableName: 'kategori_kost'
  })
  return KategoriKost
}
