import express from "express"
const userRouter = express.Router()


userRouter.get("/get", (req, res) => {
    res.send("get: Hello")
})

userRouter.post("/post", (req, res) => {
    res.send(`post: Hello`)
})

export {userRouter}