const mongoose = require('mongoose');

const getMongoURL = (options) => {
    const url = options.servers
        .reduce((prev, cur) => prev + cur + ',',
            `mongodb://${options.user}:${options.pass}@`);
    return `${url.substr(0, url.length - 1)}/${options.db}`
}

const connect = (options, mediator) => {
    mediator.once('boot.ready', () => {
        console.log('Conectando con base de datos...')
        mongoose.connect(getMongoURL(options), {
            useNewUrlParser: true
        }).then((db) => mediator.emit('db.ready', db),
            err => mediator.emit('db.error', err));

    });
}

module.exports = Object.assign({}, {
    connect
});