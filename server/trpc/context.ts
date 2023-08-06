import path from 'node:path'
import process from 'node:process'
import type { inferAsyncReturnType } from '@trpc/server'
import { app } from 'electron'
import { PrismaClient } from '@prisma/client'
import { consola } from 'consola'
export { consola }
const isProduction = app.isPackaged
const dbPath =
  isProduction
    ? `file:${path.join(app.getPath('userData'), 'app.db')}`
    : process.env.DATABASE_URL

export const prisma = new PrismaClient({
  log: isProduction
    ? ['error']
    : ['info', 'error', 'warn'],
  datasources: {
    db: {
      url: dbPath
    }
  }
})

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
// eslint-disable-next-line require-await
export async function createContext () {
  return {
    prisma,
    consola
  }
}

export type Context = inferAsyncReturnType<typeof createContext>
