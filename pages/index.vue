<script setup lang="ts">
const { $trpc } = useNuxtApp()

const loginCode = useState('code', () => '')
</script>

<template>
  <button @click="async () => loginCode = await $trpc.bilibili.login.query()">
    getIMG
  </button>

  <img :src="loginCode">
</template>
