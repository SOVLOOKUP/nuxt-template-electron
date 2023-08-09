import { router } from '../trpc'
import bilibili from './bilibili'
import ctrl from './ctrl'

export const appRouter = router({
  bilibili,
  ctrl
})

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter
