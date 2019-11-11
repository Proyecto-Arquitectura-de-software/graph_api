module.exports.schemas= `
type Client{
    _id: String!
    name: String!
    lastname: String!
    email: String!
}

input ClientCreateInput{
    name: String!
    lastname: String!
    email: String!
}

input ClientUpdateInput{
    name: String
    lastname: String
    email: String
}
`;

module.exports.queries = `
	getClient(id: String!): Client!
`

module.exports.mutations = `
    createClient(client: ClientCreateInput!): Client!
    updateClient(id: String!, client: ClientUpdateInput!): Boolean
`