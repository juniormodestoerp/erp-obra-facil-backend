function FormatDocument(document: string) {
	if (!document) {
		return ''
	}

	const documentTrim = document.replace(/[/,.,-]/g, '')

	if (documentTrim.length === 11) {
		return documentTrim.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
	}
	if (documentTrim.length === 14) {
		return documentTrim.replace(
			/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
			'$1.$2.$3/$4-$5',
		)
	}
	return documentTrim
}

function FormatPhone(phone: string): string {
	if (phone.length < 10) {
		return ''
	}

	const ddd = phone.slice(0, 2)

	if (phone.length === 10) {
		const first = phone.slice(2, 6)
		const last = phone.slice(6)

		return `(${ddd}) ${first}-${last}`
	}
	const first = phone.slice(2, 7)
	const last = phone.slice(7)

	return `(${ddd}) ${first}-${last}`
}

function NormalizeName(name: string): string {
	return name.trim().toLowerCase().replace(/\s+/g, '-')
}

function GenerateRandomCode(length: number): string {
	const min = 10 ** (length - 1)
	const max = 10 ** length - 1
	return `${Math.floor(Math.random() * (max - min + 1)) + min}`
}

export const Utils = {
	FormatDocument,
	FormatPhone,
	NormalizeName,
	GenerateRandomCode,
}
