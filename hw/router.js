
const url = require('url')
const stream = require('stream')
const fs = require('fs')
const errorHandler = require('./modules/errorHandler')

module.exports = (req, res) => {
    const path = decodeURI(url.parse(req.url).pathname)
    console.log(url.parse(req.url))
    switch(req.method){
        case 'GET':
            res.end(`Hello`)
            break
        case 'POST':
            const writeStream = fs.createWriteStream(`./public${path}`)
            req.pipe(writeStream)
                .on('finish', () => {
                    res.end('finish')
                })
                .on('end', () => {
                    res.end('end')
                })


            break
        case 'DELETE':
            res.end(`Hello`)
            break
        default:
            res.statusCode(404)
            res.end()
    }


}