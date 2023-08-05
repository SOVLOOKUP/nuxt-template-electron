import path from 'node:path'
import process from 'node:process'
import type { inferAsyncReturnType } from '@trpc/server'
import { app } from 'electron'
import { PrismaClient } from '@prisma/client'

const isProduction = app.isPackaged
const dbPath =
  isProduction
    ? `file:${path.join(app.getPath('userData'), 'app.db')}`
    : process.env.DATABASE_URL

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
// eslint-disable-next-line require-await
export async function createContext () {
  return {
    prisma: new PrismaClient({
      log: isProduction
        ? ['error']
        : ['query', 'info', 'error', 'warn'],
      datasources: {
        db: {
          url: dbPath
        }
      }
    })
  }
}

export type Context = inferAsyncReturnType<typeof createContext>
