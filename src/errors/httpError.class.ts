export class HTTPError extends Error {
	public code: number
	public message: string
	public context?: string

	constructor(code: number, message: string, context?: string) {
		super(message)
		this.code = code
		this.message = message
		this.context = context
	}
}
