import { Entity } from '@core/domain/entities/entity'
import type { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import type { Optional } from '@core/domain/types/opcional'

import type { Transaction } from '@modules/transactions/entities/transaction'
import type { User } from '@modules/users/entities/user'

export enum CategoryType {
	RECEIPT = 'RECEIPT',
	INCOME = 'INCOME',
}

interface Props {
	userId: string
	transactionId: string | null
	type: CategoryType
	name: string
	subcategoryOf: string | null
	createdAt: Date
	updatedAt: Date
	deletedAt: Date | null
	user: User | null
	transactions: Transaction[]
}

export class Category extends Entity<Props> {
	get userId(): string {
		return this.props.userId
	}

	set userId(userId: string) {
		this.props.userId = userId
	}

	get transactionId(): string | null {
		return this.props.transactionId
	}

	set transactionId(transactionId: string | null) {
		this.props.transactionId = transactionId
	}

	get type(): CategoryType {
		return this.props.type
	}

	set type(type: CategoryType) {
		this.props.type = type
	}

	get name(): string {
		return this.props.name
	}

	set name(name: string) {
		this.props.name = name
	}

	get subcategoryOf(): string | null {
		return this.props.subcategoryOf
	}

	set subcategoryOf(subcategoryOf: string | null) {
		this.props.subcategoryOf = subcategoryOf
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

	get transactions(): Transaction[] {
		return this.props.transactions
	}

	set transactions(transactions: Transaction[]) {
		this.props.transactions = transactions
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
