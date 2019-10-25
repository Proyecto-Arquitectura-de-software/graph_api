import express from 'express';

const app = express();


import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import typeDefs from './schema';
import resolvers from './resolvers';

//routes



const schema = makeExecutableSchema({
	typeDefs,
	resolvers
})

app.use('/graphql',	express.json(), graphqlExpress({
 	schema
}))


app.listen(3000,()=>{console.log("listen on port 3000")})
