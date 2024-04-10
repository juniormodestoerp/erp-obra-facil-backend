import { existsSync, readdir, readdirSync } from 'fs'
import { join } from 'path'

type Output = string[] | null | undefined

export async function getRoutes(): Promise<Output> {
  const directoryPath = join(__dirname, '..', '..', '..', '..', 'modules')

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
