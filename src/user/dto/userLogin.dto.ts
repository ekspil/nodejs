import { IsEmail, IsString } from 'class-validator'

export class UserLoginDTO {
	@IsEmail({}, { message: 'Неверно указан email' })
	email: string
	@IsString({ message: 'Пароль не может быть пустым' })
	password: string
}
