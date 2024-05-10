import { capitalize } from '../utils/capitalize'
import { pluralize } from '../utils/pluralize'

export function getFindByIdDTO(module: string): string {
  return `
    export interface IFind${capitalize(module)}ByIdDTO {
      id: string;
      userId: string;
    }
  `
}

export function getFindManyDTO(module: string): string {
  return `
    export interface IFindMany${capitalize(pluralize(module))}DTO {
      pageIndex: number;
      userId: string;
    }
  `
}
