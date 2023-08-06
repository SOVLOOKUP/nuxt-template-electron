<template>
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
            <Icon name="line-md:loading-twotone-loop" />
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
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

const { $trpc } = useNuxtApp()
const item = defineProps<UnPromisify<ReturnType<typeof $trpc.bilibili.list.query>>[number]>()

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

const toggle = async (account: { status: string; id: string; }) => {
  if (account.status === 'Running') {
    await $trpc.bilibili.stop.mutate(account.id)
  } else {
    await $trpc.bilibili.start.mutate({ id: account.id })
  }
}

const logout = async (id: string) => {
  await $trpc.bilibili.logout.mutate(id)
}
</script>
