module.exports.schemas= `

type EstablishmentReview{
    text : String!
    score : Int!
    posterId : String!
}

input EstablishmentReviewInput{
    text : String!
    score : Int!
    posterId : String!
}

input EstablishmentsFilters{
    name: String!
    value: String!
}

type Establishment{
    _id: String!
    coordinateX: Float!
    coordinateY: Float!
    name: String!
    address : String
    deliveryTime : Int
    deliveryCost : Int
    paymentMethods : [String]
    type : String
    score: Int
    categories : [String]
    messages : [EstablishmentReview]
}

input EstablishmentCreateInput{
    coordinateX: Float!
    coordinateY: Float!
    name: String!
    address : String!
    deliveryTime : Int!
    deliveryCost : Int!
    paymentMethods : [String]!
    type : String!
    categories : [String]!
}

input EstablishmentUpdateInput{
    coordinateX: Float
    coordinateY: Float
    name: String
    address : String
    deliveryTime : Int
    deliveryCost : Int
    paymentMethods : [String]
    type : String
    categories : [String]
}
`;

module.exports.queries = `
    getEstablishment(id: String!): Establishment!
    getEstablishments(coordinateX: Float, coordinateY: Float, filters: [EstablishmentsFilters]): [Establishment]!
`

module.exports.mutations = `
    createEstablishment(establishment: EstablishmentCreateInput!): Establishment!
    updateEstablishment(id: String!, establishment: EstablishmentUpdateInput!): Boolean
    addEstablishmentReview(id: String!,message: EstablishmentReviewInput!) : Boolean
`