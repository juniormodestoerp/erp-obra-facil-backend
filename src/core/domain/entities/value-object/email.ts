import dns from 'node:dns'

export class Email {
	private _value: string
	constructor(email: string) {
		this._value = email
	}

	get value() {
		return this._value
	}

	public async isValid(): Promise<boolean> {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!emailRegex.test(this._value)) {
			return false
		}

		const domain = this._value.split('@')[1]
		const emailBlacklist = [
			'gmil.com',
			'gamil.com',
			'hotmial.com.br',
			'yahho.com',
			'outloook.com',
			'gmail.con',
			'hotmail.con',
			'yahoo.con',
			'outlook.con',
			'gmail.co',
			'hotmail.co',
		]

		if (emailBlacklist.includes(domain.toLowerCase())) {
			return false
		}

		return new Promise((resolve) => {
			dns.resolveMx(domain, (err, addresses) => {
				if (err || !addresses || addresses.length === 0) {
					resolve(false)
				} else {
					resolve(true)
				}
			})
		})
	}
}
