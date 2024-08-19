import { Request, Response, NextFunction } from 'express'
import { IMiddleware } from './middleware.interface'
import { jwtVerify } from 'jose'

export class AuthMiddleware implements IMiddleware {
	constructor(private readonly secret: string) {}

	async execute(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		if (req.headers.authorization) {
			const token = req.headers.authorization.split(' ')[1]
			const secret = new TextEncoder().encode(this.secret)
			const { payload } = await jwtVerify(token, secret)
			req.user = payload.email as string
			next()
		}
		next()
	}
}
