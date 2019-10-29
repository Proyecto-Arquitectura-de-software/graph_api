export const establecimientoTypeDef = `
type Establecimiento {
    _id: Int!
    coordinateX: String!
    coordinateY: String!
    name: String!
    address: String!
    deliveryTime: Int!
    deliveryCost: Double!
    paymentMethods: String!
    type: String!
    categories: String!
    messages: String!
    score: Float!
    nMessages: Int!
}
type Resena {
    text: String!
    score: Float!
    posterId: String!
}
input EstablecimientoInput {
    coordinateX: String!
    coordinateY: String!
    name: String!
    address: String!
    deliveryTime: Int!
    deliveryCost: Double!
    paymentMethods: String!
    type: String!
    categories: String!
}
input ResenaInput {
    text: String!
    score: Float!
    posterId: String!
}`;

export const establecimientoQueries = `
    getOneEstablecimiento: (id_establecimiento: Int!): [Establecimiento]!
    getEstablecimientosCercanos: (coordinateX: String!, coordinateY: String!): [Establecimiento]!
`;

export const establecimientoMutations = `
    createEstablecimiento(establecimiento: EstablecimientoInput!): Establecimiento!
    updateEstablecimiento(id_establecimiento: Int!, establecimiento: EstablecimientoInput!): Establecimiento!
    createResena(resena: ResenaInput!): Resena!
`;
