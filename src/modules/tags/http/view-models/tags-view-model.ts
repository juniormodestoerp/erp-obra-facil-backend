import type { Tag } from '@modules/tags/entities/tag'

export class TagsViewModel {
	static toHTTP(tag: Tag) {
		return {
			id: tag.id,
			name: tag.name,
			createdAt: tag.createdAt,
		}
	}
}
