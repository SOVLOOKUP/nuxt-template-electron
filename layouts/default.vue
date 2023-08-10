<template>
  <n-layout position="absolute" embedded>
    <n-layout-header position="absolute" style="-webkit-app-region: drag;" bordered class="pa-2 h-14">
      <PageHeader />
    </n-layout-header>
    <n-layout has-sider class="top-14 position-absolute w-screen bottom-0">
      <n-layout-sider bordered :collapsed="true" collapse-mode="width" :native-scrollbar="false">
        <n-menu :options="menuOptions" />
      </n-layout-sider>

      <n-layout-content class="pa-2" :native-scrollbar="false">
        <n-card>
          <slot />
        </n-card>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script setup lang="tsx">
import { MenuOption } from 'naive-ui'
import { Icon } from '#components'
import { RouterLink } from '#vue-router'

const menuOptions: MenuOption[] = [
  {
    key: '1',
    icon: () => <n-icon size="30" >
      <Icon name="material-symbols:home-app-logo" />
    </n-icon>,
    label: () => <RouterLink to={'/'}>Home</RouterLink>
  }
]
</script>
