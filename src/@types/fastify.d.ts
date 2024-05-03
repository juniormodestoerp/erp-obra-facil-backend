import 'fastify'

import { FastifyJWT } from '@fastify/jwt'

declare module 'fastify' {
  interface FastifyInstance {
    accessJwt: FastifyJWT
    refreshJwt: FastifyJWT
    accessVerify: FastifyJWT['jwtVerify']
    refreshVerify: FastifyJWT['jwtVerify']
  }

  interface FastifyRequest {
    accessVerify: FastifyJWT['jwtVerify']
    refreshVerify: FastifyJWT['jwtVerify']
  }

  interface FastifyReply {
    accessSign: FastifyJWT['jwtSign']
    refreshSign: FastifyJWT['jwtSign']
  }
}
