import { Entity } from '@core/domain/entities/entity'
import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { Optional } from '@core/domain/types/opcional'

interface Props {
  key: string
  name: string
  contentType: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export class File extends Entity<Props> {
  get key(): string {
    return this.props.key
  }

  set key(key: string) {
    this.props.key = key
  }

  get name(): string {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get contentType(): string {
    return this.props.contentType
  }

  set contentType(contentType: string) {
    this.props.contentType = contentType
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
    props: Optional<Props, 'createdAt' | 'updatedAt'>,
    id?: UniqueEntityID,
  ): File {
    return new File(
      {
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
        ...props,
      },
      id,
    )
  }
}
