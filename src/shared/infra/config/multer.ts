/* eslint-disable @typescript-eslint/no-explicit-any */
import path from 'path'
import { existsSync, mkdirSync } from 'node:fs'
import multer from 'fastify-multer'
import { env } from '@shared/infra/config/env'

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
  ? path.join(__dirname, '..', '..', '..')
  : path.join(__dirname, '..', '..', '..', '..')
const directoryPath = path.join(basePath, 'uploads')

if (!existsSync(directoryPath)) {
  mkdirSync(directoryPath, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, directoryPath)
  },
  filename: (req, file, cb) => {
    const uniqueIdentifier = import('nanoid')
    cb(null, `${file.fieldname}-${uniqueIdentifier}${file.originalname}`)
  },
})

const fileFilter = (
  req: any,
  file: any,
  cb: (error: Error | null, acceptFile: boolean) => void,
) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/gif'
  ) {
    cb(null, true)
  } else {
    cb(new Error('O arquivo deve estar no formato .png, .jpg ou .gif.'), false)
  }
}

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },
})
