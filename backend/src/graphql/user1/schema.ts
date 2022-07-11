export const uTypeDefs = `
    type U {
        id: Int
        username: String
        ageA: Int
    }

    type Query {
        getAllU: [U!],
    }
`;
