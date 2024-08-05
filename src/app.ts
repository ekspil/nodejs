import express, {Express} from "express"
import {Server} from "http"
import { userRouter } from "./user/router"

export class App{
    app: Express
    port: number
    server: Server


    constructor(port?: number) {
        this.app = express()
        this.port = port ?? 8000
    }


    useRoutes(){
        this.app.use("/users", userRouter)
    }




    public async init(){
        this.useRoutes()
        this.server = this.app.listen(this.port)
        console.log(`Сервер запущен на http://localhost:${this.port}`)

    }
}