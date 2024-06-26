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

/**
 * Converte um número de série do Excel para uma data legível.
 * @param serialNumber Número de série do Excel.
 * @returns Data no formato 'DD/MM/YYYY'.
 */
function excelSerialToDate(serialNumber: number): string {
	const baseDate = new Date(1900, 0, 1)
	const excelDate = new Date(
		baseDate.getTime() + (serialNumber - 1) * 24 * 60 * 60 * 1000,
	)
	const day = String(excelDate.getDate()).padStart(2, '0')
	const month = String(excelDate.getMonth() + 1).padStart(2, '0')
	const year = excelDate.getFullYear()
	return `${day}/${month}/${year}`
}

/**
 * Converte uma data no formato 'DD/MM/YYYY' para um número de série do Excel.
 * @param date Data no formato 'DD/MM/YYYY'.
 * @returns Número de série do Excel.
 */
function dateToExcelSerial(date: string): number {
	const [day, month, year] = date.split('/').map(Number)
	const baseDate = new Date(1900, 0, 1)
	const targetDate = new Date(year, month - 1, day)
	const diffInTime = targetDate.getTime() - baseDate.getTime()
	return Math.floor(diffInTime / (24 * 60 * 60 * 1000)) + 1
}

/**
 * Converte uma data no formato 'DD/MM/YYYY' para um objeto Date do JavaScript.
 * @param dateString Data no formato 'DD/MM/YYYY'.
 * @returns Objeto Date do JavaScript.
 */
function parseDate(dateString: string): Date {
	const [day, month, year] = dateString.split('/').map(Number)
	return new Date(year, month - 1, day)
}

export const Utils = {
	FormatDocument,
	FormatPhone,
	NormalizeName,
	GenerateRandomCode,
	excelSerialToDate,
	dateToExcelSerial,
	parseDate,
}
