import { FastifyReply, FastifyRequest } from 'fastify'
// import { User as UserPrisma } from '@prisma/client'

import { User } from '@modules/user/entities/user'
import { PrismaUserMapper } from '@modules/user/repositories/prisma/mappers/prisma-user-mapper'
import { prisma } from '@shared/infra/database/prisma'
import { RedisCache } from '@shared/infra/providers/cache/redis'

export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify()

    const cache = RedisCache.getInstance()

    const userCached = false // await cache.get<UserPrisma>(`user:${request.user.sub}`)
    let user: User | undefined

    if (!userCached) {
      const userPrisma = await prisma.user.findUnique({
        where: {
          id: request.user.sub,
        },
      })

      if (userPrisma) {
        await cache.set(
          `user:${request.user.sub}`,
          JSON.stringify(userPrisma),
          60 * 10, // 10 minutes cache
        )
        user = PrismaUserMapper.toDomain(userPrisma)
      }
    } else {
      // user = PrismaUserMapper.toDomain(userCached)
    }

    if (!user) {
      console.log('1')

      return reply.status(401).send({
        code: 'auth.authorization',
        error: 'unauthorized',
        message: 'Acesso não autorizado',
        data: [],
      })
    }

    if (!(user instanceof User)) {
      console.log('2')

      return reply.status(401).send({
        code: 'auth.authorization',
        error: 'unauthorized',
        message: 'Acesso não autorizado',
        data: [],
      })
    }

    request.user.data = user
  } catch (err) {
    console.log('3')

    return reply.status(401).send({
      code: 'auth.authorization',
      error: 'unauthorized',
      message: 'Acesso não autorizado',
      data: [],
    })
  }
}
