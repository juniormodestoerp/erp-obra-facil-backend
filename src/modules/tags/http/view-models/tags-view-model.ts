import type { Tag } from '@modules/tags/entities/tag'

export class TagsViewModel {
	static toHTTP(tag: Tag) {
		return {
			id: tag.id,
			tagName: tag.name,
			currency: tag.currency,
			logo: tag.logo,
			initialBalance: tag.initialBalance,
			createdAt: tag.createdAt,
		}
	}
}
