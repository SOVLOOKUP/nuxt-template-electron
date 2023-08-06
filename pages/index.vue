<script setup lang="ts">
const { $trpc } = useNuxtApp()
const accounts = await useAsyncData(() => $trpc.bilibili.list.query())

const add = async () => {
  await $trpc.bilibili.login.mutate()
  await accounts.execute()
}
</script>

<template>
  <div>
    <n-button @click="add">
      登录新账号
    </n-button>
    <n-list>
      <n-list-item v-for="item in accounts.data.value" :key="item.id">
        <AccountCard v-bind="item" />
      </n-list-item>
    </n-list>
  </div>
</template>
