import { hash } from 'bcryptjs'
import { UserRegisterDTO } from './dto/userRegister.dto'

export class User {
	private _password: string
	private _email: string
	private _name: string

	constructor({ email, name }: Omit<UserRegisterDTO, 'password'>) {
		this._email = email
		this._name = name
	}

	public get email(): string {
		return this._email
	}

	public get name(): string {
		return this._name
	}

	public get password(): string {
		return this._password
	}

	public async setPassword(password: string, salt: string): Promise<void> {
		this._password = await hash(password, Number(salt))
	}
}
