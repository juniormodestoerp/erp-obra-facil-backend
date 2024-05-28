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

	user?: User
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

	getUser(): User | undefined {
		return this.props.user
	}

	setUser(user: User) {
		this.props.user = user
	}

	get user() {
		return this.props.user
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
