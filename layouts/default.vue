<template>
  <n-layout position="absolute" embedded style="-webkit-app-region: drag;">
    <n-layout-header position="absolute" bordered class="pa-2 h-14">
      <PageHeader />
    </n-layout-header>
    <n-layout-content class="pa-2 top-14 position-absolute w-screen bottom-0" :native-scrollbar="false">
      <n-card style="-webkit-app-region: no-drag;">
        <slot />
      </n-card>
    </n-layout-content>
  </n-layout>
</template>
