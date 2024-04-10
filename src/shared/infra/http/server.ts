import { env } from '@shared/infra/config/env'
import { app } from '@shared/infra/http/app'

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log('🔥 HTTP Server Running!')
  })
