import type { FastifyReply, FastifyRequest } from 'fastify'

export async function logoutUserController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	reply.clearCookie('accessToken', {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
	})

	reply.clearCookie('refreshToken', {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
	})

	reply.status(204).send()
}
