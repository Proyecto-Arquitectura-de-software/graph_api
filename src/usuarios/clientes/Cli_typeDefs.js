export const clienteTypeDef = `
type Cliente {
    _id: Int!
    name: String!
    lastname: String!
    email: String!
}
input ClienteInput {
    name: String!
    lastname: String!
    email: String!
}`;

export const clienteQueries = `
    getOneCliente: (id_cliente: Int!): [Cliente]!
`;

export const clienteMutations = `
    createCliente(cliente: ClienteInput!): Cliente!
    updateCliente(id_cliente: Int!, cliente: ClienteInput!): Cliente!
`;
