import { File } from '@modules/file/entities/file'

export interface FileRepository {
  findById(id: string): Promise<File | undefined>
  create(file: File): Promise<File>
}
