import { injectable } from 'inversify'
import { IUserService } from './user.service.interface'
import { UserLoginDTO } from './dto/userLogin.dto'
import { UserRegisterDTO } from './dto/userRegister.dto'
import { User } from './user.entity'

@injectable()
export class UserService implements IUserService {
	constructor() {}
	async createUser({
		name,
		password,
		email,
	}: UserRegisterDTO): Promise<User | null> {
		const user = new User({ email, name })
		await user.setPassword(password)
		return null
	}
	async validateUser({ password, email }: UserLoginDTO): Promise<boolean> {
		//Авторизовать пользователя вернув ему JWT, либо вернуть false

		return true
	}
}
