<template>
  <n-page-header
    class="px-2"
  >
    <!-- <div  class="w-screen top-0 h-14 fixed -z-6" /> -->
    <template #avatar>
      <n-icon size="30">
        <Icon name="fa6-solid:carrot" />
      </n-icon>
    </template>
    <template #title>
      萝卜互动
    </template>

    <template #extra>
      <n-space style="-webkit-app-region: no-drag;">
        <n-button circle text>
          <n-icon size="30">
            <Icon name="solar:minus-circle-line-duotone" />
          </n-icon>
        </n-button>
        <n-button circle text>
          <n-icon size="30">
            <Icon name="solar:quit-full-screen-circle-line-duotone" />
          </n-icon>
        </n-button>
        <n-button circle text>
          <n-icon size="30">
            <Icon name="solar:close-circle-line-duotone" />
          </n-icon>
        </n-button>
      </n-space>
    </template>
  </n-page-header>
</template>
<script setup lang="ts">
</script>
