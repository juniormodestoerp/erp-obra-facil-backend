import { Entity } from '@core/domain/entities/entity'
import type { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import type { Optional } from '@core/domain/types/opcional'

import type { User } from '@modules/users/entities/user'

interface Props {
	userId: string
	fieldName: string
	isFieldEnable: boolean
	isFieldRequired: boolean
	title: string
	description: string
	createdAt: Date
	updatedAt: Date
	deletedAt: Date | null

	user: User | null
}

export class Setting extends Entity<Props> {
	get userId(): string {
		return this.props.userId
	}

	set userId(userId: string) {
		this.props.userId = userId
	}

	get fieldName(): string {
		return this.props.fieldName
	}

	set fieldName(fieldName: string) {
		this.props.fieldName = fieldName
	}

	get isFieldEnable(): boolean {
		return this.props.isFieldEnable
	}

	set isFieldEnable(isFieldEnable: boolean) {
		this.props.isFieldEnable = isFieldEnable
	}

	get isFieldRequired(): boolean {
		return this.props.isFieldRequired
	}

	set isFieldRequired(isFieldRequired: boolean) {
		this.props.isFieldRequired = isFieldRequired
	}

	get title(): string {
		return this.props.title
	}

	set title(title: string) {
		this.props.title = title
	}

	get description(): string {
		return this.props.description
	}

	set description(description: string) {
		this.props.description = description
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
		props: Optional<Props, 'createdAt' | 'updatedAt' | 'deletedAt' | 'user'>,
		id?: UniqueEntityID,
	): Setting {
		return new Setting(
			{
				...props,
				createdAt: props.createdAt ?? new Date(),
				updatedAt: props.updatedAt ?? new Date(),
				deletedAt: props.deletedAt ?? null,
				user: props.user ?? null,
			},
			id,
		)
	}
}
