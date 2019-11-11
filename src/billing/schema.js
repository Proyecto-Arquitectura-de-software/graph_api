module.exports.schemas= `
	type Factura {
		id: Int!,
		pedido_id: Int!,
		costo_total: Int!,
		impuesto_IVA: Int!
	}

	input FacturaCreateInput {
		pedido_id: Int!,
		costo_total: Int!,
		impuesto_IVA: Int!
	}

	input FacturaUpdateInput {
		pedido_id: Int,
		costo_total: Int,
		impuesto_IVA: Int
	}

	
`;

module.exports.queries = `
	getFacturas: [Factura]!
`;

module.exports.mutations = `
	createFactura(factura: FacturaCreateInput!): Factura!
	updateFactura(id: Int, factura: FacturaUpdateInput!): Factura!
	setFactura(id: Int, factura: FacturaCreateInput!): Factura!
	deleteFactura(id: Int) : Boolean
`;