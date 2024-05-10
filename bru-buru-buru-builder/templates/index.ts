import { pluralize } from '../utils/pluralize'
import { getFindByIdDTO, getFindManyDTO } from './dtos'

export function templates(module: string) {
  return [
    {
      path: `dtos/find-${module}-by-id-dto.ts`,
      content: getFindByIdDTO(module),
    },
    {
      path: `dtos/find-many-${pluralize(module)}-dto.ts`,
      content: getFindManyDTO(module),
    },
  ]
}
