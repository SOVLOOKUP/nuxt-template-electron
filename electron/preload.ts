import { contextBridge, ipcRenderer } from 'electron'
import type { IpcRequest } from 'utils/types'

contextBridge.exposeInMainWorld('api', {
  trpc: (req: IpcRequest) => ipcRenderer.invoke('trpc', req)
})
