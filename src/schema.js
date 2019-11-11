const gql = require('apollo-server-express').gql;
const billingSchema = require('./billing/schema');
const clientsSchema = require('./clients/schema');
const establishmentsSchema = require('./establishments/schema');

module.exports = gql`
    ${billingSchema.schemas}
    ${clientsSchema.schemas}
    ${establishmentsSchema.schemas}
    type Query {
        ${billingSchema.queries}
        ${clientsSchema.queries}
        ${establishmentsSchema.queries}
    }
    type Mutation {
        ${billingSchema.mutations}
        ${clientsSchema.mutations}
        ${establishmentsSchema.mutations}
    }
`;