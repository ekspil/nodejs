/* eslint-disable no-undef */
import 'reflect-metadata'
import { Container } from 'inversify'
import { IConfigService } from '../config/config.service.interface'
import { IUserRepository } from './user.repo.interface'
import { IUserService } from './user.service.interface'
import { TYPES } from '../types'
import { UserService } from './user.service'
import { User } from './user.entity'
import { UserModel } from '@prisma/client'

const ConfigServiceMock: IConfigService = {
	get: jest.fn(),
}

const UserRepositoryMock: IUserRepository = {
	create: jest.fn(),
	find: jest.fn(),
}

const container = new Container()

let configService: IConfigService
let userRepository: IUserRepository
let userService: IUserService

beforeAll(() => {
	container.bind<IUserService>(TYPES.UserService).to(UserService)
	container
		.bind<IUserRepository>(TYPES.UserRepository)
		.toConstantValue(UserRepositoryMock)
	container
		.bind<IConfigService>(TYPES.ConfigService)
		.toConstantValue(ConfigServiceMock)

	userService = container.get<IUserService>(TYPES.UserService)
	configService = container.get<IConfigService>(TYPES.ConfigService)
	userRepository = container.get<IUserRepository>(TYPES.UserRepository)
})
let createdUser: UserModel | null
describe('User Service', () => {
	it('createUser', async () => {
		configService.get = jest.fn().mockReturnValueOnce('1')
		userRepository.create = jest.fn().mockImplementationOnce(
			(user: User): UserModel => ({
				id: 2,
				name: user.name,
				email: user.email,
				password: user.password,
			})
		)

		createdUser = await userService.createUser({
			name: 'Alex',
			email: 'asd@ddd.ru',
			password: '2',
		})

		expect(createdUser?.id).toEqual(2)
		expect(createdUser?.password).not.toEqual('2')
	})
	it('ValidateUser - success', async () => {
		userRepository.find = jest.fn().mockReturnValueOnce(createdUser)
		const result = await userService.validateUser({
			email: 'asd@ddd.ru',
			password: '2',
		})
		expect(result).toBeTruthy()
	})
	it('validateUser - wrong password', async () => {
		userRepository.find = jest.fn().mockReturnValueOnce(createdUser)

		const result = await userService.validateUser({
			email: 'asd@ddd.ru',
			password: '3',
		})
		expect(result).not.toBeTruthy()
	})
	it('validateUser - user not found', async () => {
		userRepository.find = jest.fn().mockReturnValueOnce(null)
		const result = await userService.validateUser({
			email: 'a2sd@ddd.ru',
			password: '2',
		})
		expect(result).not.toBeTruthy()
	})
})
