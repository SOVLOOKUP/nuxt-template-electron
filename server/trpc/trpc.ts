import { initTRPC } from '@trpc/server'
import type { Context } from './context'

// You can use any variable name you like.
// We use t to keep things simple.
const t = initTRPC.context<Context>().create()

const { router, middleware, procedure } = t

export { router, middleware, procedure }
