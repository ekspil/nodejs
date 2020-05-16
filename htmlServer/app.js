const http = require("http")
const server = new http.Server()
const handler = require("./handler")

server
    .on("request", handler)
    .listen(81)

const emit = server.emit
server.emit = (...args) => {
    console.log(args[0])
    return emit.apply(server, args)
}