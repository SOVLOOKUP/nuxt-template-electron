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
        <n-button circle :type="item.status === 'Running' ? 'warning' : 'success'" text @click="toggle(item)">
          <n-icon size="40">
            <Icon
              v-if="!loading"
              :name="item.status === 'Running' ? 'solar:pause-circle-line-duotone' : 'solar:play-circle-line-duotone'"
            />
            <Icon v-else name="line-md:loading-twotone-loop" />
          </n-icon>
        </n-button>
        <n-button circle text @click="logout(item.id)">
          <n-icon size="40">
            <Icon name="solar:close-circle-line-duotone" />
          </n-icon>
        </n-button>
      </n-space>
    </template>
    <n-space>
      <n-tag :bordered="false" type="primary">
        类型: {{ item.type }}
      </n-tag>
      <n-tag :bordered="false" type="info">
        活动时间: {{ dayjs(item.updatedAt).fromNow() }}
      </n-tag>
      <n-tag :bordered="false" :type="statusTag[item.status]">
        {{ statusShow[item.status] }}
      </n-tag>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

interface Item {
  id: string;
  type: string;
  status: string; // 'Running' | 'Paused' | 'Error'
  updatedAt: string;
  name: string | null;
  avatar: string | null;
  token: string;
}
const loading = ref(false)
const { $trpc } = useNuxtApp()
const props = defineProps<{ item: Item, refresh:() => Promise<void> }>()
const item = ref(({ ...props }).item)

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
  loading.value = true
  if (account.status === 'Running') {
    item.value = await $trpc.bilibili.stop.mutate(account.id)
  } else {
    item.value = await $trpc.bilibili.start.mutate({ id: account.id }) as Item
  }
  loading.value = false
}

const logout = async (id: string) => {
  await $trpc.bilibili.logout.mutate(id)
  await props.refresh()
}
</script>
