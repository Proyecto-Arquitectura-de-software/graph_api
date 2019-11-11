const app = require('express')();

const ApolloServer = require('apollo-server-express').ApolloServer;
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const server = new ApolloServer({
	typeDefs,
	resolvers
});

server.applyMiddleware({ app });
app.listen({ port: 3000 })
console.log("listen on port 3000");
