import { AppError } from '@core/domain/errors/app-error'

type DocumentType = 'CPF' | 'CNPJ'

const STRICT_STRIP_REGEX: RegExp = /[-./\\]/g
const LOOSE_STRIP_REGEX: RegExp = /[^\d]/g

const BLACKLIST: Array<string> = [
	'00000000000',
	'11111111111',
	'22222222222',
	'33333333333',
	'44444444444',
	'55555555555',
	'66666666666',
	'77777777777',
	'88888888888',
	'99999999999',
	'12345678909',
	'00000000000000',
	'11111111111111',
	'22222222222222',
	'33333333333333',
	'44444444444444',
	'55555555555555',
	'66666666666666',
	'77777777777777',
	'88888888888888',
	'99999999999999',
]

export class Document {
	private document!: string
	private readonly type!: DocumentType

	get value(): string {
		return this.document
	}

	get documentType(): DocumentType {
		return this.type
	}

	private isDocumentLengthValid(document: string, type: DocumentType): boolean {
		if (type === 'CPF') {
			return document.length === 11
		}
		if (type === 'CNPJ') {
			return document.length === 14
		}
		return false
	}

	private isOnlyDigitsInDocument(document: string): boolean {
		return /^\d+$/.test(document)
	}

	private validate(document: string, type: DocumentType): void {
		if (type === 'CPF') {
			if (!this.CPFisValid(document)) {
				throw new AppError({
					code: 'document.invalid',
				})
			}
		}

		if (type === 'CNPJ') {
			if (!this.CNPJisValid(document)) {
				throw new AppError({
					code: 'document.invalid',
				})
			}
		}

		if (!this.isDocumentLengthValid(document, type)) {
			throw new AppError({
				code: 'document.invalid_length',
			})
		}

		if (!this.isOnlyDigitsInDocument(document)) {
			throw new AppError({
				code: 'document.invalid_digits',
			})
		}
	}

	private CPFverifierDigit = (digits: string): number => {
		const numbers: Array<number> = digits.split('').map((number) => {
			return Number.parseInt(number, 10)
		})

		const modulus: number = numbers.length + 1
		const multiplied: Array<number> = numbers.map(
			(number, index) => number * (modulus - index),
		)
		const mod: number =
			multiplied.reduce((buffer, number) => buffer + number) % 11

		return mod < 2 ? 0 : 11 - mod
	}

	private CNPJverifierDigit = (digits: string): number => {
		const reverse: Array<number> = digits.split('').reduce(
			(buffer, number) => {
				return [Number.parseInt(number, 10)].concat(buffer)
			},
			[] as Array<number>,
		)

		const sum: number = reverse.reduce((buffer, number, idx) => {
			const currentIndex = (idx % 8) + 2
			return buffer + number * currentIndex
		}, 0)

		const mod: number = sum % 11
		return mod < 2 ? 0 : 11 - mod
	}

	private CPFstrip = (number: string, strict?: boolean): string => {
		const regex: RegExp = strict ? STRICT_STRIP_REGEX : LOOSE_STRIP_REGEX
		return (number || '').replace(regex, '')
	}

	private CNPJstrip = (number: string, strict?: boolean): string => {
		const regex: RegExp = strict ? STRICT_STRIP_REGEX : LOOSE_STRIP_REGEX
		return (number || '').replace(regex, '')
	}

	public CPFisValid = (number: string, strict?: boolean): boolean => {
		const stripped: string = this.CPFstrip(number, strict)

		// CPF must be defined
		if (!stripped) {
			return false
		}

		// CPF must have 11 chars
		if (stripped.length !== 11) {
			return false
		}

		// CPF can't be blacklisted
		if (BLACKLIST.includes(stripped)) {
			return false
		}

		let numbers: string = stripped.substring(0, 9)
		numbers += this.CPFverifierDigit(numbers)
		numbers += this.CPFverifierDigit(numbers)

		return numbers.substring(-2) === stripped.substring(-2)
	}

	private CNPJisValid = (number: string, strict?: boolean): boolean => {
		const stripped: string = this.CNPJstrip(number, strict)

		if (!stripped) {
			return false
		}

		if (stripped.length !== 14) {
			return false
		}

		if (BLACKLIST.includes(stripped)) {
			return false
		}

		let numbers: string = stripped.substring(0, 12)
		numbers += this.CNPJverifierDigit(numbers)
		numbers += this.CNPJverifierDigit(numbers)

		return numbers.substring(-2) === stripped.substring(-2)
	}

	constructor(document?: string, type?: DocumentType) {
		if (document && type) {
			this.validate(document, type)

			this.document = document
			this.type = type
		}
	}
}
