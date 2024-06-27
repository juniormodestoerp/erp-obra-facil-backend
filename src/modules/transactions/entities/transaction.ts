import { Entity } from '@core/domain/entities/entity'
import type { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import type { Optional } from '@core/domain/types/opcional'

import type { Account } from '@modules/accounts/entities/account'
import type { Category } from '@modules/categories/entities/category'
import type { Center } from '@modules/cost-and-profit-centers/entities/cost-and-profit-center'
import type { Method } from '@modules/methods/entities/method'
import type { Tag } from '@modules/tags/entities/tag'
import type { User } from '@modules/users/entities/user'

interface Props {
	userId: string
	accountId: string
	categoryId: string
	centerId: string | null
	methodId: string | null
	type: string
	date: Date
	amount: number
	description: string
	status: string
	card: string | null
	contact: string | null
	project: string | null
	documentNumber: string | null
	notes: string | null
	competenceDate: Date | null
	createdAt: Date
	updatedAt: Date
	deletedAt: Date | null

	user: User | null
	account: Account | null
	category: Category | null
	center: Center | null
	method: Method | null
	tags: Tag[]
}

export class Transaction extends Entity<Props> {
	get userId(): string {
		return this.props.userId
	}

	set userId(value: string) {
		this.props.userId = value
	}

	get accountId(): string {
		return this.props.accountId
	}

	set accountId(value: string) {
		this.props.accountId = value
	}

	get categoryId(): string {
		return this.props.categoryId
	}

	set categoryId(value: string) {
		this.props.categoryId = value
	}

	get centerId(): string | null {
		return this.props.centerId
	}

	set centerId(value: string | null) {
		this.props.centerId = value
	}

	get methodId(): string | null {
		return this.props.methodId
	}

	set methodId(value: string | null) {
		this.props.methodId = value
	}

	get type(): string {
		return this.props.type
	}

	set type(value: string) {
		this.props.type = value
	}

	get date(): Date {
		return this.props.date
	}

	set date(value: Date) {
		this.props.date = value
	}

	get amount(): number {
		return this.props.amount
	}

	set amount(value: number) {
		this.props.amount = value
	}

	get description(): string {
		return this.props.description
	}

	set description(value: string) {
		this.props.description = value
	}

	get status(): string {
		return this.props.status
	}

	set status(value: string) {
		this.props.status = value
	}

	get card(): string | null {
		return this.props.card
	}

	set card(value: string | null) {
		this.props.card = value
	}

	get contact(): string | null {
		return this.props.contact
	}

	set contact(value: string | null) {
		this.props.contact = value
	}

	get project(): string | null {
		return this.props.project
	}

	set project(value: string | null) {
		this.props.project = value
	}

	get documentNumber(): string | null {
		return this.props.documentNumber
	}

	set documentNumber(value: string | null) {
		this.props.documentNumber = value
	}

	get notes(): string | null {
		return this.props.notes
	}

	set notes(value: string | null) {
		this.props.notes = value
	}

	get competenceDate(): Date | null {
		return this.props.competenceDate
	}

	set competenceDate(value: Date | null) {
		this.props.competenceDate = value
	}

	get createdAt(): Date {
		return this.props.createdAt
	}

	set createdAt(value: Date) {
		this.props.createdAt = value
	}

	get updatedAt(): Date {
		return this.props.updatedAt
	}

	set updatedAt(value: Date) {
		this.props.updatedAt = value
	}

	get deletedAt(): Date | null {
		return this.props.deletedAt
	}

	set deletedAt(value: Date | null) {
		this.props.deletedAt = value
	}

	get user(): User | null {
		return this.props.user
	}

	set user(value: User | null) {
		this.props.user = value
	}

	get account(): Account | null {
		return this.props.account
	}

	set account(value: Account | null) {
		this.props.account = value
	}

	get category(): Category | null {
		return this.props.category
	}

	set category(value: Category | null) {
		this.props.category = value
	}

	get center(): Center | null {
		return this.props.center
	}

	set center(value: Center | null) {
		this.props.center = value
	}

	get method(): Method | null {
		return this.props.method
	}

	set method(value: Method | null) {
		this.props.method = value
	}

	get tags(): Tag[] {
		return this.props.tags
	}

	set tags(value: Tag[]) {
		this.props.tags = value
	}

	static create(
		props: Optional<Props, 'createdAt' | 'updatedAt' | 'deletedAt'>,
		id?: UniqueEntityID,
	): Transaction {
		return new Transaction(
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
