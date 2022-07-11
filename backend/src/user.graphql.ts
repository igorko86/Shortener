export const userTypeDefs = `
    type User {
        id: Int
        username: String
        age: Int
    }

    type Query {
        getAllUsers: [User],
        getUser(id: Int!): User
    }

    input UserInput {
        username: String
        ages: Int
    }

    type Mutation {
        createUser(input: UserInput!): User!
    }
`;
