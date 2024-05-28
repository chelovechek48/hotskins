<script setup>
import FirstScreen from '@components/FirstScreen.vue';
import Trade from '@views/TradeView.vue';
import { useStore } from 'vuex';

const { authorized } = useStore().state.user;

</script>

<template>
  <Trade v-if="authorized" />
  <FirstScreen v-else />
</template>

<style lang="scss" scoped>

</style>
