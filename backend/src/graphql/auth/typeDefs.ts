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
       activate(id: String!): Status
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
        signOut: Status
        refresh: String!
    }
`;
