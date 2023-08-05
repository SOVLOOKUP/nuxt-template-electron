import path from 'node:path'
import process from 'node:process'
import { PrismaClient } from '@prisma/client'
import { app } from 'electron'

const isProduction = app.isPackaged
const dbPath
  = isProduction
    ? `file:${path.join(app.getPath('userData'), 'app.db')}`
    : process.env.DATABASE_URL

export const prisma = new PrismaClient({
  log: isProduction
    ? ['error']
    : ['query', 'info', 'error', 'warn'],
  datasources: {
    db: {
      url: dbPath,
    },
  },
})
