import merge from 'lodash.merge';
import GraphQLJSON from 'graphql-type-json';
import { makeExecutableSchema } from 'graphql-tools';

import { mergeSchemas } from './utilities';

//facturacion
import {
	facturaMutations,
	facturaQueries,
	facturaTypeDef
} from './facturacion/Fac_typeDefs';

//mensajeria
import {
	mensajeMutations,
	mensajeQueries,
	mensajeTypeDef
} from './mensajeria/Men_typeDefs';

//pedidos
import {
	pedidoMutations,
	pedidoQueries,
	pedidoTypeDef
} from './pedidos/Ped_typeDefs';

// Publicaciones
import {
	publicacionMutations,
	publicacionQueries,
	publicacionTypeDef
} from './publicaciones/Pub_typeDefs';

//usuarios
import {
	clienteMutations,
	clienteQueries,
	clienteTypeDef
} from './usuarios/clientes/Cli_typeDefs';

import {
	establecimientoMutations,
	establecimientoQueries,
	establecimientoTypeDef
} from './usuarios/establecimientos/Est_typeDefs';

import facturaResolvers from './facturacion/Fac_resolvers';
import mensajeResolvers from './mensajeria/Men_resolvers';
import pedidoResolvers from './pedidos/Ped_resolvers';
import publicacionResolvers from './publicaciones/Pub_resolvers';
import clienteResolvers from './usuarios/clientes/Cli_resolvers';
import establecimientoResolvers from './usuarios/establecimientos/Est_resolvers';

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
export default makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
    facturaResolvers,
		mensajeResolvers,
		pedidoResolvers,
		publicacionResolvers,
		clienteResolvers,
		establecimientoResolvers

	)
});
