import { UserModel } from '@prisma/client'
import { User } from './user.entity'
import { IUserRepository } from './user.repo.interface'
import { inject, injectable } from 'inversify'
import { TYPES } from '../types'
import { PrismaService } from '../database/prisma.service'

@injectable()
export class UserRepository implements IUserRepository {
	constructor(
		@inject(TYPES.PrismaService)
		private readonly prismaService: PrismaService
	) {}

	async create({ email, password, name }: User): Promise<UserModel> {
		return this.prismaService.client.userModel.create({
			data: {
				name,
				password,
				email,
			},
		})
	}

	async find(email: string): Promise<UserModel | null> {
		return this.prismaService.client.userModel.findFirst({
			where: {
				email,
			},
		})
	}
}
