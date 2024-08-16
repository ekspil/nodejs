import { TYPES } from './types'
import { Container, ContainerModule, interfaces } from 'inversify'
import { App } from './app'
import { ExeptionFilter } from './errors/exeption.filter'
import { LoggerService } from './logger/logger'
import { UserController } from './user/user.controller'
import { ILogger } from './logger/logger.interface'
import { IExeptionFilter } from './errors/exeption.filter.interface'
import { IUserController } from './user/user.interface'
import { IBootstrap } from './index.interface'
import { IUserService } from './user/user.service.interface'
import { UserService } from './user/user.service'
import { IConfigService } from './config/config.service.interface'
import { ConfigService } from './config/config.service'
import { PrismaService } from './database/prisma.service'

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope()
	bind<IExeptionFilter>(TYPES.IExeptionFilter)
		.to(ExeptionFilter)
		.inSingletonScope()
	bind<IUserController>(TYPES.UserController)
		.to(UserController)
		.inSingletonScope()
	bind<IUserService>(TYPES.UserService).to(UserService).inSingletonScope()
	bind<App>(TYPES.App).to(App).inSingletonScope()
	bind<IConfigService>(TYPES.ConfigService)
		.to(ConfigService)
		.inSingletonScope()
	bind<PrismaService>(TYPES.PrismaService)
		.to(PrismaService)
		.inSingletonScope()
})

function bootstrap(): IBootstrap {
	const appContainer = new Container()
	appContainer.load(appBindings)
	const app = appContainer.get<App>(TYPES.App)
	app.init()
	return { app, appContainer }
}

export const { app, appContainer } = bootstrap()
