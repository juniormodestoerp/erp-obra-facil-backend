import { FastifyReply, FastifyRequest } from 'fastify'

import { PrismaUserMapper } from '@modules/users/repositories/prisma/mappers/prisma-user-mapper'

import { prisma } from '@shared/infra/database/prisma'

export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.accessVerify({ onlyCookie: true })

    const user = await prisma.user.findUnique({
      where: {
        id: request.user.sub,
      },
      include: {
        settings: true,
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

    request.user.data = PrismaUserMapper.toDomain(user)
    request.user.sub = PrismaUserMapper.toDomain(user).id
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
