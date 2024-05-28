import { type ErrorKeys, errors } from '@core/domain/errors/pt-br'

interface IRequest {
	code: ErrorKeys
	error?: string
	status?: number
	message?: string
	data?: Array<unknown>
}

export class AppError {
	public readonly type?: string

	public readonly error?: string

	public readonly message?: string

	public readonly code: ErrorKeys

	public readonly status: number

	public readonly data?: Array<unknown>

	constructor({ error, code, status, message, data }: IRequest) {
		const errorMap = errors[code]

		this.type = 'AppError'
		this.code = code
		this.error = error || errorMap.error
		this.status = status || errorMap.status
		this.message = message || errorMap.message || error
		this.data = data || []
	}
}
