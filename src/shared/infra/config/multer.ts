/* eslint-disable @typescript-eslint/no-explicit-any */
import { join } from 'node:path'
import { existsSync, mkdirSync } from 'node:fs'
import multer from 'fastify-multer'

const basePath = join(__dirname, '..', '..', '..', '..', 'uploads')
if (!existsSync(basePath)) {
  mkdirSync(basePath, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, basePath)
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
