import { IFindUserByIdDTO } from '@modules/users/dtos/find-user-by-id-dto'
import { IFindManyUsersDTO } from '@modules/users/dtos/find-many-users-dto'
import { User } from '@modules/users/entities/user'

export interface UsersRepository {
  findById({ userId }: IFindUserByIdDTO): Promise<User | null>
  findByDocument(document: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  findByPhone(phone: string): Promise<User | null>
  findMany({ pageIndex, role }: IFindManyUsersDTO): Promise<User[]>
  create(user: User): Promise<void>
  save(user: User): Promise<void>
  remove({ userId }: IFindUserByIdDTO): Promise<void>
}
