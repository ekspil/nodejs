import { TYPES } from '../types'
import { NextFunction, Request, Response } from 'express'
import { BaseRouter } from '../common/base.controller'
import { HTTPError } from '../errors/httpError.class'
import { inject, injectable } from 'inversify'

import { ILogger } from '../logger/logger.interface'

import { IUserController } from './user.interface'
import { UserLoginDTO } from './dto/userLogin.dto'
import { UserRegisterDTO } from './dto/userRegister.dto'
import { IUserService } from './user.service.interface'
import { Validator } from '../common/validate.middlleware'
import { IConfigService } from '../config/config.service.interface'

@injectable()
export class UserController extends BaseRouter implements IUserController {
	constructor(
		@inject(TYPES.ILogger) private log: ILogger,
		@inject(TYPES.UserService) private readonly userService: IUserService,
		@inject(TYPES.ConfigService)
		private readonly configService: IConfigService
	) {
		super(log)
		this.bindRoutes([
			{
				path: '/login',
				method: 'get',
				func: this.login,
				middlewares: [new Validator(UserLoginDTO)],
			},
			{
				path: '/register',
				method: 'post',
				func: this.register,
				middlewares: [new Validator(UserRegisterDTO)],
			},
		])
	}

	async login(
		{ body }: Request<{}, {}, UserLoginDTO>,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const result = await this.userService.validateUser(body)
		if (!result) {
			return next(new HTTPError(401, 'Auth error', 'login'))
		}

		const jwt = await this.signJWT(
			body.email,
			this.configService.get('SECRET')
		)

		res.send(jwt)
	}

	async register(
		{ body }: Request<{}, {}, UserRegisterDTO>,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const result = await this.userService.createUser(body)
		if (!result) {
			return next(
				new HTTPError(
					401,
					'Пользователь с таким email уже существует',
					'Register user'
				)
			)
		}

		res.send(result)
	}
}
