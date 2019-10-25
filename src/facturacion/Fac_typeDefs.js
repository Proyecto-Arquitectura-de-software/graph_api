export const facturaTypeDef = `
type Factura {
    id: Int!
    pedido_id: Int!
    costo_total: Int!
    impuesto_IVA: Int!

}
input FacturaInput {
    pedido_id: Int!
    costo_total: Int!
    impuesto_IVA: Int!
}`;

export const facturaQueries = `
    getAllFacturas: [Factura]!
`;

//revisar eliminacion
export const facturaMutations = `
    createFactura(factura: FacturaInput!): Factura!
    updateFactura(id_factura: Int!, factura: FacturaInput!): Factura!
    deleteFactura(id_factura: Int!): Factura!
`;
