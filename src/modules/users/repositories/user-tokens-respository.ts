import type { UserToken } from '@modules/users/entities/user-token'

export interface UserTokensRepository {
	findByToken(token: string): Promise<UserToken | null>
	create(userToken: UserToken): Promise<void>
	save(userToken: UserToken): Promise<void>
}
