import '@fastify/jwt'

import { User } from '@modules/users/entities/user'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      role: string
      sub: string
      data: User
    }
  }
}
