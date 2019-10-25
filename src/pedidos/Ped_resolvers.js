import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './Ped_server';

const URL = `http://${url}:${port}/${entryPoint}`;
//const URL = `http://34.69.25.250:3100/pedidos`;

const Ped_resolvers = {
	Query: {
		getAllPedidos: (_) =>
			generalRequest(URL, ''),
    getOnePedido: (_, { id }) =>
			generalRequest(`${URL}/${id}`, ''),
	},
	Mutation: {
		createPedido: (_, { pedido }) =>
			generalRequest(`${URL}`, 'POST', pedido),
    updatePedido: (_, { id, pedido }) =>
  		generalRequest(`${URL}/${id}`, 'PUT', pedido),
		deletePedido: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'DELETE')
	}
};

export default Ped_resolvers;
