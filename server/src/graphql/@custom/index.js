/**
 * @custom GraphQL Server Setup for Taplio Alt
 *
 * Uses Apollo Server 4 with Express integration.
 * Supports queries, mutations, and WebSocket subscriptions.
 */
const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')
const { PubSub } = require('graphql-subscriptions')
const { json } = require('express')

const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const logger = require('../../lib/@system/Logger')
const db = require('../../lib/@system/PostgreSQL')

// In-memory PubSub for subscriptions (swap with Redis PubSub for multi-instance)
const pubsub = new PubSub()

/**
 * Extract authenticated user from request.
 * Re-uses the same JWT verification as REST auth middleware.
 */
async function getUserFromToken(token) {
  if (!token) return null
  try {
    const jwt = require('../../lib/@system/JWT')
    const decoded = jwt.verify(token)
    if (!decoded || !decoded.sub) return null
    const user = await db.oneOrNone('SELECT id, email, name, role FROM users WHERE id = $1', [decoded.sub])
    return user
  } catch {
    return null
  }
}

/**
 * Extract token from request (Authorization header or cookie).
 */
function extractToken(req) {
  // Check Authorization header first
  const authHeader = req.headers?.authorization
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7)
  }
  // Fall back to cookie
  return req.cookies?.token || null
}

/**
 * Initialize GraphQL server and attach to Express app + HTTP server.
 *
 * @param {import('express').Application} app - Express app
 * @param {import('http').Server} httpServer - HTTP server for WebSocket subscriptions
 */
async function setupGraphQL(app, httpServer) {
  const schema = makeExecutableSchema({ typeDefs, resolvers })

  // ── WebSocket server for subscriptions ─────────────────────────────────
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  })

  const serverCleanup = useServer(
    {
      schema,
      context: async (ctx) => {
        // Extract token from connection params
        const token = ctx.connectionParams?.Authorization?.replace('Bearer ', '') ||
                      ctx.connectionParams?.token
        const user = await getUserFromToken(token)
        return { db, user, pubsub }
      },
      onConnect: async (ctx) => {
        logger.info('GraphQL WebSocket client connected')
      },
      onDisconnect: () => {
        logger.info('GraphQL WebSocket client disconnected')
      },
    },
    wsServer
  )

  // ── Apollo Server ──────────────────────────────────────────────────────
  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        // Drain WebSocket server on shutdown
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            },
          }
        },
      },
    ],
    introspection: process.env.NODE_ENV !== 'production' || process.env.GRAPHQL_INTROSPECTION === 'true',
  })

  await server.start()

  // ── Mount at /graphql ──────────────────────────────────────────────────
  app.use(
    '/graphql',
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token = extractToken(req)
        const user = await getUserFromToken(token)
        return { db, user, pubsub, req }
      },
    })
  )

  logger.info('GraphQL endpoint available at /graphql')
  logger.info('GraphQL subscriptions available via WebSocket at ws://*/graphql')

  return { server, pubsub }
}

module.exports = { setupGraphQL, pubsub }
