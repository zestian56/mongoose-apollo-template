"use strict"

const dbSettings = {
    db: 'esaes',
    user: 'zestian',
    pass: 'zestian123',
    servers: (process.env.DB_SERVERS) ? process.env.DB_SERVERS.split(' ') : [
        'ds155774.mlab.com:55774',
    ],
}

const serverSettings = {
    port: process.env.SERVICEPORT || 3000,
    host: process.env.SERVICEHOST || 'localhost'
}


module.exports = Object.assign({}, {
    serverSettings,
    dbSettings
})