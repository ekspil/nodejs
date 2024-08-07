import { NextFunction, Router, Request, Response } from "express"
import { IControllerRoute } from "../common/route.interface"

export interface IUser {
	router: Router
	login: (req: Request, res: Response, next: NextFunction) => void
	register: (eq: Request, res: Response, next: NextFunction) => void
	bindRoutes: (routes: IControllerRoute[]) => void
}
