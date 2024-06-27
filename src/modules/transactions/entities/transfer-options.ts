import { Entity } from '@core/domain/entities/entity'
import type { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import type { Optional } from '@core/domain/types/opcional'

import type { Transfer } from '@modules/transfers/entities/transfer'

interface Props {
	transactionId: string
	transferId: string
	sourceAccount: string
	destinationAccount: string
	createdAt: Date
	updatedAt: Date
	deletedAt: Date | null
	transfer: Transfer | null
}

export class TransferOption extends Entity<Props> {
	get transactionId(): string {
		return this.props.transactionId
	}

	set transactionId(transactionId: string) {
		this.props.transactionId = transactionId
	}

	get transferId(): string {
		return this.props.transferId
	}

	set transferId(transferId: string) {
		this.props.transferId = transferId
	}

	get sourceAccount(): string {
		return this.props.sourceAccount
	}

	set sourceAccount(sourceAccount: string) {
		this.props.sourceAccount = sourceAccount
	}

	get destinationAccount(): string {
		return this.props.destinationAccount
	}

	set destinationAccount(destinationAccount: string) {
		this.props.destinationAccount = destinationAccount
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

	get transfer(): Transfer | null {
		return this.props.transfer
	}

	set transfer(transfer: Transfer | null) {
		this.props.transfer = transfer
	}

	static create(
		props: Optional<Props, 'createdAt' | 'updatedAt' | 'deletedAt'>,
		id?: UniqueEntityID,
	): TransferOption {
		return new TransferOption(
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
