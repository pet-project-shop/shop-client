<script lang="ts" setup>
const layout: Ref<'mobile' | 'default' | 'product' | 'category' | false> = useState('deviceLayout', () => 'default');
</script>

<template>
  <NuxtLoadingIndicator/>
  <NuxtLayout :name="layout">
    <NuxtPage/>
  </NuxtLayout>
</template>
