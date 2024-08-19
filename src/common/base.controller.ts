import { Response, Router } from 'express'
import { IControllerRoute } from './route.interface'
import { ILogger } from '../logger/logger.interface'
import { injectable } from 'inversify'
import 'reflect-metadata'
import { SignJWT } from 'jose'

@injectable()
export abstract class BaseRouter {
	private readonly _router: Router

	constructor(private logger: ILogger) {
		this._router = Router()
	}

	get router(): Router {
		return this._router
	}

	public created(res: Response): Response {
		return res.sendStatus(201)
	}

	public bindRoutes(routes: IControllerRoute[]): void {
		for (const route of routes) {
			this.logger.log(`[${route.method}] ${route.path}`)
			const middleware = route.middlewares?.map((i) => i.execute.bind(i))
			const handler = route.func.bind(this)
			const pipeline = middleware ? [...middleware, handler] : handler
			this.router[route.method](route.path, pipeline)
		}
	}

	protected async signJWT(email: string, secret: string): Promise<string> {
		const sec = new TextEncoder().encode(secret)
		return new SignJWT({ email })
			.setProtectedHeader({ alg: 'HS256' })
			.setExpirationTime('2h')
			.sign(sec)
	}
}
