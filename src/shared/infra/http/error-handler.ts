import { FastifyInstance } from 'fastify'
import { ZodError } from 'zod'

import { app } from '@shared/infra/http/app'
import { env } from '@shared/infra/config/env'
import { AppError } from '@core/domain/errors/app-error'

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = async (
  error,
  request,
  reply,
) => {
  /* Capture error in production */
  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    console.error(error)
    app.Sentry.captureException(error)
  }

  /* Zod */
  if (error instanceof ZodError) {
    const zodErrorDetails = error.flatten()
    const fieldErrors = zodErrorDetails.fieldErrors
    const firstErrorField = Object.keys(fieldErrors)[0]
    const errorMessages: string[] = fieldErrors[firstErrorField] ?? []
    const primaryErrorMessage = errorMessages[0] ?? ''

    return reply.status(400).send({
      code: 'schema.validation',
      error: primaryErrorMessage,
      message: primaryErrorMessage,
      data: error.format(),
    })
  }

  /* AppError */
  if (error instanceof AppError) {
    return reply.status(error.status).send({
      code: error.code,
      error: error.error,
      message: error.message,
      data: error.data,
    })
  }

  /* Rate limite */
  if (error instanceof Error && error.statusCode === 429) {
    console.log('Rate limit exceeded - User: ', request.user.sub ?? '')

    return reply.status(429).send({
      code: 'rate.limit_exceeded',
      error: error.message,
      message: error.message,
      data: [],
    })
  }

  /* Default */
  return reply.status(500).send({
    code: 'internal.server_error',
    error: 'Internal server error.',
    message: 'Internal server error.',
    data: [],
  })
}
