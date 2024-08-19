import { Request, Response, NextFunction } from 'express'
import { IMiddleware } from './middleware.interface'
import { HTTPError } from '../errors/httpError.class'

export class GuardMiddleware implements IMiddleware {
	execute({user}: Request, res: Response, next: NextFunction): void {
        if(!user){
            next(new HTTPError(401, "Access denied", "Guard"))
        }
        else {
            next()
        }

    }
}
