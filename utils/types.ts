export interface IpcRequest {
  body: any
  headers: any
  method: string
  url: string
}

export interface IpcResponse {
  body: any
  headers: any
  status: number
}

export interface PortInfo {
  path: string
  manufacturer: string | undefined
  serialNumber: string | undefined
  pnpId: string | undefined
  locationId: string | undefined
  productId: string | undefined
  vendorId: string | undefined
}

export type UnPromisify<T> = T extends Promise<infer U> ? U : T;
