import { generalRequest, getRequest } from '../../utilities';
import { url, port, entryPoint } from './Est_server';

const URL = `http://${url}:${port}/${entryPoint}`;
//const URL = `http://34.69.25.250:3001/establishments`;

const Est_resolvers = {
	Query: {
		getOneEstablecimiento: (_, { id_establecimiento }) =>
			generalRequest(`${URL}/${id_establecimiento}`, 'GET'),
    //revisar url
    getEstablecimientosCercanos: (_, { coordinateX, coordinateY }) =>
			generalRequest(`${URL}/?${coordinateX}&${coordinateY}`, 'GET'),
	},
	Mutation: {
		createEstablecimiento: (_, { establecimiento }) =>
			generalRequest(`${URL}`, 'POST', establecimiento),
    updateEstablecimiento: (_, { id_establecimiento, establecimiento }) =>
  		generalRequest(`${URL}/${id_establecimiento}`, 'PUT', establecimiento),
    createResena: (_, { id_establecimiento, resena }) =>
			generalRequest(`${URL}/${id_establecimiento}/messages`, 'POST', resena),
	}
};

export default Est_resolvers;
