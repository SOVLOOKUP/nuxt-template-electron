<script setup lang="ts">
const { $trpc } = useNuxtApp()
const accounts = await useAsyncData(() => $trpc.bilibili.list.query())
const message = useMessage()

const add = async () => {
  try {
    await $trpc.bilibili.login.mutate()
    message.success('账号登录成功')
  } catch (error) {
    if ((error as Error).message.endsWith('(`id`)')) {
      message.warning('账号已登录')
    }
  }
  await accounts.execute()
}

const refresh = async () => await accounts.execute()
</script>

<template>
  <div>
    <n-list>
      <n-list-item>
        <n-card class="flex flex-items-center">
          <n-button circle text @click="add">
            <n-icon size="40">
              <Icon name="solar:add-circle-line-duotone" />
            </n-icon>
          </n-button>
        </n-card>
      </n-list-item>

      <n-list-item v-for="item in accounts.data.value" :key="item.id">
        <AccountCard :item="item" :refresh="refresh" />
      </n-list-item>
    </n-list>
  </div>
</template>
