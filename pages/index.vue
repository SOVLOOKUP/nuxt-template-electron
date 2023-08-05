<script setup lang="ts">
const { $trpc } = useNuxtApp()

const accounts = await useAsyncData(() => $trpc.bilibili.list.query())

</script>

<template>
  <div>
    <n-button @click="$trpc.bilibili.login.mutate()">
      getIMG
    </n-button>
    <n-list hoverable clickable>
      <n-list-item v-for="item in accounts.data.value" :key="item.id">
        {{ item }}
        <n-avatar
          round
          size="small"
          :src="item.avatar??''"
        />
      </n-list-item>
    </n-list>
  </div>
</template>
