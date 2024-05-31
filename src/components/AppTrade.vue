<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import TradeHeader from '@components/TradeHeader.vue';

const route = useRoute();
const router = useRouter();

const gamesList = ['cs:go', 'dota 2'];

const selectedGame = ref(route.query.game || gamesList[0]);

const changeGame = (game) => {
  router.push({ query: { game } });
  selectedGame.value = game;
};

</script>

<template>
  <main class="trade">
    <TradeHeader
      :games="gamesList"
      :current-game="selectedGame"
      @changeGame="changeGame($event)"
    />
  </main>
</template>

<style lang="scss" scoped>
@use '@vars/breakpoints' as *;
@use '@vars/colors';
</style>
