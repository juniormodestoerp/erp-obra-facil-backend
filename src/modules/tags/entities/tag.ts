import { Entity } from '@core/domain/entities/entity'
import type { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import type { Optional } from '@core/domain/types/opcional'

import type { Transaction } from '@modules/transactions/entities/transaction'
import type { User } from '@modules/users/entities/user'

interface Props {
	userId: string
	name: string
	createdAt: Date
	updatedAt: Date
	deletedAt: Date | null
}

export class Tag extends Entity<Props> {
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

	static create(
		props: Optional<
			Props,
			'createdAt' | 'updatedAt' | 'deletedAt'
		>,
		id?: UniqueEntityID,
	): Tag {
		return new Tag(
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
