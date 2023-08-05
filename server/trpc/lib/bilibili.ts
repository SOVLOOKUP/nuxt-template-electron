import type { Buffer } from 'node:buffer'
import type { BiliCredential } from 'bilicaptain'
import { Login } from 'bilicaptain'

let bkey: BiliCredential

export function blogin() {
  return new Promise((resolve, reject) =>
    Login.loginQR('buffer', c => bkey = c).catch(reject).then(v => resolve(`data:image/png;base64,${(v as Buffer).toString('base64')}`)),
  )
}
