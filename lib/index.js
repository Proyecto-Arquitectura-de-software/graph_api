'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Koa = _interopDefault(require('koa'));
var KoaRouter = _interopDefault(require('koa-router'));
var koaLogger = _interopDefault(require('koa-logger'));
var koaBody = _interopDefault(require('koa-bodyparser'));
var koaCors = _interopDefault(require('@koa/cors'));
var apolloServerKoa = require('apollo-server-koa');
var merge = _interopDefault(require('lodash.merge'));
var GraphQLJSON = _interopDefault(require('graphql-type-json'));
var graphqlTools = require('graphql-tools');
var request = _interopDefault(require('request-promise-native'));
var graphql = require('graphql');

/**
 * Creates a request following the given parameters
 * @param {string} url
 * @param {string} method
 * @param {object} [body]
 * @param {boolean} [fullResponse]
 * @return {Promise.<*>} - promise with the error or the response object
 */
async function generalRequest(url, method, body, fullResponse) {
	const parameters = {
		method,
		uri: encodeURI(url),
		body,
		json: true,
		resolveWithFullResponse: fullResponse
	};
	if (process.env.SHOW_URLS) {
		// eslint-disable-next-line
		console.log(url);
	}

	try {
		return await request(parameters);
	} catch (err) {
		return err;
	}
}

/**
 * Adds parameters to a given route
 * @param {string} url
 * @param {object} parameters
 * @return {string} - url with the added parameters
 */
function addParams(url, parameters) {
	let queryUrl = `${url}?`;
	for (let param in parameters) {
		// check object properties
		if (
			Object.prototype.hasOwnProperty.call(parameters, param) &&
			parameters[param]
		) {
			if (Array.isArray(parameters[param])) {
				queryUrl += `${param}=${parameters[param].join(`&${param}=`)}&`;
			} else {
				queryUrl += `${param}=${parameters[param]}&`;
			}
		}
	}
	return queryUrl;
}

/**
 * Generates a GET request with a list of query params
 * @param {string} url
 * @param {string} path
 * @param {object} parameters - key values to add to the url path
 * @return {Promise.<*>}
 */
function getRequest(url, path, parameters) {
	const queryUrl = addParams(`${url}/${path}`, parameters);
	return generalRequest(queryUrl, 'GET');
}

/**
 * Merge the schemas in order to avoid conflicts
 * @param {Array<string>} typeDefs
 * @param {Array<string>} queries
 * @param {Array<string>} mutations
 * @return {string}
 */
function mergeSchemas(typeDefs, queries, mutations) {
	return `${typeDefs.join('\n')}
    type Query { ${queries.join('\n')} }
    type Mutation { ${mutations.join('\n')} }`;
}

function formatErr(error) {
	const data = graphql.formatError(error);
	const { originalError } = error;
	if (originalError && originalError.error) {
		const { path } = data;
		const { error: { id: message, code, description } } = originalError;
		return { message, code, description, path };
	}
	return data;
}

const facturaTypeDef = `
type Factura {
    id: Int!
    pedido_id: Int!
    costo_total: Int!
    impuesto_IVA: Int!
}
input FacturaInput {
    pedido_id: Int!
    costo_total: Int!
    impuesto_IVA: Int!
}`;

const facturaQueries = `
    getAllFacturas: [Factura]!
`;

const facturaMutations = `
    createFactura(factura: FacturaInput!): Factura!
    updateFactura(id_factura: Int!, factura: FacturaInput!): Factura!
    deleteFactura(id_factura: Int!): Int
`;

const mensajeTypeDef = `
type Mensaje {
    id: Int!
    id_cliente: Int!
    id_establecimiento: Int!
    mensaje: String!
    created_at: String!
    updated_at: String!
}
input mensajeInput {
    id_cliente: Int!
    id_establecimiento: Int!
    mensaje: String!
}`;

const mensajeQueries = `
    getAllMensajes: [Mensaje]!
`;

const mensajeMutations = `
    createMensaje(msg: mensajeInput!): Mensaje!
    deleteMensaje(id: Int!): Int
`;

const pedidoTypeDef = `
type Pedido {
    id: Int!
    id_cliente: Int!
    id_establecimiento: Int!
    id_estado: Int!
    observaciones: String!
    destino: String!
}
input PedidoInput {
    id_cliente: Int!
    id_establecimiento: Int!
    id_estado: Int!
    observaciones: String!
    destino: String!
}`;

const pedidoQueries = `
    getAllPedidos: [Pedido]!
    getOnePedido(id: Int!): [Pedido]!
`;

