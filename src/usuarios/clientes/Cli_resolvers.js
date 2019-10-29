import { generalRequest, getRequest } from '../../utilities';
import { url, port, entryPoint } from './Cli_server';

const URL = `http://${url}:${port}/${entryPoint}`;
//const URL = `http://34.69.25.250:3001/clients`;

const Cli_resolvers = {
	Query: {
		getOneCliente: (_, { id_cliente }) =>
			generalRequest(`${URL}/${id_cliente}`, 'GET'),
	},
	Mutation: {
		createCliente: (_, { cliente }) =>
			generalRequest(`${URL}`, 'POST', cliente),
    updateCliente: (_, { id_cliente, cliente }) =>
  		generalRequest(`${URL}/${id_cliente}`, 'PUT', cliente),
	}
};

export default Cli_resolvers;
