import { Entity } from '@core/domain/entities/entity'
import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { Document } from '@core/domain/entities/value-object/document'
import { Optional } from '@core/domain/types/opcional'
import { Email } from '@core/domain/entities/value-object/email'

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

interface Props {
  name: string
  document: Document
  password: string
  email: Email
  phone: string
  role: UserRole
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

  set document(document: string) {
    this.props.document = new Document(document, 'CPF')
  }

  get email(): Email {
    return this.props.email
  }

  set email(email: string) {
    this.props.email = new Email(email)
  }

  get password(): string {
    return this.props.password
  }

  set password(password: string) {
    this.props.password = password
  }

  get phone(): string {
    return this.props.phone
  }

  set phone(phone: string) {
    this.props.phone = phone
  }

  get role(): UserRole {
    return this.props.role
  }

  set role(role: UserRole) {
    this.props.role = role
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

  get deletedAt(): Date | undefined | null {
    return this.props.deletedAt
  }

  set deletedAt(deletedAt: Date | undefined | null) {
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
