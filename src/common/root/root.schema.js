const {
    gql
} = require('apollo-server');

const rootTypeDefs = gql `
type Mutation {
  status: Boolean!
}
type Query {
  status: String!
}
`

const rootResolvers = {
    Mutation: {
        status: () => true
    },
    Query: {
        status: () => 'The API is up and running!'
    }
}

module.exports = Object.assign({}, {
    rootResolvers,
    rootTypeDefs
})