import { procedure, router } from '../trpc'
import { blogin } from '../lib/bilibili'

export default router({
  login: procedure.query(blogin),
})
