import { inferAsyncReturnType } from '@trpc/server'
import type { H3Event, H3EventContext } from 'h3'

export function createContext (event: Partial<H3Event>) {
  return event.context as H3EventContext
}

export type Context = inferAsyncReturnType<typeof createContext>
