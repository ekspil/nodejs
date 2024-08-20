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
import { GuardMiddleware } from '../common/guard.middleware'

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
				method: 'post',
				func: this.login,
				middlewares: [new Validator(UserLoginDTO)],
			},
			{
				path: '/register',
				method: 'post',
				func: this.register,
				middlewares: [new Validator(UserRegisterDTO)],
			},
			{
				path: '/info',
				method: 'get',
				func: this.info,
				middlewares: [new GuardMiddleware()],
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
			return next(new HTTPError(422, 'Auth error', 'User_Login'))
		}

		const jwt = await this.signJWT(
			body.email,
			this.configService.get('SECRET')
		)

		res.send({ jwt })
	}

	async info(
		{ user }: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const result = await this.userService.findUser(user)
		res.send({ email: result?.email, name: result?.name, id: result?.id })
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
					422,
					'Пользователь с таким email уже существует',
					'Register user'
				)
			)
		}

		res.send(result)
	}
}
