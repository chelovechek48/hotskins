<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AppFilter from '@components/AppFilter.vue';
import SkinsField from '@components/SkinsField.vue';

import gamesList from '@/assets/data/games.json';

const route = useRoute();
const router = useRouter();

const filterProperties = {
  game: ref(route.query.game || localStorage.getItem('selected-game') || gamesList[0].id),
  rarity: ref(route.query.rarity ? route.query.rarity.split(',') : []),
  search: ref(route.query.search || ''),
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
    filterProperties.search.value = '';

    localStorage.setItem('selected-game', value);
  }

  updateFilterProperties();
};

const selectedSkins = ref([]);
</script>

<template>
  <main class="trade">
    <AppFilter
      :games="gamesList"
      :properties="filterProperties"
      @changeFilter="changeFilter($event)"
    />
    <SkinsField
      :games-id="gamesList.map((game) => game.id)"
      :properties="filterProperties"
      @changeSkins="selectedSkins.value = $event"
    />
  </main>
</template>

<style lang="scss" scoped>

.trade {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

:root * {
  --color-weapon: #f15840;
  --color-misc: #35a3f1;
  --color-clothing: #a7ec2e;
  --color-armor: #a7ec2e;
  --color-resource: #ffffff;

  --color-consumer-grade: #b0c3d9;
  --color-mil-spec-grade: #4b69ff;
  --color-industrial-grade: #5e98d9;
  --color-restricted: #8847ff;
  --color-classified: #d32ce6;
  --color-covert: #eb4b4b;
}
</style>
