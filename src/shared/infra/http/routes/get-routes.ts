import { existsSync, readdir, readdirSync } from 'node:fs'
import { join } from 'node:path'

import { env } from '@shared/infra/config/env'

type Output = string[] | undefined | null

export async function getRoutes(): Promise<Output> {
	/**
	 * Check if the environment is production
	 * If it is, the basePath will be the root of the project
	 * If it is not, the basePath will be the root of the dist folder
	 *
	 * node: __dirname: /usr/src/app/dist/shared/infra/http
	 * tsx: __dirname: /usr/src/app/src/shared/infra/http/routes
	 */

	const isProduction = env.NODE_ENV === 'production'

	const basePath = isProduction
		? join(__dirname, '..', '..', '..')
		: join(__dirname, '..', '..', '..', '..')
	const directoryPath = join(basePath, 'modules')

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
