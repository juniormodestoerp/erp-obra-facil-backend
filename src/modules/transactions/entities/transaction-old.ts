import { Entity } from '@core/domain/entities/entity'
import type { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import type { Optional } from '@core/domain/types/opcional'

import type { Category } from '@modules/categories/entities/category'
import type { User } from '@modules/users/entities/user'

interface Props {
	userId: string
	fitId: string | null
	name: string
	description: string
	accountType: string
	categoryId: string | null
	categoryName?: string
	establishmentName: string
	bankName: string
	date: Date
	previousBalance: number
	amount: number
	currentBalance: number
	method: string
	competencyDate: Date | null
	costAndProfitCenters: string | null
	tags: string | null
	documentNumber: string | null
	associatedContracts: string | null
	associatedProjects: string | null
	additionalComments: string | null
	status: string
	accountToTransfer: string | null
	contact: string | null
	card: string | null
	createdAt: Date
	updatedAt: Date
	deletedAt?: Date | null

	user?: User
	category?: Category
}

export class Transaction extends Entity<Props> {
	get userId(): string {
		return this.props.userId
	}

	set userId(value: string) {
		this.props.userId = value
	}

	get fitId(): string | null {
		return this.props.fitId
	}

	set fitId(value: string | null) {
		this.props.fitId = value
	}

	get accountType(): string {
		return this.props.accountType
	}

	set accountType(value: string) {
		this.props.accountType = value
	}

	get name(): string {
		return this.props.name
	}

	set name(value: string) {
		this.props.name = value
	}

	get description(): string {
		return this.props.description
	}

	set description(value: string) {
		this.props.description = value
	}

	get categoryId(): string | null {
		return this.props.categoryId
	}

	set categoryId(value: string | null) {
		this.props.categoryId = value
	}

	get categoryName(): string | undefined {
		return this.props.categoryName
	}

	set categoryName(value: string | undefined) {
		this.props.categoryName = value
	}

	get establishmentName(): string {
		return this.props.establishmentName
	}

	set establishmentName(value: string) {
		this.props.establishmentName = value
	}

	get bankName(): string {
		return this.props.bankName
	}

	set bankName(value: string) {
		this.props.bankName = value
	}

	get date(): Date {
		return this.props.date
	}

	set date(value: Date) {
		this.props.date = value
	}

	get previousBalance(): number {
		return this.props.previousBalance
	}

	set previousBalance(value: number) {
		this.props.previousBalance = value
	}

	get amount(): number {
		return this.props.amount
	}

	set amount(value: number) {
		this.props.amount = value
	}

	get currentBalance(): number {
		return this.props.currentBalance
	}

	set currentBalance(value: number) {
		this.props.currentBalance = value
	}

	get method(): string {
		return this.props.method
	}

	set method(value: string) {
		this.props.method = value
	}

	get competencyDate(): Date | null {
		return this.props.competencyDate
	}

	set competencyDate(value: Date | null) {
		this.props.competencyDate = value
	}

	get costAndProfitCenters(): string | null {
		return this.props.costAndProfitCenters
	}

	set costAndProfitCenters(value: string | null) {
		this.props.costAndProfitCenters = value
	}

	get tags(): string | null {
		return this.props.tags
	}

	set tags(value: string | null) {
		this.props.tags = value
	}

	get documentNumber(): string | null {
		return this.props.documentNumber
	}

	set documentNumber(value: string | null) {
		this.props.documentNumber = value
	}

	get associatedContracts(): string | null {
		return this.props.associatedContracts
	}

	set associatedContracts(value: string | null) {
		this.props.associatedContracts = value
	}

	get associatedProjects(): string | null {
		return this.props.associatedProjects
	}

	set associatedProjects(value: string | null) {
		this.props.associatedProjects = value
	}

	get additionalComments(): string | null {
		return this.props.additionalComments
	}

	set additionalComments(value: string | null) {
		this.props.additionalComments = value
	}

	get status(): string {
		return this.props.status
	}

	set status(value: string) {
		this.props.status = value
	}

	get accountToTransfer(): string | null {
		return this.props.accountToTransfer
	}

	set accountToTransfer(value: string | null) {
		this.props.accountToTransfer = value
	}

	get contact(): string | null {
		return this.props.contact
	}

	set contact(value: string | null) {
		this.props.contact = value
	}

	get card(): string | null {
		return this.props.card
	}

	set card(value: string | null) {
		this.props.card = value
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

	get deletedAt(): Date | null | undefined {
		return this.props.deletedAt
	}

	set deletedAt(value: Date | null | undefined) {
		this.props.deletedAt = value
	}

	get user(): User | undefined {
		return this.props.user
	}

	set user(value: User | undefined) {
		this.props.user = value
	}

	get category(): Category | undefined {
		return this.props.category
	}

	set category(value: Category | undefined) {
		this.props.category = value
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