const pedidoMutations = `
    createPedido(pedido: PedidoInput!): Pedido!
    updatePedido(id_pedido: Int!, pedido: PedidoInput!): Pedido!
    deletePedido(id_pedido: Int!): Int
`;

const publicacionTypeDef = `
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

const publicacionQueries = `
    getAllPublicaciones: [Publicacion]!
    getOnePublicacion(publicationID: Int!): [Publicacion]!
`;

const publicacionMutations = `
    createPublicacion(publicacion: PublicacionInput!): Publicacion!
    updatePublicacion(publicacion: PublicacionInput!): Publicacion!
    deletePublicacion(publicationID: Int!): Int
`;

const clienteTypeDef = `
type Cliente {
    _id: Int!
    name: String!
    lastname: String!
    email: String!
}
input ClienteInput {
    name: String!
    lastname: String!
    email: String!
}`;

const clienteQueries = `
    getOneCliente: (id_cliente: Int!): [Cliente]!
`;

const clienteMutations = `
    createCliente(cliente: ClienteInput!): Cliente!
    updateCliente(id_cliente: Int!, cliente: ClienteInput!): Cliente!
`;

const establecimientoTypeDef = `
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

const establecimientoQueries = `
    getOneEstablecimiento: (id_establecimiento: Int!): [Establecimiento]!
    getEstablecimientosCercanos: (coordinateX: String!, coordinateY: String!): [Establecimiento]!
`;

const establecimientoMutations = `
    createEstablecimiento(establecimiento: EstablecimientoInput!): Establecimiento!
    updateEstablecimiento(id_establecimiento: Int!, establecimiento: EstablecimientoInput!): Establecimiento!
    createResena(resena: ResenaInput!): Resena!
`;

const url = process.env.FACTURACION_URL;
const port = process.env.FACTURACION_PORT;
const entryPoint = process.env.FACTURACION_ENTRY;

const URL = `http://${url}:${port}/${entryPoint}`;
//const URL = `http://34.69.25.250:8000/service/factura/factura/`;

const Fac_resolvers = {
	Query: {
		getAllFacturas: (_) =>
			getRequest(URL, ''),
	},
	Mutation: {
		createFactura: (_, { factura }) =>
			generalRequest(`${URL}`, 'POST', factura),
    updateFactura: (_, { id_factura, factura }) =>
  		generalRequest(`${URL}/${id_factura}`, 'PUT', factura),
		deleteFactura: (_, { id_factura }) =>
			generalRequest(`${URL}/${id_factura}`, 'DELETE')
	}
};

const url$1 = process.env.MENSAJERIA_URL;
const port$1 = process.env.MENSAJERIA_PORT;

const URL$1 = `http://${url$1}:${port$1}/`;
//const URL = `http://34.69.25.250:3200/`;

const Men_resolvers = {
	Query: {
		getAllMensajes: (_, { id_cliente, id_establecimiento }) =>
			getRequest(`${URL$1}/conversacion/${id_cliente}/${id_establecimiento}`, ''),
	},
	Mutation: {
		createMensaje: (_, { msg }) =>
			generalRequest(`${URL$1}/mensaje`, 'POST', msg),
		deleteMensaje: (_, { id }) =>
			generalRequest(`${URL$1}/mensaje/${id}`, 'DELETE')
	}
};

const url$2 = process.env.PEDIDOS_URL;
const port$2 = process.env.PEDIDOS_PORT;
const entryPoint$2 = process.env.PEDIDOS_ENTRY;

const URL$2 = `http://${url$2}:${port$2}/${entryPoint$2}`;
//const URL = `http://34.69.25.250:3100/pedidos`;

const Ped_resolvers = {
	Query: {
		getAllPedidos: (_) =>
			getRequest(URL$2, ''),
    getOnePedido: (_, { id_pedido }) =>
			generalRequest(`${URL$2}/${id_pedido}`, 'GET'),
	},
	Mutation: {
		createPedido: (_, { pedido }) =>
			generalRequest(`${URL$2}`, 'POST', pedido),
    updatePedido: (_, { id_pedido, pedido }) =>
  		generalRequest(`${URL$2}/${id_pedido}`, 'PUT', pedido),
		deletePedido: (_, { id_pedido }) =>
			generalRequest(`${URL$2}/${id_pedido}`, 'DELETE')
	}
};

const url$3 = process.env.PUBLICACIONES_URL;
const port$3 = process.env.PUBLICACIONES_PORT;
const entryPoint$3 = process.env.PUBLICACIONES_ENTRY;

const URL$3 = `http://${url$3}:${port$3}/${entryPoint$3}`;
//const URL = `http://34.69.25.250:3000/products`;

