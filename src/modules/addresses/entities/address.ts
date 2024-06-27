import { Entity } from '@core/domain/entities/entity'
import type { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import type { Optional } from '@core/domain/types/opcional'

import type { User } from '@modules/users/entities/user'

interface Props {
	userId: string
	zipCode: string
	state: string
	city: string
	neighborhood: string
	street: string
	number: string
	complement: string
	createdAt: Date
	updatedAt: Date
	deletedAt: Date | null

	user: User | null
}

export class Address extends Entity<Props> {
	get userId(): string {
		return this.props.userId
	}

	set userId(userId: string) {
		this.props.userId = userId
	}

	get zipCode(): string {
		return this.props.zipCode
	}

	set zipCode(zipCode: string) {
		this.props.zipCode = zipCode
	}

	get state(): string {
		return this.props.state
	}

	set state(state: string) {
		this.props.state = state
	}

	get city(): string {
		return this.props.city
	}

	set city(city: string) {
		this.props.city = city
	}

	get neighborhood(): string {
		return this.props.neighborhood
	}

	set neighborhood(neighborhood: string) {
		this.props.neighborhood = neighborhood
	}

	get street(): string {
		return this.props.street
	}

	set street(street: string) {
		this.props.street = street
	}

	get number(): string {
		return this.props.number
	}

	set number(number: string) {
		this.props.number = number
	}

	get complement(): string {
		return this.props.complement
	}

	set complement(complement: string) {
		this.props.complement = complement
	}

	get createdAt(): Date {
		return this.props.createdAt
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

	static create(
		props: Optional<Props, 'createdAt' | 'updatedAt' | 'deletedAt' | 'user'>,
		id?: UniqueEntityID,
	): Address {
		return new Address(
			{
				...props,
				createdAt: props.createdAt ?? new Date(),
				updatedAt: props.updatedAt ?? new Date(),
				deletedAt: props.deletedAt ?? null,
				user: props.user ?? null,
			},
			id,
		)
	}
}
