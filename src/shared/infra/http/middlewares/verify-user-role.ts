import type { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyUserRole<T extends string>(roles: Array<T>) {
	return async (request: FastifyRequest, reply: FastifyReply) => {
		const role = request.user.role

		if (typeof role === 'string' && roles.includes(role as T)) {
			return undefined
		}
		return reply.status(401).send({
			code: 'auth.authorization',
			error: 'unauthorized',
			message: 'Acesso não autorizado',
			data: [],
		})
	}
}
