import { Entity } from '@core/domain/entities/entity'
import type { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import type { Optional } from '@core/domain/types/opcional'

import type { Address } from '@modules/addresses/entities/address'
import type { Setting } from '@modules/settings/entities/setting'
import type { File } from '@modules/users/entities/file'

export enum UserRole {
	ADMIN = 'ADMIN',
	USER = 'USER',
}

interface Props {
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
}

export class User extends Entity<Props> {
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

	get settings(): Setting[] {
		return this.props.settings
	}

	set settings(settings: Setting[]) {
		this.props.settings = settings
	}

	get files(): File[] {
		return this.props.files
	}

	set files(files: File[]) {
		this.props.files = files
	}

	get address(): Address | null {
		return this.props.address
	}

	set address(address: Address | null) {
		this.props.address = address
	}

	static create(
		props: Optional<
			Props,
			'createdAt' | 'updatedAt' | 'deletedAt' | 'settings' | 'address' | 'files'
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
			},
			id,
		)
	}
}
