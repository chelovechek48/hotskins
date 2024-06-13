<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AppFilter from '@components/AppFilter.vue';
import SkinsField from '@components/SkinsField.vue';
import AppCart from '@components/AppCart.vue';

import gamesList from '@/assets/data/games.json';
import skinsList from '@/assets/data/skins.json';

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

const skins = computed(() => skinsList.filter((skin) => {
  const filterGame = filterProperties.game.value;
  const filterRarity = filterProperties.rarity.value;
  const filterSearch = filterProperties.search.value;

  const skinLocalization = Object.entries(skin.pattern).map((pattern) => {
    const lang = pattern[0];
    return {
      slot: skin.slot[lang] || skin.slot,
      pattern: skin.pattern[lang],
    };
  });

  const searchTags = [
    ...skinLocalization.map((skinName) => `${skinName.slot} ${skinName.pattern}`),
    ...skinLocalization.map((skinName) => `${skinName.slot} | ${skinName.pattern}`),
  ];

  const filterKeys = {
    game: skin.game === filterGame,
    rarity: !filterRarity.length || filterRarity.includes(skin.rarity),
    search: searchTags.find((tag) => tag.toLowerCase().includes(filterSearch.toLowerCase())),
  };

  const hasOnlyTrueKeys = Object.values(filterKeys).every((value) => value);
  return hasOnlyTrueKeys;
}));
const selectedSkins = ref([]);

</script>

<template>
  <main class="trade">
    <AppFilter
      :games="gamesList"
      :properties="filterProperties"
      @changeFilter="changeFilter($event)"
    />
    <div class="page-container">
      <SkinsField
        list-style="grid"
        :skins="skins"
        :selected="selectedSkins"
      />
    </div>
    <AppCart
      :selected-skins="selectedSkins"
      @resetSelected="selectedSkins.length = 0"
    >
      <SkinsField
        list-style="inline"
        :skins="selectedSkins"
        :selected="selectedSkins"
      />
    </AppCart>
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
