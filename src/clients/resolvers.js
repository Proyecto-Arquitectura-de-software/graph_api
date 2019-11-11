const fetch = require("node-fetch");

module.exports.queries = {
	getClient: async (parent,{id})=>{
		const res = await fetch(`http://34.69.25.250:3001/clients/${id}`);
		return res.json();
	}
};

module.exports.mutations = {
	createClient: async (parent,{client})=>{
		const res = await fetch("http://34.69.25.250:3001/clients/",
			{
				headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
				},
				method: "POST",
				body: JSON.stringify(client)
			}
		);
		return res.json();
	},
	updateClient: async (parent,{id, client})=>{
		const res = await fetch(`http://34.69.25.250:3001/clients/${id}`,
			{
				headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
				},
				method: "PUT",
				body: JSON.stringify(client)
			}
		);
		return true;
	}
};