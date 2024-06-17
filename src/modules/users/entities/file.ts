import { Entity } from '@core/domain/entities/entity'
import type { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import type { Optional } from '@core/domain/types/opcional'

import type { User } from '@modules/users/entities/user'

interface Props {
	userId: string
	path: string
	name: string
	contentType: string
	createdAt: Date
	updatedAt: Date
	deletedAt: Date | null

	user: User | null
}

export class File extends Entity<Props> {
	get userId(): string {
		return this.props.userId
	}

	set userId(userId: string) {
		this.props.userId = userId
	}

	get path(): string {
		return this.props.path
	}

	set path(path: string) {
		this.props.path = path
	}

	get name(): string {
		return this.props.name
	}

	set name(name: string) {
		this.props.name = name
	}

	get contentType(): string {
		return this.props.contentType
	}

	set contentType(contentType: string) {
		this.props.contentType = contentType
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

	static create(
		props: Optional<Props, 'createdAt' | 'updatedAt' | 'deletedAt'>,
		id?: UniqueEntityID,
	): File {
		return new File(
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
