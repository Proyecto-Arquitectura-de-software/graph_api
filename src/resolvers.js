const resolversArray = [
    require('./billing/resolvers'),
    require('./clients/resolvers'),
    require('./establishments/resolvers'),
    require('./publications/resolvers'),
    require('./orders/resolvers'),
    require('./messaging/resolvers'),
    require('./login/resolvers')
];

const resolvers = {"Query" : {}, "Mutation" : {}};
for(let i=0;i<resolversArray.length;i++){
    for(let n in resolversArray[i].queries){
        resolvers.Query[n] = resolversArray[i].queries[n];
    }
    for(let n in resolversArray[i].mutations){
        resolvers.Mutation[n] = resolversArray[i].mutations[n];
    }
}

module.exports = resolvers;