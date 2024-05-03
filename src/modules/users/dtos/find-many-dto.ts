import { UserRole } from '@modules/users/entities/user'

export interface IFindManyDTO {
  pageIndex: number
  role?: UserRole
  deletedAt?: Date | null
}
