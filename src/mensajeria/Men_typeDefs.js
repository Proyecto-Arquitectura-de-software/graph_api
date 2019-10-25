export const mensajeTypeDef = `
type Mensaje {
    id: Int!
    id_cliente: Int!
    id_establecimiento: Int!
    mensaje: String!
    created_at: String!
    updated_at: String!
}
input mensajeInput {
    id_cliente: Int!
    id_establecimiento: Int!
    mensaje: String!
}`;

export const mensajeQueries = `
    getAllMensajes: [Mensaje]!
`;

export const mensajeMutations = `
    createMensaje(msg: mensajeInput!): Mensaje!
    deleteMensaje(id: Int!): Int
`;
