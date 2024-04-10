import { Entity } from '@core/domain/entities/entity'
import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { Document } from '@core/domain/entities/value-object/document'
import { Optional } from '@core/domain/types/opcional'
import { Email } from '@core/domain/entities/value-object/email'

interface Props {
  name: string
  document: Document
  password: string
  email: Email
  phone: string
  role?: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
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

  get role(): string | undefined {
    return this.props.role
  }

  set role(role: string | undefined) {
    this.props.role = role
  }

  get createdAt(): Date | undefined {
    return this.props.createdAt
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt
  }

  set updatedAt(updatedAt: Date | undefined) {
    this.props.updatedAt = updatedAt
  }

  get deletedAt(): Date | undefined {
    return this.props.deletedAt
  }

  set deletedAt(deletedAt: Date | undefined) {
    this.props.deletedAt = deletedAt
  }

  static create(
    props: Optional<Props, 'role' | 'createdAt' | 'updatedAt'>,
    id?: UniqueEntityID,
  ): User {
    return new User(
      {
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
        role: props.role ?? 'USER',
        ...props,
      },
      id,
    )
  }
}
