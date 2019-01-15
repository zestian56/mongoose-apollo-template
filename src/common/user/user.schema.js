const User = require('./user.model')
const {
    gql
} = require('apollo-server');

const userTypeDefs = gql `
  type User {
    id: ID!
    email: String!
    password: String!
    firstName: String!
    lastName: String
    # Last name is not a required field so it 
    # does not need a "!" at the end.
  }
  input UserFilterInput {
    limit: Int
  }
  # Extending the root Query type.
  extend type Query {
    users(filter: UserFilterInput): [User]
    user(id: String!): User
  }
  # We do not need to check if any of the input parameters
  # exist with a "!" character. This is because mongoose will
  # do this for us, and it also means we can use the same
  # input on both the "addUser" and "editUser" methods.
  input UserInput {
    email: String
    password: String
    firstName: String
    lastName: String
    id: String
  }
  # Extending the root Mutation type.
  extend type Mutation {
    addUser(input: UserInput!): User
    editUser(id: String!, input: UserInput!): User
    deleteUser(id: String!): User
  }
`;

const userResolvers = {
    Query: {
        users: async (_, {
            filter = {}
        }) => {
            const users = await User.find({}, null, filter);
            return users.map(user => user.toGraph());
        },
        user: async (_, {
            id
        }) => {
            const user = await User.findById(id);
            return user.toGraph();
        },
    },
    Mutation: {
        addUser: async (_, {
            input
        }) => {
            const user = await User.create(input);
            return user.toGraph();
        },
        editUser: async (_, {
            id,
            input
        }) => {
            const user = await User.findByIdAndUpdate(id, input);
            return user.toGraph();
        },
        deleteUser: async (_, {
            id
        }) => {
            const user = await User.findByIdAndRemove(id);
            return user ? user.toGraph() : null;
        },
    },
};

module.exports = Object.assign({}, {
    userTypeDefs,
    userResolvers
})