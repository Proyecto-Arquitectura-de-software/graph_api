module.exports.schemas= `
    input LoginCredentials{
        username: String!
        password: String!
    }
`

module.exports.queries = `
    login(credentials: LoginCredentials!): String!
    loginEstablishment(credentials: LoginCredentials!): String!
`

module.exports.mutations = ``