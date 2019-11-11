const gql = require('apollo-server-express').gql;

let schemasArray = [
    require('./billing/schema'),
    require('./clients/schema'),
    require('./establishments/schema'),
    require('./publications/schema'),
    require('./orders/schema'),
    require('./messaging/schema')
];
let schemas = "";
let queries = "";
let mutations = "";

schemasArray.map((e)=>{
    schemas += `${e.schemas}\n`;
    queries += `${e.queries}\n`;
    mutations += `${e.mutations}\n`;
});



module.exports = gql`
    ${schemas}
    type Query {
        ${queries}
    }
    type Mutation {
        ${mutations}
    }
`;