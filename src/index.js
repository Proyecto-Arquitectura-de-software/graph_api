const app = require('express')();

const ApolloServer = require('apollo-server-express').ApolloServer;
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

let a = 0;

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: async ({req})=>{
		return {token: req.token};
	}
});

server.applyMiddleware({ app });
app.listen({ port: 3000 })
console.log("listen on port 3000");
