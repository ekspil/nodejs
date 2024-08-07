import { Response, Router } from "express"
import { IControllerRoute } from "./route.interface"
import { ILogger } from "../logger/logger.interface"
import { injectable } from "inversify"
import "reflect-metadata"

@injectable()
export abstract class BaseRouter {
	private readonly _router: Router

	constructor(private logger: ILogger) {
		this._router = Router()
	}

	get router(): Router {
		return this._router
	}

	public created(res: Response):Response {
		return res.sendStatus(201)
	}

	public bindRoutes(routes: IControllerRoute[]):void {
		for (const route of routes) {
			this.logger.log(`[${route.method}] ${route.path}`)
			const handler = route.func.bind(this)
			this.router[route.method](route.path, handler)
		}
	}
}
