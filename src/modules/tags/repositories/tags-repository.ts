import type { ISelectInputDTO } from '@core/domain/dtos/select-input-dto'

import type { Tag } from '@modules/tags/entities/tag'

export interface TagsRepository {
	findById(id: string): Promise<Tag | null>
	findByName(name: string): Promise<Tag | null>
	findMany(userId: string): Promise<Tag[]>
	selectInput(): Promise<ISelectInputDTO[]>
	create(tag: Tag): Promise<void>
	save(tag: Tag): Promise<void>
	remove(id: string): Promise<void>
}
