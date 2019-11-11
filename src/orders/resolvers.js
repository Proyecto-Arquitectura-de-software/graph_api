const fetch = require("node-fetch");

module.exports.queries = {
	getOrders: async (parent)=>{
		const res = await fetch(`http://34.69.25.250:3100/pedidos`);
		return res.json();
	},
	getOrder: async (parent,{id},context)=>{
		const res = await fetch(`http://34.69.25.250:3100/pedidos/${id}`);
		return res.json();
	}
};


//TODO: Implement mutations
module.exports.mutations = {
	createOrder: async (parent,{order})=>{
		const res = await fetch("http://34.69.25.250:3100/pedidos",
			{
				headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
				},
				method: "POST",
				body: JSON.stringify(order)
			}
		);
		return true;
	},
	setOrder: async (parent,{id,order})=>{
		const res = await fetch(`http://34.69.25.250:3100/pedidos/${id}`,
			{
				headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
				},
				method: "POST",
				body: JSON.stringify(order)
			}
		);
		return true;
	},
	deleteOrder: async (parent,{id})=>{
		const res = await fetch(`http://34.69.25.250:3100/pedidos/${id}`,
			{
				headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
				},
				method: "DELETE"
			}
		);
		return true;
	}
};