const Pub_resolvers = {
	Query: {
		getAllPublicaciones: (_) =>
			getRequest(URL$3, ''),
    getOnePublicacion: (_, { publicationID }) =>
			generalRequest(`${URL$3}/${publicationID}`, 'GET'),
	},
	Mutation: {
		createPublicacion: (_, { publicacion }) =>
			generalRequest(`${URL$3}`, 'POST', publicacion),
    updatePublicacion: (_) =>
  		generalRequest(URL$3, 'PUT'),
    deletePublicacion: (_, { publicationID }) =>
			generalRequest(`${URL$3}/${publicationID}`, 'DELETE')
	}
};

const url$4 = process.env.CLIENTES_URL;
const port$4 = process.env.CLIENTES_PORT;
const entryPoint$4 = process.env.CLIENTES_ENTRY;

const URL$4 = `http://${url$4}:${port$4}/${entryPoint$4}`;
//const URL = `http://34.69.25.250:3001/clients`;

const Cli_resolvers = {
	Query: {
		getOneCliente: (_, { id_cliente }) =>
			generalRequest(`${URL$4}/${id_cliente}`, 'GET'),
	},
	Mutation: {
		createCliente: (_, { cliente }) =>
			generalRequest(`${URL$4}`, 'POST', cliente),
    updateCliente: (_, { id_cliente, cliente }) =>
  		generalRequest(`${URL$4}/${id_cliente}`, 'PUT', cliente),
	}
};

const url$5 = process.env.ESTABLECIMIENTOS_URL;
const port$5 = process.env.ESTABLECIMIENTOS_PORT;
const entryPoint$5 = process.env.ESTABLECIMIENTOS_ENTRY;

const URL$5 = `http://${url$5}:${port$5}/${entryPoint$5}`;
//const URL = `http://34.69.25.250:3001/establishments`;

const Est_resolvers = {
	Query: {
		getOneEstablecimiento: (_, { id_establecimiento }) =>
			generalRequest(`${URL$5}/${id_establecimiento}`, 'GET'),
    //revisar url
    getEstablecimientosCercanos: (_, { coordinateX, coordinateY }) =>
			generalRequest(`${URL$5}/?${coordinateX}&${coordinateY}`, 'GET'),
	},
	Mutation: {
		createEstablecimiento: (_, { establecimiento }) =>
			generalRequest(`${URL$5}`, 'POST', establecimiento),
    updateEstablecimiento: (_, { id_establecimiento, establecimiento }) =>
  		generalRequest(`${URL$5}/${id_establecimiento}`, 'PUT', establecimiento),
    createResena: (_, { id_establecimiento, resena }) =>
			generalRequest(`${URL$5}/${id_establecimiento}/messages`, 'POST', resena),
	}
};

//facturacion
//mensajeria
//pedidos
// Publicaciones
//usuarios
// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',

		facturaTypeDef,
		mensajeTypeDef,
		pedidoTypeDef,
		publicacionTypeDef,
		clienteTypeDef,
		establecimientoTypeDef
	],
	[
    facturaQueries,
		mensajeQueries,
		pedidoQueries,
		publicacionQueries,
		clienteQueries,
		establecimientoQueries
	],
	[
    facturaMutations,
		mensajeMutations,
		pedidoMutations,
		publicacionMutations,
		clienteMutations,
		establecimientoMutations
	]
);

// Generate the schema object from your types definition.
var graphQLSchema = graphqlTools.makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
    Fac_resolvers,
		Men_resolvers,
		Ped_resolvers,
		Pub_resolvers,
		Cli_resolvers,
		Est_resolvers

	)
});

const app = new Koa();
const router = new KoaRouter();
const PORT = process.env.PORT || 5000;

app.use(koaLogger());
app.use(koaCors());

// read token from header
app.use(async (ctx, next) => {
	if (ctx.header.authorization) {
		const token = ctx.header.authorization.match(/Bearer ([A-Za-z0-9]+)/);
		if (token && token[1]) {
			ctx.state.token = token[1];
		}
	}
	await next();
});

// GraphQL
const graphql$1 = apolloServerKoa.graphqlKoa((ctx) => ({
	schema: graphQLSchema,
	context: { token: ctx.state.token },
	formatError: formatErr
}));
router.post('/graphql', koaBody(), graphql$1);
router.get('/graphql', graphql$1);

// test route
router.get('/graphiql', apolloServerKoa.graphiqlKoa({ endpointURL: '/graphql' }));

app.use(router.routes());
app.use(router.allowedMethods());
// eslint-disable-next-line
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
