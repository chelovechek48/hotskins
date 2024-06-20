<script setup>
import AppHeader from '@components/AppHeader.vue';
import AppFooter from '@components/AppFooter.vue';
</script>

<template>
  <div class="page">
    <AppHeader />
    <router-view class="page-main" />
    <AppFooter />
  </div>
</template>

<style lang="scss">
@forward '@styles';
@use '@vars/colors';
@use '@vars/breakpoints' as *;
@use '@vars/mixins';

:root {
  --scrollbar-gutter: auto; // or stable
}

html {
  scrollbar-gutter: var(--scrollbar-gutter);
  @include mixins.scrollbar(
    $thumb: colors.$gray,
    $track: colors.$indigo
  );
}

body {
  background-color: colors.$indigo;
}
.page {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}
.page-main {
  flex: 1 1 auto;
  padding-block: 1rem;
}
.page-container {
  width: 100%;
  max-width: $container;
  margin-inline: auto;
  padding-inline: $container-padding;
}
</style>
