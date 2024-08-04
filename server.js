// import { createServer } from 'node:http'

// const server = createServer((request, response) => {
//     response.write('Hello World!')
//     return response.end()
// })

// server.listen(3333) // localhost:3333

import { fastify } from 'fastify'
// import { DatabaseMemory } from './database-memory.js'
import { DatabasePostgres } from './database-postgres.js'

const server = fastify()

const database = new DatabasePostgres()

// GET, POST, PUT, DELETE, PATCH

// Route Parameter

// Request Body

server.post('/videos', async (request, reply) => {
    const { title, description, duration } = request.body

    await database.create({
        title: title,
        description: description,
        duration: duration,
    })

    return reply.status(201).send()
})

// localhost:3333/videos

server.get('/videos', async (request) => {
    const search = request.query.search
    const videos = await database.list(search)

    return videos
})

// localhost:3333/videos/3

server.put('/videos/:id', async (request, reply) => {
    const video_id = request.params.id
    const { title, description, duration } = request.body

    await database.update(video_id, {
        title,
        description,
        duration,
    })

    return reply.status(204).send()
})

server.delete('/videos/:id', async (request, reply) => {
    const video_id = request.params.id

    await database.delete(video_id)

    return reply.status(204).send()
})

server.listen({
    port: process.env.PORT ?? 3333, }
)