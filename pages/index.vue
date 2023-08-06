<script setup lang="ts">
import dayjs from 'dayjs'
const { $trpc } = useNuxtApp()
const accounts = await useAsyncData(() => $trpc.bilibili.list.query())

const add = async () => {
  await $trpc.bilibili.login.mutate()
  await accounts.execute()
}

const toggle = async (account: { status: string; id: string; }) => {
  if (account.status === 'Running') {
    await $trpc.bilibili.stop.mutate(account.id)
  } else {
    await $trpc.bilibili.start.mutate({ id: account.id })
  }
  await accounts.execute()
}

const logout = async (id: string) => {
  await $trpc.bilibili.logout.mutate(id)
  await accounts.execute()
}

const statusTag: {
  [key: string]: 'success' | 'warning' | 'error'
} = {
  Running: 'success',
  Paused: 'warning',
  Error: 'error'
}

const statusShow: {
  [key: string]: string
} = {
  Running: '正在运行',
  Paused: '暂停运行',
  Error: '发生错误'
}
</script>

<template>
  <div>
    <n-button @click="add">
      登录新账号
    </n-button>
    <n-list>
      <n-list-item v-for="item in accounts.data.value" :key="item.id">
        <n-card>
          <template #header>
            <div class="flex">
              <n-avatar round size="large" :src="item.avatar ?? ''" />
              <n-tooltip trigger="hover">
                <template #trigger>
                  <span class="pl-2 flex-self-center">
                    {{ item.name }}
                  </span>
                </template>
                ID: {{ item.id }}
              </n-tooltip>
            </div>
          </template>
          <template #header-extra>
            <n-space class="flex">
              <n-button circle type="success" text @click="toggle(item)">
                <n-icon size="40">
                  <Icon
                    :name="item.status === 'Running' ? 'material-symbols:pause-circle-rounded' : 'material-symbols:play-circle-rounded'"
                  />
                </n-icon>
              </n-button>
              <n-button circle type="warning" text @click="logout(item.id)">
                <n-icon size="40">
                  <Icon name="material-symbols:cancel" />
                </n-icon>
              </n-button>
            </n-space>
          </template>
          <n-space>
            <n-tag :bordered="false" type="primary">
              类型: {{ item.type }}
            </n-tag>
            <n-tag :bordered="false" type="info">
              活动时间: {{ dayjs(item.updated_at).fromNow() }}
            </n-tag>
            <n-tag :bordered="false" :type="statusTag[item.status]">
              {{ statusShow[item.status] }}
            </n-tag>
          </n-space>
        </n-card>
      </n-list-item>
    </n-list>
  </div>
</template>
