<script setup lang="ts">
const { $trpc } = useNuxtApp()

const accounts = await useAsyncData(() => $trpc.bilibili.list.query())

</script>

<template>
  <div>
    <button @click="$trpc.bilibili.login.mutate()">
      getIMG
    </button>
    {{ accounts.data }}
  </div>
</template>
