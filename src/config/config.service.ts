import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv'
import { IConfigService } from './config.service.interface'
import { inject, injectable } from 'inversify'
import { ILogger } from '../logger/logger.interface'
import { TYPES } from '../types'

@injectable()
export class ConfigService implements IConfigService {
	private result: DotenvParseOutput
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		const conf = config()

		if (conf.error) {
			this.logger.error('[ConfigService] Ошибка при чтении файла .env')
		}
		if (conf.parsed) {
			this.result = conf.parsed
		}
	}
	get<T extends string>(key: string): T {
		return this.result[key] as T
	}
}
