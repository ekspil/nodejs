import { NextFunction, Request, Response } from "express"
import { HTTPError } from "./httpError.class"

export interface IExeptionFilter {
	catch: (
		err: Error | HTTPError,
		req: Request,
		res: Response,
		next: NextFunction
	) => void
}
