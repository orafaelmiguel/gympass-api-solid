import fastify from 'fastify'
import { appRoutes } from './http/routes'
import { ZodError } from 'zod'
import { env } from './env'

const app = fastify()

app.register(appRoutes)

app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
        return reply
            .status(400)
            .send({ message: 'Validation Error.', issues: error.format() })
    } 

    if (env.NODE_ENV != 'production') {
        console.error(error)
    } else {
        // To do: HERE WE SHOULD LOG TO AN EXTERNAL TOOL
    }

    return reply.status(500).send({ message: 'Internal Server Error' })
})

export { app }