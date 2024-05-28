import { Entity } from '@core/domain/entities/entity'
import type { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import type { Optional } from '@core/domain/types/opcional'

import type {
	ICategory,
	IRelatedCategories,
} from '@modules/categories/dtos/category-dto'
import type { User } from '@modules/users/entities/user'

interface Props {
	userId: string
	categoryId?: string | null
	name: string
	subcategory?: string | null
	type: string
	model: string
	createdAt: Date
	updatedAt: Date
	deletedAt?: Date | null
	user?: User
	relatedCategories?: IRelatedCategories
	categories?: ICategory | null
}

export class Category extends Entity<Props> {
	get categoryId(): string | null | undefined {
		return this.props.categoryId
	}

	set categoryId(categoryId: string | null | undefined) {
		this.props.categoryId = categoryId
	}

	get userId(): string {
		return this.props.userId
	}

	set userId(userId: string) {
		this.props.userId = userId
	}

	get name(): string {
		return this.props.name
	}

	set name(name: string) {
		this.props.name = name
	}

	get subcategory(): string | null | undefined {
		return this.props.subcategory
	}

	set subcategory(subcategory: string | null | undefined) {
		this.props.subcategory = subcategory
	}

	get type(): string {
		return this.props.type
	}

	set type(type: string) {
		this.props.type = type
	}

	get model(): string {
		return this.props.model
	}

	set model(model: string) {
		this.props.model = model
	}

	get createdAt(): Date {
		return this.props.createdAt
	}

	set createdAt(createdAt: Date) {
		this.props.createdAt = createdAt
	}

	get updatedAt(): Date {
		return this.props.updatedAt
	}

	set updatedAt(updatedAt: Date) {
		this.props.updatedAt = updatedAt
	}

	get deletedAt(): Date | null | undefined {
		return this.props.deletedAt
	}

	set deletedAt(deletedAt: Date | null | undefined) {
		this.props.deletedAt = deletedAt
	}

	get user(): User | undefined {
		return this.props.user
	}

	set user(user: User | undefined) {
		this.props.user = user
	}

	get relatedCategories(): IRelatedCategories | undefined {
		return this.props.relatedCategories
	}

	set relatedCategories(relatedCategories: IRelatedCategories | undefined) {
		this.props.relatedCategories = relatedCategories
	}

	get categories(): ICategory | null | undefined {
		return this.props.categories
	}

	set categories(categories: ICategory | null | undefined) {
		this.props.categories = categories
	}

	static create(
		props: Optional<Props, 'createdAt' | 'updatedAt' | 'deletedAt'>,
		id?: UniqueEntityID,
	): Category {
		return new Category(
			{
				...props,
				createdAt: props.createdAt ?? new Date(),
				updatedAt: props.updatedAt ?? new Date(),
				deletedAt: props.deletedAt ?? null,
			},
			id,
		)
	}
}
