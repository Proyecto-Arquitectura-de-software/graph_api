module.exports.schemas= `
type Order{
    id: Int!
    id_cliente: String!
    id_establecimiento: String!
    estado: String
    observaciones : String
    destino : String!
    fecha_inicio: String
    fecha_fin: String
}

input OrderCreateInput{
    id_cliente: String!
    id_establecimiento: String!
    id_estado: String!
    observaciones : String
    destino : String!
    fecha_inicio: String
    fecha_fin: String
}
`;

module.exports.queries = `
    getOrders: [Order]
    getOrder(id: Int!): [Order]
`

module.exports.mutations = `
    createOrder(order: OrderCreateInput!): Boolean
    setOrder(id: Int!, order: OrderCreateInput!): Boolean
    deleteOrder(id: Int!): Boolean
`