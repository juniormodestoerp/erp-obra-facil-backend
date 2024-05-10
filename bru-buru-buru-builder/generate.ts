import { closeSync, mkdirSync, openSync, writeSync } from 'fs'
import { join } from 'path'

import { templates } from './templates'
import { pluralize } from './utils/pluralize'

// Define the base module name and variations
const module = 'futebol'

const baseDirectoryPath = join(__dirname, '..', 'src', 'modules', module)

// Create directory structure
const directories = [
  'dtos',
  'entities',
  'http/controllers',
  'http/view-models',
  'jobs',
  'repositories/prisma/mappers',
  'repositories/prisma/repositories',
  'use-cases/{factories}',
].map((directory) => {
  return join(baseDirectoryPath, directory.replace(/{/g, '').replace(/}/g, ''))
})

directories.forEach((directory) => {
  mkdirSync(directory, { recursive: true })
})

// Create TypeScript files
const files = [
  `dtos/find-${module}-by-id-dto.ts`,
  `dtos/find-many-${pluralize(module)}-dto.ts`,
  // `entities/${module}.ts`,
  // `http/controllers/fetch-${pluralize(module)}-controller.ts`,
  // `http/controllers/remove-${pluralize(module)}-controller.ts`,
  // `http/controllers/save-${pluralize(module)}-controller.ts`,
  // `http/controllers/show-${pluralize(module)}-controller.ts`,
  // `http/view-models/${pluralize(module)}-view-model.ts`,
  // `http/routes.ts`,
  // `jobs/.gitkeep`,
  // `repositories/${pluralize(module)}-repository.ts`,
  // `repositories/prisma/mappers/prisma-${pluralize(module)}-mapper.ts`,
  // `repositories/prisma/repositories/${pluralize(module)}-repository.ts`,
  // `use-cases/factories/make-fetch-${pluralize(module)}-factory.ts`,
  // `use-cases/factories/make-remove-${pluralize(module)}-factory.ts`,
  // `use-cases/factories/make-save-${pluralize(module)}-factory.ts`,
  // `use-cases/factories/make-show-${pluralize(module)}-factory.ts`,
  // `use-cases/fetch-${pluralize(module)}-use-case.ts`,
  // `use-cases/remove-${pluralize(module)}-use-case.ts`,
  // `use-cases/save-${pluralize(module)}-use-case.ts`,
  // `use-cases/show-${pluralize(module)}-use-case.ts`,
]

const templatesMap = templates(module).reduce((acc, template) => {
  acc[template.path.replace('*', module)] = template.content
  return acc
}, {})

files.forEach((file) => {
  const filePath = join(baseDirectoryPath, file)
  if (templatesMap[file]) {
    const openedFile = openSync(filePath, 'w')
    writeSync(openedFile, templatesMap[file])
    closeSync(openedFile)
  }
})

console.log(
  `Structure and files for module ${module} have been created successfully!`,
)
