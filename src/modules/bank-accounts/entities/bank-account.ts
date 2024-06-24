import { Entity } from '@core/domain/entities/entity'
import type { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import type { Optional } from '@core/domain/types/opcional'

import type { Transaction } from '@modules/transactions/entities/transaction'
import type { User } from '@modules/users/entities/user'

interface Props {
	userId: string
	name: string
	currency: string
	logo: string
	initialBalance: number
	createdAt: Date
	updatedAt: Date
	deletedAt: Date | null
	user: User | null
	transactions: Transaction[]
}

export class BankAccount extends Entity<Props> {
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

	get currency(): string {
		return this.props.currency
	}

	set currency(currency: string) {
		this.props.currency = currency
	}

	get logo(): string {
		return this.props.logo
	}

	set logo(logo: string) {
		this.props.logo = logo
	}

	get initialBalance(): number {
		return this.props.initialBalance
	}

	set initialBalance(initialBalance: number) {
		this.props.initialBalance = initialBalance
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
	): BankAccount {
		return new BankAccount(
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
