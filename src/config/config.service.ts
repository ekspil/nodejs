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
			this.logger.log(
				'[ConfigService] Конфигурация загружена из файла .env'
			)
			this.result = conf.parsed
		}
	}
	get(key: string): string {
		return this.result[key]
	}
}
