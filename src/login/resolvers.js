const http = require('http');
const fetch = require("node-fetch");
const jwt = require('jsonwebtoken');

const privateKey = "secretKey";

module.exports.queries = {
    login: async(parent,{credentials})=>{
        let verified = await verifyCredentials(credentials);
        if(verified=="false"){
            return "Wrong credentials";
        }else{
            const res = await fetch(`http://34.69.25.250:3001/clients?email=${credentials.username}`);
            let r = await res.json();
            let token = jwt.sign({ id: r._id, exp: Math.floor(Date.now() / 1000) + (60 * 60) }, privateKey);
            return token;
        }
	}
}

module.exports.mutations = {}

let verifyCredentials = (credentials) => {
    return new Promise((resolve,reject)=>{
        let options = {
            hostname: '34.69.44.104',
            port: 3001,
            path: '/students-ms/resources/auth/',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            }
        }
        let response = "";
        const req = http.request(options, (res) => {
            res.on('data', (chunk) => {
                response += chunk;
            });
            res.on('end', () => {
                resolve(response);
            });
        })
    
        req.on('error', (e) => {
            console.error(`problem with request: ${e.message}`);
        })
          
        req.write(JSON.stringify(credentials));
        req.end();
    });
};