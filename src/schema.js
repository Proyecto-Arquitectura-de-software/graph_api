import { gql } from 'apollo-server-express';

export default gql`
//Tipo
	type Factura {
		id: Int!,
        pedido_id: Int!,
        costo_total: Int!,
        impuesto_IVA: Int!
	}

//Datos que pide
	type inputFactura {
				pedido_id: Int!,
				costo_total: Int!,
				impuesto_IVA: Int!
	}

	type Query {
		getFacturas: [Factura]!
	}

	type Mutation {
		createFactura(factura: inputFactura!): Factura!
	}
`;
