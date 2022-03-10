const pgp = require('pg-promise')()

const username = 'postgres'
const password = '1234'
const host = 'localhost'
const port = 5432
const database = 'revision'

const connectionString = `postgres://${username}:${password}@${host}:${port}/${database}`

const db = pgp(connectionString)

module.exports = db