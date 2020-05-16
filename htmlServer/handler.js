let i = 0
module.exports = (req, res) => {
    i++
    res.end(`Hello! Count of requests: ${i}`)
}