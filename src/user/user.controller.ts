import { TYPES } from '../types'
import { NextFunction, Request, Response } from 'express'
import { BaseRouter } from '../common/base.controller'
import { HTTPError } from '../errors/httpError.class'
import { inject, injectable } from 'inversify'

import { ILogger } from '../logger/logger.interface'

import { IUser } from './user.interface'
import { UserLoginDTO } from './dto/userLogin.dto'
import { UserRegisterDTO } from './dto/userRegister.dto'
import { User } from './user.entity'

@injectable()
export class UserController extends BaseRouter implements IUser {
	constructor(@inject(TYPES.ILogger) private log: ILogger) {
		super(log)
		this.bindRoutes([
			{
				path: '/login',
				method: 'get',
				func: this.login,
			},
			{
				path: '/register',
				method: 'post',
				func: this.register,
			},
		])
	}

	login(
		req: Request<{}, {}, UserLoginDTO>,
		res: Response,
		next: NextFunction
	): void {
		throw new HTTPError(401, 'Auth error', 'login')
	}

	async register(
		{ body }: Request<{}, {}, UserRegisterDTO>,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const user = new User(body)
		await user.setPassword(body.password)
		res.send(user)
	}
}
