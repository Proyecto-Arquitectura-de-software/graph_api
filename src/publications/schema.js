module.exports.schemas= `
type Product{
    publicationID: Int!
    establishmentID: String!
    name: String
    description: String
    price : Float
    image : String
}

input ProductCreateInput{
    establishmentID: String!
    name: String!
    description: String
    price : Float
    image : String
}

input ProductUpdateInput{
    publicationID: Int!
    establishmentID: String!
    name: String!
    description: String
    price : Float
    image : String
}
`;

module.exports.queries = `
    getProducts: [Product]
`

module.exports.mutations = `
    createProduct(product: ProductCreateInput!): String
    setProduct(product: ProductUpdateInput!): String
    deleteProduct(id: Int!): String
`