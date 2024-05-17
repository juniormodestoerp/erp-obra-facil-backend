import { FastifyReply, FastifyRequest } from 'fastify'
import { SignOptions } from '@fastify/jwt'

import { AppError } from '@core/domain/errors/app-error'

import { PrismaUserMapper } from '@modules/users/repositories/prisma/mappers/prisma-user-mapper'

import { env } from '@shared/infra/config/env'
import { prisma } from '@shared/infra/database/prisma'

export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
  try {
    const accessToken = request.cookies.accessToken
    const refreshToken = request.cookies.refreshToken

    if (!accessToken) {
      if (!refreshToken) {
        throw new AppError({
          code: 'authenticate.missing_refresh_token_cookie',
        })
      }

      try {
        const decoded = await request.refreshVerify()

        if (!decoded || !decoded.sub) {
          throw new AppError({
            code: 'authenticate.invalid_refresh_token',
          })
        }

        const user = await prisma.user.findUnique({
          where: {
            id: decoded.sub,
          },
        })

        if (!user) {
          throw new AppError({
            code: 'user.not_found',
          })
        }

        const signOptions: SignOptions = {
          expiresIn: '1h',
          sub: user.id,
          notBefore: 0,
        }

        const newAccessToken = await reply.jwtSign(
          { sub: user.id },
          signOptions,
        )

        reply.setCookie('accessToken', newAccessToken, {
          path: '/',
          httpOnly: true,
          secure: env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 3600,
        })

        const domainUser = PrismaUserMapper.toDomain(user)

        request.user = {
          data: domainUser,
          sub: domainUser.id,
          role: domainUser.role,
        }
      } catch (error) {
        throw new AppError({
          code: 'authenticate.invalid_refresh_token',
        })
      }
    } else {
      try {
        await request.accessVerify({ onlyCookie: true })

        const user = await prisma.user.findUnique({
          where: {
            id: request.user.sub,
          },
        })

        if (!user) {
          return reply.status(401).send({
            code: 'auth.authorization',
            error: 'unauthorized',
            message: 'Acesso não autorizado',
            data: [],
          })
        }

        request.user = {
          data: PrismaUserMapper.toDomain(user),
          sub: user.id,
          role: user.role,
        }
      } catch (error) {
        return reply.status(401).send({
          code: 'authenticate.missing_authorization_cookie',
        })
      }
    }

    reply.status(204).send()
  } catch (err) {
    return reply.status(401).send({
      code: 'authenticate.missing_authorization_cookie',
      error: 'error.messag',
      message: 'error.message',
      status: 401,
      data: {},
    })
  }
}
