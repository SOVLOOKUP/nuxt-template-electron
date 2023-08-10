import { BrowserWindow } from 'electron'
import { procedure, router } from '../trpc'

const ctrl = router({
  close: procedure.mutation(() => BrowserWindow.getFocusedWindow()?.close()),
  min: procedure.mutation(() => BrowserWindow.getFocusedWindow()?.minimize()),
  max: procedure.mutation(() => BrowserWindow.getFocusedWindow()?.maximize())
})

export default ctrl
