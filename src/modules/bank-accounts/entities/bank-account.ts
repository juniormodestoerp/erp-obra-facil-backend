import { Entity } from '@core/domain/entities/entity'
import type { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import type { Optional } from '@core/domain/types/opcional'

import type { Transaction } from '@modules/transactions/entities/transaction'
import type { User } from '@modules/users/entities/user'


export enum LimitType {
	TOTAL = 'TOTAL',
	MONTHLY = 'MONTHLY',
}

interface Props {
  userId: string
  accountType: string
  name: string
  currency: string
  logo: string | null
  limit: number | null
  limitType: LimitType | null
  dueDateDay: string | null
  dueDateFirstInvoice: string | null
  closingDateInvoice: number | null
  balanceFirstInvoice: number | null
  isFirstInvoice: boolean | null
  isCreditCard: boolean | null
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

  get accountType(): string {
    return this.props.accountType
  }

  set accountType(accountType: string) {
    this.props.accountType = accountType
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

  get logo(): string | null {
    return this.props.logo
  }

  set logo(logo: string | null) {
    this.props.logo = logo
  }

  get limit(): number | null {
    return this.props.limit
  }

  set limit(limit: number | null) {
    this.props.limit = limit
  }

  get limitType(): LimitType | null {
    return this.props.limitType
  }

  set limitType(limitType: LimitType | null) {
    this.props.limitType = limitType
  }

  get dueDateDay(): string | null {
    return this.props.dueDateDay
  }

  set dueDateDay(dueDateDay: string | null) {
    this.props.dueDateDay = dueDateDay
  }

  get dueDateFirstInvoice(): string | null {
    return this.props.dueDateFirstInvoice
  }

  set dueDateFirstInvoice(dueDateFirstInvoice: string | null) {
    this.props.dueDateFirstInvoice = dueDateFirstInvoice
  }

  get closingDateInvoice(): number | null {
    return this.props.closingDateInvoice
  }

  set closingDateInvoice(closingDateInvoice: number | null) {
    this.props.closingDateInvoice = closingDateInvoice
  }

  get balanceFirstInvoice(): number | null {
    return this.props.balanceFirstInvoice
  }

  set balanceFirstInvoice(balanceFirstInvoice: number | null) {
    this.props.balanceFirstInvoice = balanceFirstInvoice
  }

  get isFirstInvoice(): boolean | null {
    return this.props.isFirstInvoice
  }

  set isFirstInvoice(isFirstInvoice: boolean | null) {
    this.props.isFirstInvoice = isFirstInvoice
  }

  get isCreditCard(): boolean | null {
    return this.props.isCreditCard
  }

  set isCreditCard(isCreditCard: boolean | null) {
    this.props.isCreditCard = isCreditCard
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