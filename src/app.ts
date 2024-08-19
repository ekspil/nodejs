import express, { Express, json } from 'express'
import { Server } from 'http'
import { inject, injectable } from 'inversify'
import { TYPES } from './types'
import { ILogger } from './logger/logger.interface'
import { IExeptionFilter } from './errors/exeption.filter.interface'
import { IUserController } from './user/user.interface'
import 'reflect-metadata'
import { IConfigService } from './config/config.service.interface'
import { PrismaService } from './database/prisma.service'
import { AuthMiddleware } from './common/auth.middleware'

@injectable()
export class App {
	port: number
	server: Server
	app: Express

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.UserController) private userController: IUserController,
		@inject(TYPES.IExeptionFilter) private exeptionFilter: IExeptionFilter,
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.PrismaService) private prismaService: PrismaService
	) {
		this.app = express()
		this.port = 8000
		this.logger = logger
	}

	useMiddleware(): void {
		this.app.use(json())
		const middleware = new AuthMiddleware(this.configService.get('SECRET'))
		this.app.use(middleware.execute.bind(middleware))
	}

	useRoutes(): void {
		this.app.use('/users', this.userController.router)
	}

	useExeptionFilters(): void {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter))
	}

	public async init(): Promise<void> {
		this.useMiddleware()
		this.useRoutes()
		this.useExeptionFilters()

		await this.prismaService.connect()
		this.server = this.app.listen(this.port)
		this.logger.log(`Сервер запущен на http://localhost:${this.port}`)
	}
}
