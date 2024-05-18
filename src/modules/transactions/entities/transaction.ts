import { Entity } from '@core/domain/entities/entity'
import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { Optional } from '@core/domain/types/opcional'

interface Props {
  transactionId?: string
  userId: string
  name: string
  description?: string
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date | null
}

export class Transaction extends Entity<Props> {
  get transactionId(): string | undefined {
    return this.props.transactionId
  }

  set transactionId(transactionId: string | undefined) {
    this.props.transactionId = transactionId
  }

  get userId(): string {
    return this.props.userId
  }

  set userId(userId: string) {
    this.props.userId = userId
  }

  get name(): string {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get description(): string | undefined {
    return this.props.description
  }

  set description(description: string | undefined) {
    this.props.description = description
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

  set deletedAt(deletedAt: Date | null) {
    this.props.deletedAt = deletedAt
  }

  static create(
    props: Optional<Props, 'createdAt' | 'updatedAt' | 'deletedAt'>,
    id?: UniqueEntityID,
  ): Transaction {
    return new Transaction(
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
