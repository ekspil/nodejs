import { TYPES } from './types'
import { Container, ContainerModule, interfaces } from 'inversify'
import { App } from './app'
import { ExeptionFilter } from './errors/exeption.filter'
import { LoggerService } from './logger/logger'
import { UserController } from './user/user.controller'
import { ILogger } from './logger/logger.interface'
import { IExeptionFilter } from './errors/exeption.filter.interface'
import { IUser } from './user/user.interface'
import { IBootstrap } from './index.interface'

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService)
	bind<IExeptionFilter>(TYPES.IExeptionFilter).to(ExeptionFilter)
	bind<IUser>(TYPES.UserController).to(UserController)
	bind<App>(TYPES.App).to(App)
})

function bootstrap(): IBootstrap {
	const appContainer = new Container()
	appContainer.load(appBindings)
	const app = appContainer.get<App>(TYPES.App)
	app.init()
	return { app, appContainer }
}

export const { app, appContainer } = bootstrap()
