const path = require('path')
const dotenv = require('dotenv')
const http = require('http')

process.env.NODE_ENV = process.env.NODE_ENV || 'test'

dotenv.config({ path: path.resolve(__dirname, '..', '.env.test') })

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = 'postgresql://postgres:postgres@localhost:5432/product_template_test'
}

// Supertest starts ephemeral servers with host 0.0.0.0 by default.
// In sandboxed environments this can fail with EPERM, so force loopback.
const originalListen = http.Server.prototype.listen
http.Server.prototype.listen = function patchedListen(...args) {
  if (typeof args[0] === 'number' && args.length === 1) {
    return originalListen.call(this, args[0], '127.0.0.1')
  }

  if (typeof args[0] === 'number' && typeof args[1] === 'function') {
    return originalListen.call(this, args[0], '127.0.0.1', args[1])
  }

  if (typeof args[0] === 'object' && args[0] && !args[0].host) {
    args[0] = { ...args[0], host: '127.0.0.1' }
  }

  return originalListen.apply(this, args)
}
