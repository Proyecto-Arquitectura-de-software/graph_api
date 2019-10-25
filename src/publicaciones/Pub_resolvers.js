import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './Pub_server';

const URL = `http://${url}:${port}/${entryPoint}`;
//const URL = `http://34.69.25.250:3000/products`;

const Pub_resolvers = {
	Query: {
		getAllPublicaciones: (_) =>
			generalRequest(URL, ''),
    getOnePublicacion: (_, { publicationID }) =>
			generalRequest(`${URL}/${publicationID}`, ''),
	},
	Mutation: {
		createPublicacion: (_, { publicacion }) =>
			generalRequest(`${URL}`, 'POST', publicacion),
    updatePublicacion: (_) =>
  		generalRequest(URL, 'PUT'),
    deletePublicacion: (_, { publicationID }) =>
			generalRequest(`${URL}/${publicationID}`, 'DELETE')
	}
};

export default Pub_resolvers;
