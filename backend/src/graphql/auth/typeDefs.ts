export const authTypeDefs = `
    type User {
        id: String
        name: String
        email: String
        type: String
        token: String
    }

    type Query {
       getUser(id: Int!): User
       verify: Boolean

    }

    input SignUpInput {
        name: String
        email: String
        password: String
        type: String
    }
    
    input SignInInput {
        email: String
        password: String
    }

    type Mutation {
        signUp(input: SignUpInput!): User!
        signIn(input: SignUpInput!): User!
               verify: Boolean

    }
`;
