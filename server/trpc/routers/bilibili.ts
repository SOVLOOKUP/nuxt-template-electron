import type { Buffer } from 'node:buffer'
import { z } from 'zod'
import { BiliCredential, Login, Message, User } from 'bilicaptain'
import { BrowserWindow } from 'electron'
import { Cron, scheduledJobs } from 'croner'
import durationPlg from 'dayjs/plugin/duration'
import { extend, locale } from 'dayjs'
import { procedure, router } from '../trpc'
import { consola, prisma } from '../context'

extend(durationPlg)
locale('zh')

// console.log(
//   dayjs.duration(11115000).seconds(),
//   dayjs.duration(11115000).minutes(),
//   dayjs.duration(11115000).hours()
// )

const lg = () =>
  new Promise<{
    name: string;
    avatar: string;
    token: {
      SESSDATA: string;
      bili_jct: string;
    };
  }>((resolve, reject) => {
    let token
    const win = new BrowserWindow({
      autoHideMenuBar: true,
      width: 512,
      height: 256
    })
    Login.loginQR('buffer', async (c) => {
      const u = new User(
        new BiliCredential(c.cookie.SESSDATA, c.cookie.bili_jct)
      )
      const info = await u.myInfo()
      token = {
        name: info.name,
        avatar: info.face,
        token: c.cookie
      }
      win.close()
      resolve(token)
    }).then(async (v) => {
      await win.loadURL(
        `data:image/png;base64,${(v as Buffer).toString('base64')}`
      )
      win.setTitle('请使用哔哩哔哩客户端扫码登录')
    }).catch(reject)
  })

const st = async (token: {
  SESSDATA: string;
  bili_jct: string;
}) => {
  const msg = new Message(new BiliCredential(token.SESSDATA, token.bili_jct))
  const unRead = await msg.unreadMsgFeed()
  const rp = await msg.replys()
  const unReadItems = rp.items.slice(0, unRead.reply)
  return unReadItems
}
const bilibili = router({
  login: procedure.input(z.string().uuid().optional()).mutation(
    async ({ ctx, input }) => {
      // 登录
      const info = await lg()
      // 记录 token
      if (input) {
        return await ctx.prisma.account.update({
          where: {
            id: input
          },
          data: {
            name: info.name,
            avatar: info.avatar,
            token: JSON.stringify(info.token)
          }
        })
      } else {
        return await ctx.prisma.account.create({
          data: {
            type: 'bilibili',
            name: info.name,
            avatar: info.avatar,
            token: JSON.stringify(info.token)
          }
        })
      }
    }
  ),
  list: procedure.query(async ({ ctx }) => {
    return await ctx.prisma.account.findMany()
  }),
  start: procedure.input(z.object({
    id: z.string().uuid(),
    interval: z.object({
      s: z.number(),
      m: z.number(),
      h: z.number()
    }).default({
      s: 15,
      m: 0,
      h: 0
    })
  })).mutation(async ({ ctx, input }) => {
    const log = ctx.consola.create({}).withTag(input.id)
    const account = await ctx.prisma.account.findUnique({
      where: {
        id: input.id
      }
    })
    if (account) {
      const parse = (n: number) => n === 0 ? '*' : `*/${n}`
      const s = (input.interval.m + input.interval.h) > 0
        ? '0'
        : parse(input.interval.s)
      const m = input.interval.h > 0 ? '0' : parse(input.interval.m)
      const h = parse(input.interval.h)
      const pattern = `${s} ${m} ${h} * * *`
      log.info('运行间隔:', pattern)

      const fetchNewRecords = async () => {
        const newRecord = await st(JSON.parse(account.token))
        log.info('新的消息:', newRecord)
        if (newRecord.length > 0) {
          await ctx.prisma.record.updateMany({
            data: newRecord.map(i => ({
              accountId: input.id,
              data: JSON.stringify(i)
            }))
          })
        }
      }
      await fetchNewRecords()

      Cron(pattern, fetchNewRecords, {
        name: account.id,
        catch: async (e) => {
          log.error('发生错误:', e)
          await ctx.prisma.account.update({
            where: {
              id: input.id
            },
            data: {
              status: 'Error'
            }
          })
        }
      })

      await ctx.prisma.account.update({
        where: {
          id: input.id
        },
        data: {
          status: 'Running'
        }
      })
    }
  }),
  stop: procedure.input(z.string().uuid()).mutation(async ({ input, ctx }) => {
    scheduledJobs.filter(job => job.name === input).at(0)?.stop()
    await ctx.prisma.account.update({
      where: {
        id: input
      },
      data: {
        status: 'Paused'
      }
    })
  }),
  logout: procedure.input(z.string().uuid()).mutation(
    async ({ ctx, input }) => {
      scheduledJobs.filter(job => job.name === input).at(0)?.stop()
      await ctx.prisma.account.delete({
        where: {
          id: input
        }
      })
    }
  )
});

// 继续任务
(
  async () => {
    const bili = bilibili.createCaller({ prisma, consola })
    const accounts = await bili.list()
    for (const account of accounts) {
      if (account.status === 'Running') {
        await bili.start({ id: account.id })
      }
    }
  }
)()

export default bilibili
