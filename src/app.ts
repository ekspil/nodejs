import express, { Express, json } from 'express'
import { Server } from 'http'
import { inject, injectable } from 'inversify'
import { TYPES } from './types'
import { ILogger } from './logger/logger.interface'
import { IExeptionFilter } from './errors/exeption.filter.interface'
import { IUserController } from './user/user.interface'
import 'reflect-metadata'

@injectable()
export class App {
	port: number
	server: Server
	app: Express

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.UserController) private userController: IUserController,
		@inject(TYPES.IExeptionFilter) private exeptionFilter: IExeptionFilter
	) {
		this.app = express()
		this.port = 8000
		this.logger = logger
	}

	useMiddleware(): void {
		this.app.use(json())
	}

	useRoutes(): void {
		this.app.use('/users', this.userController.router)
	}

	useExeptionFilters(): void {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter))
	}

	public init(): void {
		this.useMiddleware()
		this.useRoutes()
		this.useExeptionFilters()
		this.server = this.app.listen(this.port)
		this.logger.log(`Сервер запущен на http://localhost:${this.port}`)
	}
}
