<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AppFilter from '@components/AppFilter.vue';

import gamesList from '@/assets/data/games.json';

const route = useRoute();
const router = useRouter();

const filterProperties = {
  game: ref(route.query.game || localStorage.getItem('selected-game') || gamesList[0].id),
  rarity: ref(route.query.rarity ? route.query.rarity.split(',') : []),
  search: ref(route.query.search || undefined),
};
const updateFilterProperties = () => {
  router.replace({
    query: {
      game: filterProperties.game.value,
      rarity: filterProperties.rarity.value.join(',') || undefined,
      search: filterProperties.search.value || undefined,
    },
  });
};

const changeFilter = (changedValue) => {
  const [key, value] = Object.entries(changedValue)[0];
  filterProperties[key].value = value;

  const hasGameChanged = key === 'game';
  if (hasGameChanged) {
    filterProperties.rarity.value = [];
    filterProperties.search.value = undefined;

    localStorage.setItem('selected-game', value);
  }

  updateFilterProperties();
};

</script>

<template>
  <main>
    <AppFilter
      :games="gamesList"
      :properties="filterProperties"
      @changeFilter="changeFilter($event)"
    />
  </main>
</template>

<style lang="scss" scoped>
:root * {
  --color-common: #b0c3d9;
  --color-uncommon: #5e98d9;
  --color-rare: #4b69ff;
  --color-mythical: #8847ff;
  --color-immortal: #e4ae39;
  --color-legendary: #d32ce6;
  --color-arcana: #ade55c;

  --color-consumer-grade: #b0c3d9;
  --color-mil-spec-grade: #4b69ff;
  --color-industrial-grade: #5e98d9;
  --color-restricted: #8847ff;
  --color-classified: #d32ce6;
  --color-covert: #eb4b4b;
}
</style>
