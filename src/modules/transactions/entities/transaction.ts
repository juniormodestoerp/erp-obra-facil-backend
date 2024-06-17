import { Entity } from '@core/domain/entities/entity'
import type { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import type { Optional } from '@core/domain/types/opcional'

import type { Category } from '@modules/categories/entities/category'
import type { User } from '@modules/users/entities/user'

interface Props {
	userId: string
	fitId: string
	trnType: string
	name: string
	description: string
	accountType: string
	categoryId: string
	categoryName?: string
	establishmentName: string
	bankName: string
	transactionDate: Date
	previousBalance: number
	totalAmount: number
	currentBalance: number
	paymentMethod: string
	competencyDate: Date | null
	costAndProfitCenters: string | null
	tags: string | null
	documentNumber: string | null
	associatedContracts: string | null
	associatedProjects: string | null
	additionalComments: string | null
	status: string
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

	get fitId(): string {
		return this.props.fitId
	}

	set fitId(value: string) {
		this.props.fitId = value
	}

	get accountType(): string {
		return this.props.accountType
	}

	set accountType(value: string) {
		this.props.accountType = value
	}

	get trnType(): string {
		return this.props.trnType
	}

	set trnType(value: string) {
		this.props.trnType = value
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

	get categoryId(): string {
		return this.props.categoryId
	}

	set categoryId(value: string) {
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

	get transactionDate(): Date {
		return this.props.transactionDate
	}

	set transactionDate(value: Date) {
		this.props.transactionDate = value
	}

	get previousBalance(): number {
		return this.props.previousBalance
	}

	set previousBalance(value: number) {
		this.props.previousBalance = value
	}

	get totalAmount(): number {
		return this.props.totalAmount
	}

	set totalAmount(value: number) {
		this.props.totalAmount = value
	}

	get currentBalance(): number {
		return this.props.currentBalance
	}

	set currentBalance(value: number) {
		this.props.currentBalance = value
	}

	get paymentMethod(): string {
		return this.props.paymentMethod
	}

	set paymentMethod(value: string) {
		this.props.paymentMethod = value
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
