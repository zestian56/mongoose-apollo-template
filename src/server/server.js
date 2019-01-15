'use strict'

const {
    ApolloServer
} = require('apollo-server');
const {
    makeExecutableSchema
} = require('graphql-tools');

const {rootTypeDefs,rootResolvers} = require('../common/root/root.schema');
const { userResolvers, userTypeDefs } = require('../common/user/user.schema');

const schema = makeExecutableSchema({
    typeDefs: [rootTypeDefs,userTypeDefs],
    resolvers: [rootResolvers,userResolvers]
});

const start = async (options,db) => {

    return new Promise(async (resolve, reject) => {
        const server = new ApolloServer({
            schema,
            formatError(error) {
                console.log(error);
                reject(error)
            },
        });
        resolve(server.listen({
            port: options.port
        }))
    });
};


module.exports = Object.assign({}, {
    start
});