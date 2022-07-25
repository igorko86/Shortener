export const authTypeDefs = `
    type User {
        id: String
        name: String
        email: String
        type: String
        token: String
    }
    
    type Status {
        status: Int
        message: String
    }
    
    type SignIn {
        token: String
    }

    type Query {
       sayHello: String
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
        signUp(input: SignUpInput!): Status!
        signIn(input: SignInInput!): SignIn!
        activate(id: String!): Status
        signOut: Status
        refresh: String!
        forgotPassword(email: String!): Status
        resetPassword(password: String!, id: String!): Status
    }
`;
