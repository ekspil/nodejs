const fs = require('fs')

const stream = fs.createReadStream(__filename, {
    highWaterMark: 40,
    encoding: 'utf-8'
})


stream.on('error', err => {

})

//Readable, Writable, Duplex, Transform

// paused | flowing

//stream.pipe(StreamOut)
//stream.on('data', chunk =>{})
//stream.resume()
//stream.pause()
//
// let i = 0
// stream.on('data', chunk =>{
//     i++
//     if(i > 3) {
//         //stream.removeAllListeners('data')
//         //stream.destroy("super error")
//     }
//     console.log(chunk)
// })
//
// stream.on('error', (err) => {
//     console.log('error:', err)
// })
//
// stream.on('close', () => {
//     console.log('close')
// })
//
// stream.on('end', () => {
//     console.log(i)
//     console.log('end')
// })
//
//
// stream.on('readable', () => {
//     const chank = stream.read()
// })