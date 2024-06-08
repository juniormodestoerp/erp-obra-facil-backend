import type { IFindFileByUserIdDTO } from '@modules/users/dtos/find-file-by-user-id-dto'
import type { File } from '@modules/users/entities/file'

export interface UsersFilesRepository {
	findById({ userId }: IFindFileByUserIdDTO): Promise<File | null>
	save(file: File): Promise<void>
	remove({ userId }: IFindFileByUserIdDTO): Promise<void>
}
