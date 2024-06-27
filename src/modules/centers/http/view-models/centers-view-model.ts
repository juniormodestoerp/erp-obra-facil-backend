import type { Center } from '@modules/centers/entities/center'

export class CentersViewModel {
	static toHTTP(center: Center) {
		return {
			id: center.id,
			name: center.name,
			createdAt: center.createdAt,
		}
	}
}
