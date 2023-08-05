import { router } from '../trpc'
import bilibili from './bilibili'

export const appRouter = router({
  bilibili,
})

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter
