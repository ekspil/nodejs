const stream = require('stream')
const fs = require('fs')


class LineNumberStream extends stream.Transform {
    constructor(){
        super()
        this.isLineBegins = true
        this.line = 1
        this.eol = new RegExp('(\r)?\n', 'g')
    }

    _transform(chunk, encoding, callback) {
        let str = chunk.toString()
        if(this.isLineBegins) {
            this.isLineBegins = false
            str = `${this.line++}. ${str}`

        }
        let peaces = str.split('\n')
        if(!peaces.length){
            return callback(null, Buffer.from(str))
        }
        const newStr = peaces.reduce((_newStr, peace, i) => {
            if (i === 0) {
                _newStr += peace
            }

            else {
                _newStr += `\n${this.line++}. ${peace}`
            }

            return _newStr

        }, '')


        callback(null, Buffer.from(newStr))
    }
}

const s = fs.createReadStream(__filename, {
    highWaterMark: 10
})
const o = fs.createWriteStream(`${__filename}.out`)

s
    .pipe(new LineNumberStream())
    .pipe(o)