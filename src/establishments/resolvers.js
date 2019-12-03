const fetch = require("node-fetch");

module.exports.queries = {
	getEstablishment: async (parent,{id})=>{
		const res = await fetch(`http://34.68.155.93:8004/establishments/${id}`);
		return res.json();
	},
	getEstablishments: async (parent,{coordinateX,coordinateY,filters})=>{
		let req = `?coordinateX=${coordinateX}&coordinateY=${coordinateY}&`;
		if(filters){
			for(let e of filters){
				req += `${e.name}=${e.value}&`;
			}
		}
		const res = await fetch(`http://34.68.155.93:8004/establishments${req.substring(0,req.length-1)}`);
		return res.json();
	}
};

module.exports.mutations = {
	createEstablishment: async (parent,{establishment})=>{
		const res = await fetch("http://34.68.155.93:8004/establishments/",
			{
				headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
				},
				method: "POST",
				body: JSON.stringify(establishment)
			}
		);
		return res.json();
	},
	updateEstablishment: async (parent,{id, establishment})=>{
		const res = await fetch(`http://34.68.155.93:8004/establishments/${id}`,
			{
				headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
				},
				method: "PUT",
				body: JSON.stringify(establishment)
			}
		);
		return true;
	},
	addEstablishmentReview: async (parent,{id, message})=>{
		const res = await fetch(`http://34.68.155.93:8004/establishments/${id}/messages`,
			{
				headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
				},
				method: "POST",
				body: JSON.stringify(message)
			}
		);
		return true;
	}
};