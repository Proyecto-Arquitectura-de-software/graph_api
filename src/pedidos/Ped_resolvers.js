import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './Ped_server';

const URL = `http://${url}:${port}/${entryPoint}`;
//const URL = `http://34.69.25.250:3100/pedidos`;

const Ped_resolvers = {
	Query: {
		getAllPedidos: (_) =>
			getRequest(URL, ''),
    getOnePedido: (_, { id_pedido }) =>
			generalRequest(`${URL}/${id_pedido}`, 'GET'),
	},
	Mutation: {
		createPedido: (_, { pedido }) =>
			generalRequest(`${URL}`, 'POST', pedido),
    updatePedido: (_, { id_pedido, pedido }) =>
  		generalRequest(`${URL}/${id_pedido}`, 'PUT', pedido),
		deletePedido: (_, { id_pedido }) =>
			generalRequest(`${URL}/${id_pedido}`, 'DELETE')
	}
};

export default Ped_resolvers;
