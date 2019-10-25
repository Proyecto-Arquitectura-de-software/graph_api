import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './Fac_server';

const URL = `http://${url}:${port}/${entryPoint}`;
//const URL = `http://34.69.25.250:8000/service/factura/factura/`;

const Fac_resolvers = {
	Query: {
		getAllFacturas: (_) =>
			generalRequest(URL, ''),
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

export default Fac_resolvers;
