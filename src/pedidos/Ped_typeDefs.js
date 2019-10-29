export const pedidoTypeDef = `
type Pedido {
    id: Int!
    id_cliente: Int!
    id_establecimiento: Int!
    id_estado: Int!
    observaciones: String!
    destino: String!
}
input PedidoInput {
    id_cliente: Int!
    id_establecimiento: Int!
    id_estado: Int!
    observaciones: String!
    destino: String!
}`;

export const pedidoQueries = `
    getAllPedidos: [Pedido]!
    getOnePedido(id: Int!): [Pedido]!
`;

export const pedidoMutations = `
    createPedido(pedido: PedidoInput!): Pedido!
    updatePedido(id_pedido: Int!, pedido: PedidoInput!): Pedido!
    deletePedido(id_pedido: Int!): Int
`;
