export class EntityString {
	static normalizeName(name: string): string {
		const nameLower = name.toLowerCase()
		const arr = nameLower.split(' ')
		const lowerCaseWords = [
			'de',
			'do',
			'dos',
			'da',
			'das',
			'e',
			'o',
			'a',
			'os',
			'as',
		]

		for (let i = 0; i < arr.length; i += 1) {
			if (lowerCaseWords.includes(arr[i].toLowerCase())) {
				arr[i] = arr[i].toLowerCase()
			} else if (arr[i].length > 2) {
				arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
			}
		}

		const str2 = arr.join(' ')

		return str2
	}

	static getCommonName(name: string): string {
		const nameNormalize = EntityString.normalizeName(name)
		const arr = nameNormalize.split(' ')

		return arr[0] ?? ''
	}
}
