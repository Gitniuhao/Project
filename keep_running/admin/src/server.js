const http = require('http');

const server = http.createServer((req,res)=>{
	res.setHeader('Access-Control-Allow-Origin','*')
	res.end(JSON.stringify(['飞扬弟弟','澳弟弟','虎弟弟']))
})

server.listen(3000,'127.0.0.1',()=>{
	console.log('server is running in http:127.0.0.1:3000!')
})