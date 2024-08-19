import { compare, hash } from 'bcryptjs'
import { UserRegisterDTO } from './dto/userRegister.dto'

export class User {
	private _password: string
	private _email: string
	private _name: string

	constructor(
		{ email, name }: Omit<UserRegisterDTO, 'password'>,
		passwordHash?: string
	) {
		this._email = email
		this._name = name
		if (passwordHash) this._password = passwordHash
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

	public async comparePassword(password: string): Promise<boolean> {
		return await compare(password, this._password)
	}
}
