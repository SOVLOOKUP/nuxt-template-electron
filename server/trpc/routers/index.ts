import { router } from '../trpc'
import ctrl from './ctrl'

export const appRouter = router({
  ctrl
})

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter
