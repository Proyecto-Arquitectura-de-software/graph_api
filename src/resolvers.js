

export default {
	Query:{
		getFacturas: async (parent,args)=>{
			const rest = await fetch('http://34.69.25.250:8000/service/factura/factura/')
			console.log(rest)
			return
		}
	},
	Mutation: {
		createFactura: (_,{factura})=>{
      const rest = await fetch('http://34.69.25.250:8000/service/factura/factura/', method:'POST')
		}
	}
}
