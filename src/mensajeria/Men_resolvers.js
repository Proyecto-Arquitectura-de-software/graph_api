import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './Men_server';

const URL = `http://${url}:${port}/`;
//const URL = `http://34.69.25.250:3200/`;

const Men_resolvers = {
	Query: {
		getAllMensajes: (_, { id_cliente, id_establecimiento }) =>
			generalRequest(`${URL}/conversacion/${id_cliente}/${id_establecimiento}`, ''),
	},
	Mutation: {
		createMensaje: (_, { msg }) =>
			generalRequest(`${URL}/mensaje`, 'POST', msg),
		deleteMensaje: (_, { id }) =>
			generalRequest(`${URL}/mensaje/${id}`, 'DELETE')
	}
};

export default Men_resolvers;
