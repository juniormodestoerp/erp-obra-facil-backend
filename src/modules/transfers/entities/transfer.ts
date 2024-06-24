import { Entity } from '@core/domain/entities/entity'
import type { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import type { Optional } from '@core/domain/types/opcional'

import type { TransferOption } from '@modules/transactions/entities/transfer-options'

interface Props {
  name: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
  transferOption: TransferOption[]
}

export class Transfer extends Entity<Props> {
  get name(): string {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
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

  get transferOption(): TransferOption[] {
    return this.props.transferOption
  }

  set transferOption(transferOption: TransferOption[]) {
    this.props.transferOption = transferOption
  }

  static create(
    props: Optional<Props, 'createdAt' | 'updatedAt' | 'deletedAt'>,
    id?: UniqueEntityID,
  ): Transfer {
    return new Transfer(
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
