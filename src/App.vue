<script setup>
import NavigationPanel from '@components/NavigationPanel.vue';
</script>

<template>
  <div class="page">
    <NavigationPanel />
    <router-view class="page-container" />
  </div>
</template>

<style lang="scss">
@forward '@styles';
@use '@vars/colors';
@use '@vars/breakpoints' as *;

body {
  // background-color: colors.$blue-gray;
}
.page {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}
.page-container {
  width: 100%;
  max-width: $container;
  margin-inline: auto;
  padding-inline: $container-padding;
}
</style>
