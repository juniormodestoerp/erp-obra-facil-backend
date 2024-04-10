import { String } from '@core/domain/entities/string'
import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'

export class Entity<Props> extends String {
  private _id: UniqueEntityID
  protected props: Props

  protected constructor(props: Props, id?: UniqueEntityID) {
    super()
    this.props = props
    this._id = id ?? new UniqueEntityID(id)
  }

  get id() {
    return this._id.id
  }
}
