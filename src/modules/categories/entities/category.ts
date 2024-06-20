import { Entity } from '@core/domain/entities/entity'
import type { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import type { Optional } from '@core/domain/types/opcional'
import type { User } from '@modules/users/entities/user'

interface Props {
	userId: string
	categoryId: string | null
	name: string
	subcategory: string | null
	type: string
	model: string
	createdAt: Date
	updatedAt: Date
	deletedAt: Date | null
	user: User | null
	categories: Category | null
	relatedCategories: Category[]
}

export class Category extends Entity<Props> {
	get userId(): string {
		return this.props.userId
	}

	set userId(userId: string) {
		this.props.userId = userId
	}

	get categoryId(): string | null {
		return this.props.categoryId
	}

	set categoryId(categoryId: string | null) {
		this.props.categoryId = categoryId
	}

	get name(): string {
		return this.props.name
	}

	set name(name: string) {
		this.props.name = name
	}

	get subcategory(): string | null {
		return this.props.subcategory
	}

	set subcategory(subcategory: string | null) {
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

	get deletedAt(): Date | null {
		return this.props.deletedAt
	}

	set deletedAt(deletedAt: Date | null) {
		this.props.deletedAt = deletedAt
	}

	get user(): User | null {
		return this.props.user
	}

	set user(user: User | null) {
		this.props.user = user
	}

	get categories(): Category | null {
		return this.props.categories
	}

	set categories(categories: Category | null) {
		this.props.categories = categories
	}

	get relatedCategories(): Category[] {
		return this.props.relatedCategories
	}

	set relatedCategories(relatedCategories: Category[]) {
		this.props.relatedCategories = relatedCategories
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
