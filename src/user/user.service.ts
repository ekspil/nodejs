import { inject, injectable } from 'inversify'
import { IUserService } from './user.service.interface'
import { UserLoginDTO } from './dto/userLogin.dto'
import { UserRegisterDTO } from './dto/userRegister.dto'
import { User } from './user.entity'
import { TYPES } from '../types'
import { IConfigService } from '../config/config.service.interface'

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService
	) {}
	async createUser({
		name,
		password,
		email,
	}: UserRegisterDTO): Promise<User | null> {
		const salt = this.configService.get('SALT')
		const user = new User({ email, name })
		await user.setPassword(password, salt)
		return null
	}
	async validateUser({ password, email }: UserLoginDTO): Promise<boolean> {
		//Авторизовать пользователя вернув ему JWT, либо вернуть false

		return true
	}
}
