import { inject, injectable } from 'inversify'
import { IUserService } from './user.service.interface'
import { UserLoginDTO } from './dto/userLogin.dto'
import { UserRegisterDTO } from './dto/userRegister.dto'
import { User } from './user.entity'
import { TYPES } from '../types'
import { IConfigService } from '../config/config.service.interface'
import { IUserRepository } from './user.repo.interface'

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.UserRepository)
		private readonly userRepository: IUserRepository
	) {}
	async createUser({
		name,
		password,
		email,
	}: UserRegisterDTO): Promise<User | null> {
		const isExist = await this.userRepository.find(email)
		if (isExist) return null

		const salt = this.configService.get('SALT')
		const user = new User({ email, name })
		await user.setPassword(password, salt)
		await this.userRepository.create(user)
		return user
	}
	async validateUser({ password, email }: UserLoginDTO): Promise<boolean> {
		const isExist = await this.userRepository.find(email)
		if (!isExist) return false
		const user = new User({ email, name: isExist.name }, isExist.password)
		return user.comparePassword(password)
	}
}
