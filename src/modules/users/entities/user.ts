import { Entity } from '@core/domain/entities/entity'
import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { Document } from '@core/domain/entities/value-object/document'
import { Email } from '@core/domain/entities/value-object/email'
import { Optional } from '@core/domain/types/opcional'

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

interface Props {
  name: string
  document: Document
  email: Email
  phone: string
  birthDate: Date
  password: string
  role: UserRole
  status: string
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date | null
}

export class User extends Entity<Props> {
  get name(): string {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get document(): Document {
    return this.props.document
  }

  set document(document: Document) {
    this.props.document = document
  }

  get email(): Email {
    return this.props.email
  }

  set email(email: Email) {
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

  get updatedAt(): Date {
    return this.props.updatedAt
  }

  set updatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt
  }

  get deletedAt(): Date | null | undefined {
    return this.props.deletedAt
  }

  set deletedAt(deletedAt: Date | null | undefined) {
    this.props.deletedAt = deletedAt
  }

  static create(
    props: Optional<Props, 'createdAt' | 'updatedAt' | 'deletedAt'>,
    id?: UniqueEntityID,
  ): User {
    return new User(
      {
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
        deletedAt: props.deletedAt ?? null,
        ...props,
      },
      id,
    )
  }
}
