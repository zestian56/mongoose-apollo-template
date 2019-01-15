"use strict"
const {
    serverSettings,
    dbSettings
} = require('./config')

const db = require('./db/mongo')

module.exports = Object.assign({}, {
    serverSettings,
    dbSettings,
    db
})