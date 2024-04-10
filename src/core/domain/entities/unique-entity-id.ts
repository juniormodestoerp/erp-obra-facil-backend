import { randomUUID } from 'node:crypto'

export class UniqueEntityID {
  private _value: string

  get id() {
    return this._value
  }

  constructor(value?: string) {
    this._value = value ?? randomUUID()
  }
}
