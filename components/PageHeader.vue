<template>
  <n-page-header
    class="px-2"
  >
    <template #avatar>
      <n-icon size="30">
        <Icon name="fa6-solid:carrot" />
      </n-icon>
    </template>
    <template #title>
      Template
    </template>

    <template #extra>
      <n-space style="-webkit-app-region: no-drag;">
        <n-button circle text @click="$trpc.ctrl.min.mutate()">
          <n-icon size="30">
            <Icon name="solar:minus-circle-line-duotone" />
          </n-icon>
        </n-button>
        <n-button circle text @click="$trpc.ctrl.max.mutate()">
          <n-icon size="30">
            <Icon name="solar:quit-full-screen-circle-line-duotone" />
          </n-icon>
        </n-button>
        <n-button circle text @click="$trpc.ctrl.close.mutate()">
          <n-icon size="30">
            <Icon name="solar:close-circle-line-duotone" />
          </n-icon>
        </n-button>
      </n-space>
    </template>
  </n-page-header>
</template>
<script setup lang="ts">
const { $trpc } = useNuxtApp()
</script>
