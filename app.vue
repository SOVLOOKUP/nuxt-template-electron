<template>
  <n-message-provider>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </n-message-provider>
</template>

<script setup lang="ts">
import { extend, locale } from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
extend(relativeTime) // +
locale('zh-cn')
</script>
