import { Entity } from '@core/domain/entities/entity'
import type { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import type { Optional } from '@core/domain/types/opcional'

import type { Account } from '@modules/accounts/entities/account'
import type { Address } from '@modules/addresses/entities/address'
import type { Category } from '@modules/categories/entities/category'
import type { Center } from '@modules/centers/entities/center'
import type { Method } from '@modules/methods/entities/method'
import type { Setting } from '@modules/settings/entities/setting'
import type { Tag } from '@modules/tags/entities/tag'
import type { Transaction } from '@modules/transactions/entities/transaction'
import type { File } from '@modules/users/entities/file'
import type { UserToken } from '@modules/users/entities/user-token'

export enum UserRole {
	ADMIN = 'ADMIN',
	USER = 'USER',
}

interface Props {
	addressId: string | null
	name: string
	document: string
	email: string
	phone: string
	birthDate: Date
	password: string
	balance: number
	profilePicture: string | null
	role: UserRole
	status: string
	createdAt: Date
	updatedAt: Date
	deletedAt: Date | null

	address: Address | null
	files: File[]
	settings: Setting[]
	tags: Tag[]
	centers: Center[]
	methods: Method[]
	accounts: Account[]
	categories: Category[]
	userTokens: UserToken[]
	transactions: Transaction[]
}

export class User extends Entity<Props> {
	get addressId(): string | null {
		return this.props.addressId
	}

	set addressId(addressId: string | null) {
		this.props.addressId = addressId
	}

	get name(): string {
		return this.props.name
	}

	set name(name: string) {
		this.props.name = name
	}

	get document(): string {
		return this.props.document
	}

	set document(document: string) {
		this.props.document = document
	}

	get email(): string {
		return this.props.email
	}

	set email(email: string) {
		this.props.email = email
	}

	get phone(): string {
		return this.props.phone
	}

	set phone(phone: string) {
		this.props.phone = phone
	}

	get birthDate(): Date {
		return this.props.birthDate
	}

	set birthDate(birthDate: Date) {
		this.props.birthDate = birthDate
	}

	get password(): string {
		return this.props.password
	}

	set password(password: string) {
		this.props.password = password
	}

	get balance(): number {
		return this.props.balance
	}

	set balance(balance: number) {
		this.props.balance = balance
	}

	get profilePicture(): string | null {
		return this.props.profilePicture
	}

	set profilePicture(profilePicture: string | null) {
		this.props.profilePicture = profilePicture
	}

	get role(): UserRole {
		return this.props.role
	}

	set role(role: UserRole) {
		this.props.role = role
	}

	get status(): string {
		return this.props.status
	}

	set status(status: string) {
		this.props.status = status
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

	get address(): Address | null {
		return this.props.address
	}

	set address(address: Address | null) {
		this.props.address = address
	}

	get files(): File[] {
		return this.props.files
	}

	set files(files: File[]) {
		this.props.files = files
	}

	get settings(): Setting[] {
		return this.props.settings
	}

	set settings(settings: Setting[]) {
		this.props.settings = settings
	}

	get tags(): Tag[] {
		return this.props.tags
	}

	set tags(tags: Tag[]) {
		this.props.tags = tags
	}

	get centers(): Center[] {
		return this.props.centers
	}

	set centers(centers: Center[]) {
		this.props.centers = centers
	}

	get methods(): Method[] {
		return this.props.methods
	}

	set methods(methods: Method[]) {
		this.props.methods = methods
	}

	get accounts(): Account[] {
		return this.props.accounts
	}

	set accounts(accounts: Account[]) {
		this.props.accounts = accounts
	}

	get categories(): Category[] {
		return this.props.categories
	}

	set categories(categories: Category[]) {
		this.props.categories = categories
	}

	get userTokens(): UserToken[] {
		return this.props.userTokens
	}

	set userTokens(userTokens: UserToken[]) {
		this.props.userTokens = userTokens
	}

	get transactions(): Transaction[] {
		return this.props.transactions
	}

	set transactions(transactions: Transaction[]) {
		this.props.transactions = transactions
	}

	static create(
		props: Optional<
			Props,
			| 'createdAt'
			| 'updatedAt'
			| 'deletedAt'
			| 'settings'
			| 'address'
			| 'files'
			| 'tags'
			| 'centers'
			| 'methods'
			| 'accounts'
			| 'categories'
			| 'userTokens'
			| 'transactions'
		>,
		id?: UniqueEntityID,
	): User {
		return new User(
			{
				...props,
				createdAt: props.createdAt ?? new Date(),
				updatedAt: props.updatedAt ?? new Date(),
				deletedAt: props.deletedAt ?? null,
				settings: props.settings ?? [],
				files: props.files ?? [],
				address: props.address ?? null,
				tags: props.tags ?? [],
				centers: props.centers ?? [],
				methods: props.methods ?? [],
				accounts: props.accounts ?? [],
				categories: props.categories ?? [],
				userTokens: props.userTokens ?? [],
				transactions: props.transactions ?? [],
			},
			id,
		)
	}
}
