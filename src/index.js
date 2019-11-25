const app = require('express')();

const verifyToken = require('./security/token').verifyToken;
const ApolloServer = require('apollo-server-express').ApolloServer;
const cors = require('cors');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

app.use(cors());

app.use(verifyToken);

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: async ({req})=>{
		return {token: req.token};
	}
});

server.applyMiddleware({ app });
app.listen({ port: 3002 })
console.log("listen on port 3002");
