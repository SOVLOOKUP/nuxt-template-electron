<template>
  <n-config-provider :theme="darkTheme">
    <n-message-provider>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </n-message-provider>
    <n-global-style />
  </n-config-provider>
</template>

<script setup lang="ts">
import { extend, locale } from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
import { darkTheme } from 'naive-ui'
extend(relativeTime)
locale('zh-cn')

const windowSize = useWindowSizeStore()

windowSize.windowHeight = globalThis.innerHeight
windowSize.windowWidth = globalThis.innerWidth

onNuxtReady(() => globalThis.addEventListener('resize', windowSize.resize))
</script>
