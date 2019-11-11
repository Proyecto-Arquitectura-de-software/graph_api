const fetch = require("node-fetch");

module.exports.queries = {
	getMessages: async (parent,{idClient,idEstablishment})=>{
		const res = await fetch(`http://34.69.25.250:3200/conversacion/${idClient}/${idEstablishment}`);
		return res.json();
	}
};

module.exports.mutations = {
	createMessage: async (parent,{message})=>{
		const res = await fetch("http://34.69.25.250:3200/mensaje/",
			{
				headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
				},
				method: "POST",
				body: JSON.stringify(message)
			}
		);
		return res.json();
	},
	deleteMessage: async (parent,{id})=>{
		const res = await fetch(`http://34.69.25.250:3200/mensaje/${id}`,
			{
				headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
				},
				method: "DELETE"
			}
		);
		return res.json();
	}
};