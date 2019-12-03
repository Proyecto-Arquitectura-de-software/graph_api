const fetch = require("node-fetch");

module.exports.queries = {
	getFacturas: async (parent,args)=>{
		const res = await fetch('http://35.239.125.16:8001/service/factura/factura/');
		return res.json();
	}
};

module.exports.mutations = {
	createFactura: async (parent,{factura})=>{
		const res = await fetch("http://35.239.125.16:8001/service/factura/factura/",
			{
				headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
				},
				method: "POST",
				body: JSON.stringify(factura)
			}
		);
		return res.json();
	},
	updateFactura: async (parent,{id,factura})=>{
		const res = await fetch(`http://35.239.125.16:8001/service/factura/factura/${id}/`,
			{
				headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
				},
				method: "PATCH",
				body: JSON.stringify(factura)
			}
		);
		return res.json();
	},
	setFactura: async (parent,{id,factura})=>{
		const res = await fetch(`http://35.239.125.16:8001/service/factura/factura/${id}/`,
			{
				headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
				},
				method: "PUT",
				body: JSON.stringify(factura)
			}
		);
		return res.json();
	},
	deleteFactura: async (parent,{id})=>{
		await fetch(`http://35.239.125.16:8001/service/factura/factura/${id}/`,
			{
				headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
				},
				method: "DELETE",
			}
		);
		return true;
	}
};