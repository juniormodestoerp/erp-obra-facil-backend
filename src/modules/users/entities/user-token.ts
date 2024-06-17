import { Entity } from '@core/domain/entities/entity'
import type { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import type { Optional } from '@core/domain/types/opcional'

import type { User } from '@modules/users/entities/user'

interface Props {
	userId: string
	token: string
	code: string
	usage: boolean
	createdAt: Date
	updatedAt: Date
	deletedAt: Date | null

	user: User | null
}

export class UserToken extends Entity<Props> {
	get userId(): string {
		return this.props.userId
	}

	set userId(userId: string) {
		this.props.userId = userId
	}

	get token(): string {
		return this.props.token
	}

	set token(token: string) {
		this.props.token = token
	}

	get code(): string {
		return this.props.code
	}

	set code(code: string) {
		this.props.code = code
	}

	get usage(): boolean {
		return this.props.usage
	}

	set usage(usage: boolean) {
		this.props.usage = usage
	}

	get createdAt(): Date {
		return this.props.createdAt
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
	): UserToken {
		return new UserToken(
			{
				createdAt: props.createdAt ?? new Date(),
				updatedAt: props.updatedAt ?? new Date(),
				deletedAt: props.deletedAt ?? null,
				...props,
			},
			id,
		)
	}
}
