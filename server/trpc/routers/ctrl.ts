import { BrowserWindow } from 'electron'
import { z } from 'zod'
import { procedure, router } from '../trpc'

const ctrl = router({
  close: procedure.input(z.number()).mutation(({ input }) => BrowserWindow.fromId(input)?.close()),
  min: procedure.input(z.number()).mutation(({ input }) => BrowserWindow.fromId(input)?.minimize()),
  max: procedure.input(z.number()).mutation(({ input }) => BrowserWindow.fromId(input)?.maximize())
})

export default ctrl
