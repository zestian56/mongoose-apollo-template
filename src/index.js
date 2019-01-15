"use strict"
const {
    EventEmitter
} = require('events');
const server = require('./server/server');
const config = require('./config/');
const mediator = new EventEmitter();

process.on('uncaughtException', (err) => {
    console.error('Unhandled Exception', err)
});
process.on('uncaughtRejection', (err, promise) => {
    console.error('Unhandled Rejection', err)
});


const main = async (db) => {
    console.log('Base de datos lista')
    console.log('Iniciando servidor...')
    const serverParams = await server.start({
        port: config.serverSettings.port,
        host: config.serverSettings.host
    },db);
    console.log('Servidor corriendo en ' + serverParams.url);
}

mediator.on('db.ready', main);
mediator.on('db.error',(err) => console.log('Error en la conexión',err));

config.db.connect(config.dbSettings, mediator);

mediator.emit('boot.ready')