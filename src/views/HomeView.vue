<script setup>
import FirstScreen from '@components/FirstScreen.vue';
import AppTrade from '@components/AppTrade.vue';
import { useStore } from 'vuex';

const { authorized } = useStore().state.user;

</script>

<template>
  <AppTrade v-if="authorized" />
  <FirstScreen v-else />
</template>
