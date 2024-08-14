import { Request, NextFunction, Response } from "express"
import { IExeptionFilter } from "./exeption.filter.interface"
import { HTTPError } from "./httpError.class"
import { inject, injectable } from "inversify"
import { TYPES } from "../types"
import { ILogger } from "../logger/logger.interface"

import "reflect-metadata"

@injectable()
export class ExeptionFilter implements IExeptionFilter {
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {}

	catch(
		err: Error | HTTPError,
		req: Request,
		res: Response,
		next: NextFunction
	):void {
		if (err instanceof HTTPError) {
			this.logger.log(
				`[${err.context}] Ошибка ${err.code}: ${err.message}`
			)
			res.status(err.code).send({ err: err.message })
		} else {
			this.logger.log(`${err.message}`)
			res.status(500).send({ err: err.message })
		}
	}
}
