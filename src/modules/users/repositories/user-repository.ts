import { IFindManyDTO } from '@modules/users/dtos/find-many-dto'
import { User } from '@modules/users/entities/user'

export interface UsersRepository {
  findById(id: string): Promise<User | null>
  findByDocument(document: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  findByPhone(phone: string): Promise<User | null>
  findMany({ pageIndex, role }: IFindManyDTO): Promise<User[]>
  save(user: User): Promise<void>
  remove(id: string): Promise<void>
}
