import fastify from 'fastify'
import fastifyIO from "fastify-socket.io";
import { PORT } from './config.js'
import cors from '@fastify/cors'

const server = fastify({
  logger: true,
})

server.register(cors, {
  origin: true,
})

server.register(fastifyIO, {
  cors: {
    origin: "*",
  }
});


server.get("/", (req, reply) => {
  server.io.emit("hello");
  reply.send("Hello world!");
});


server.ready(err => {
  if (err) throw err
  server.io.on("connection", (socket) => {
    console.log("new user")

    socket.on("message", (message) => {
      socket.broadcast.emit("message", {
        from: socket.id,
        body: message
      })
    })

    socket.on("disconnect", (socket) => {
      console.log("user disconnected")
    })
  })
})

server.listen({ port: PORT })