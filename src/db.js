import config from 'config'
import Sequelize from 'sequelize'

const host = config.get('db.host')
const port = config.get('db.port')
const username = config.get('db.username')
const password = config.get('db.password')
const database = config.get('db.databaseName')
const dialect = config.get('db.dialect')

const sequelize = new Sequelize({
  host,
  port,
  username,
  password,
  database,
  dialect
})

const Url = sequelize.define('url', {
  id: {
    type: Sequelize.DataTypes.STRING,
    primaryKey: true
  },
  url: Sequelize.DataTypes.STRING
})

;(async () => await sequelize.sync())() // eslint-disable-line no-return-await

export { Url }
