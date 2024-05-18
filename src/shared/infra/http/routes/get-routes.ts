import { existsSync, readdir, readdirSync } from 'node:fs'
import { join } from 'node:path'

type Output = string[] | undefined | null

export async function getRoutes(): Promise<Output> {
  const directoryPath = join(__dirname, '..', '..', '..', '..', 'modules')
  // ? join(__dirname, '..', '..', '..', 'modules') // production
  // : join(__dirname, '..', '..', '..', '..', 'modules') // development

  const modulesRoutes = await new Promise((resolve) => {
    readdir(directoryPath, { withFileTypes: true }, (err, files) => {
      if (err) {
        console.error('Error reading modules directory', err)
        return undefined
      }

      const routes = files
        .filter((file) => file.isDirectory())
        .map((file) => {
          const module = join(directoryPath, file.name, 'http')
          if (existsSync(module)) {
            const route = readdirSync(module).find((file) =>
              file.includes('routes'),
            )

            if (route) {
              return join(module, route)
            }
          }

          return null
        })
        .filter((files) => files !== null)

      resolve(routes)
    })
  })

  return modulesRoutes as Output
}
