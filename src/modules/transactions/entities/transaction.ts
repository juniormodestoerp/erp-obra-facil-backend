import { Entity } from '@core/domain/entities/entity'
import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { Optional } from '@core/domain/types/opcional'

import { User } from '@modules/users/entities/user'
import { Category } from '@modules/categories/entities/category'

interface Props {
  userId: string
  transactionId: string | null
  categoryId: string
  name: string
  description: string | null
  transactionDate: Date
  status: string
  establishmentName: string
  bankName: string
  paymentMethod: string
  previousBalance: number
  totalAmount: number
  currentBalance: number
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null

  // Additional optional configurations
  competencyDate: Date | null
  costCenter: string | null
  tags: string | null
  enablePasswordProtection?: boolean
  installmentConfiguration?: boolean
  includeResidualBalancesInReports?: boolean
  documentNumber: string | null
  enableReceiptExpenseGoals?: boolean
  associatedContracts: string | null
  associatedProjects: string | null
  additionalComments: string | null
  // Additional optional configurations

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

  get transactionId(): string | null {
    return this.props.transactionId
  }

  set transactionId(value: string | null) {
    this.props.transactionId = value
  }

  get categoryId(): string {
    return this.props.categoryId
  }

  set categoryId(value: string) {
    this.props.categoryId = value
  }

  get name(): string {
    return this.props.name
  }

  set name(value: string) {
    this.props.name = value
  }

  get description(): string | null {
    return this.props.description
  }

  set description(value: string | null) {
    this.props.description = value
  }

  get transactionDate(): Date {
    return this.props.transactionDate
  }

  set transactionDate(value: Date) {
    this.props.transactionDate = value
  }

  get status(): string {
    return this.props.status
  }

  set status(value: string) {
    this.props.status = value
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

  get paymentMethod(): string {
    return this.props.paymentMethod
  }

  set paymentMethod(value: string) {
    this.props.paymentMethod = value
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

  get competencyDate(): Date | null {
    return this.props.competencyDate
  }

  set competencyDate(value: Date | null) {
    this.props.competencyDate = value
  }

  get costCenter(): string | null {
    return this.props.costCenter
  }

  set costCenter(value: string | null) {
    this.props.costCenter = value
  }

  get tags(): string | null {
    return this.props.tags
  }

  set tags(value: string | null) {
    this.props.tags = value
  }

  get enablePasswordProtection(): boolean | undefined {
    return this.props.enablePasswordProtection
  }

  set enablePasswordProtection(value: boolean | undefined) {
    this.props.enablePasswordProtection = value
  }

  get installmentConfiguration(): boolean | undefined {
    return this.props.installmentConfiguration
  }

  set installmentConfiguration(value: boolean | undefined) {
    this.props.installmentConfiguration = value
  }

  get includeResidualBalancesInReports(): boolean | undefined {
    return this.props.includeResidualBalancesInReports
  }

  set includeResidualBalancesInReports(value: boolean | undefined) {
    this.props.includeResidualBalancesInReports = value
  }

  get documentNumber(): string | null {
    return this.props.documentNumber
  }

  set documentNumber(value: string | null) {
    this.props.documentNumber = value
  }

  get enableReceiptExpenseGoals(): boolean | undefined {
    return this.props.enableReceiptExpenseGoals
  }

  set enableReceiptExpenseGoals(value: boolean | undefined) {
    this.props.enableReceiptExpenseGoals = value
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
