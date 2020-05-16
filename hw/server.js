const http = require('http')
const router = require('./router')

const server = new http.Server()

server.listen(3000)

server.on('request', router)

