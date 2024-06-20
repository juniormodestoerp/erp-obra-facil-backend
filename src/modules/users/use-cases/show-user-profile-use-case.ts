import { AppError } from '@core/domain/errors/app-error'

import type { User } from '@modules/users/entities/user'
import type { UsersRepository } from '@modules/users/repositories/user-repository'

interface Input {
	userId: string
}

interface Output {
	user: User
}

export class ShowUserProfileUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({ userId }: Input): Promise<Output> {
		const user = await this.usersRepository.findProfile({
			userId,
		})

		if (!user) {
			throw new AppError({
				code: 'user.not_found',
			})
		}

		function getRelativePath(fullPath: string) {
			const srcIndex = fullPath?.indexOf('/src')
			if (srcIndex === -1) {
				throw new Error('O caminho não contém "/src"')
			}
			return fullPath?.substring(srcIndex)
		}

		user.profilePicture = getRelativePath(user?.files[0]?.path)

		return {
			user,
		}
	}
}
