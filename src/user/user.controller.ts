import { TYPES } from "../types"
import { NextFunction, Request, Response } from "express"
import { BaseRouter } from "../common/base.controller"
import { HTTPError } from "../errors/httpError.class"
import { inject, injectable } from "inversify";

import { ILogger } from "../logger/logger.interface"

import "reflect-metadata"
import { IUser } from "./user.interface"
@injectable()
export class UserController extends BaseRouter implements IUser {
	constructor(@inject(TYPES.ILogger) private log: ILogger) {
		super(log)
		this.bindRoutes([
			{
				path: "/login",
				method: "get",
				func: this.login,
			},
			{
				path: "/register",
				method: "get",
				func: this.register,
			},
		])
	}

	login(req: Request, res: Response, next: NextFunction):void {
		throw new HTTPError(401, "Auth error", "login")
	}

	register(req: Request, res: Response, next: NextFunction):void {
		res.send("Controller register")
	}
}
