import type { FastifyReply, FastifyRequest } from 'fastify'

import { PrismaUserMapper } from '@modules/users/repositories/prisma/mappers/prisma-user-mapper'

import { prisma } from '@shared/infra/database/prisma'

export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
	try {
		await request.accessVerify({ onlyCookie: true })

		const userId = request.user?.sub
		if (!userId) {
			throw new Error('Token inválido, usuário não encontrado.')
		}

		const user = await prisma.user.findUnique({
			where: {
				id: userId,
			},
		})

		if (!user) {
			reply.status(401).send({
				code: 'auth.authorization',
				error: 'unauthorized',
				message: 'Acesso não autorizado',
				data: [],
			})
			return
		}

		request.user = {
			data: PrismaUserMapper.toDomain(user),
			sub: user.id,
			role: user.role,
		}

		reply.status(204)
	} catch (error) {
		reply.status(401).send({
			code: 'authenticate.missing_authorization_cookie',
			error: 'Unauthorized',
			message: 'error.message',
			status: 401,
			data: {},
		})
	}
}
