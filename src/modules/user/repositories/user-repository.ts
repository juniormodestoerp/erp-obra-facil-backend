import { User } from '@modules/user/entities/user'

export interface UserRepository {
  findById(userId: string): Promise<User | undefined>
  findByDocument(document: string): Promise<User | undefined>
  findByEmail(email: string): Promise<User | undefined>
  findByPhone(phone: string): Promise<User | undefined>
  create(user: User): Promise<void>
  // save(user: User): Promise<void>
  // delete(userId: string): Promise<void>
}
