module.exports.schemas= `
type Message{
    id: Int!
    id_cliente: String!
    id_establecimiento: String!
    mensaje: String!
    remitente: Int
    created_at : String
    updated_at : String
}

input MessageCreateInput{
    id_cliente: String!
    id_establecimiento: String!
    mensaje: String!
    remitente: Int!
}
`;

module.exports.queries = `
    getMessages(idClient: String!, idEstablishment: String!): [Message]
`

module.exports.mutations = `
    createMessage(message: MessageCreateInput!): Message
    deleteMessage(id: Int!): Message
`