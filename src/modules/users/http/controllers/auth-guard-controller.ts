import { FastifyReply, FastifyRequest } from 'fastify'

export async function authGuardController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  return reply.status(204).send()
}
