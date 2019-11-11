const fetch = require("node-fetch");

module.exports.queries = {
	getProducts: async (parent)=>{
		const res = await fetch(`http://34.69.25.250:3000/products`);
		return res.json();
	}
};

module.exports.mutations = {
	createProduct: async (parent,{product})=>{
		const res = await fetch("http://34.69.25.250:3000/products/",
			{
				headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
				},
				method: "POST",
				body: JSON.stringify(product)
			}
		);
		return res.text();
	},
	setProduct: async (parent,{product})=>{
		const res = await fetch(`http://34.69.25.250:3000/products`,
			{
				headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
				},
				method: "PUT",
				body: JSON.stringify(product)
			}
		);
		return res.text();
	},
	deleteProduct: async (parent,{id})=>{
		const res = await fetch(`http://34.69.25.250:3000/products/${id}`,
			{
				headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
				},
				method: "DELETE"
			}
		);
		return res.text();
	}
};