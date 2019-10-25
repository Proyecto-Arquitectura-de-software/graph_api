export const publicacionTypeDef = `
type Publicacion {
    publicationID: Int!
    establishmentID: Int!
    name: String!
    price: Float!
    image: String!
}
input PublicacionInput {
    publicationID: Int!
    establishmentID: Int!
    name: String!
    price: Float!
    image: String!
}`;

export const publicacionQueries = `
    getAllPublicaciones: [Publicacion]!
    getOnePublicacion(publicationID: Int!): [Publicacion]!
`;

export const publicacionMutations = `
    createPublicacion(publicacion: PublicacionInput!): Publicacion!
    updatePublicacion(publicacion: PublicacionInput!): Publicacion!
    deletePublicacion(publicationID: Int!): Int
`;
