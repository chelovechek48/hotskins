<script setup>
import {
  ref, computed, onMounted, onUnmounted,
} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AppFilter from '@components/AppFilter.vue';
import SkinsField from '@components/SkinsField.vue';
import AppCart from '@components/AppCart.vue';

import gamesList from '@/assets/data/games.json';
import skinsJson from '@/assets/data/skins.json';

const root = document.querySelector(':root');
onMounted(() => {
  root.style.setProperty('--scrollbar-gutter', 'stable');
});
onUnmounted(() => {
  root.style.setProperty('--scrollbar-gutter', 'auto');
});

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
  const entries = Object.entries(changedValue);
  entries.forEach((el) => {
    const key = el[0];
    const value = el[1];
    filterProperties[key].value = value;
  });

  updateFilterProperties();
};

const skinsList = ref(skinsJson);
const skins = computed(() => skinsList.value.filter((skin) => {
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

const resetSelectedSkins = () => {
  selectedSkins.value.length = 0;
};
const changeSkinsList = () => {
  const newSkinsList = skinsList.value.map((item) => {
    const skin = item;
    const isSelectedSkin = selectedSkins.value.includes(skin);
    if (isSelectedSkin) {
      skin['trade-ban'] = true;
    }
    return skin;
  });
  skinsList.value = newSkinsList;
  resetSelectedSkins();
};

</script>

<template>
  <main class="trade">
    <AppFilter
      :games="gamesList"
      :properties="filterProperties"
      @changeFilter="changeFilter($event)"
    />
    <p
      v-show="skins.length === 0"
      class="trade__empty page-container"
    >
      По вашему запросу не нашлось ни одного совпадения. Вы можете
      <button
        class="trade__empty-button" @click="changeFilter({
          search: '',
          rarity: [],
        })"
      >
        сбросить фильтр.
      </button>
    </p>
    <div class="page-container">
      <SkinsField
        list-style="grid"
        :skins="skins.length ? skins : skinsJson"
        :selected="selectedSkins"
      />
    </div>
    <AppCart
      :selected-skins="selectedSkins"
      @resetSelected="resetSelectedSkins()"
      @tradeSkins="changeSkinsList()"
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
@use '@vars/colors';
@use '@vars/keyframes';

.trade {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &__empty {
    color: colors.$gray;
    font-size: clamp(1.25rem, 2vw, 1.5rem);
    text-align: center;

    animation: text-shake 500ms linear;

    &-button {
      color: colors.$gold;
      background-color: transparent;
      font-size: inherit;
    }
  }
}

:root * {
  --color-weapon: #f15840;
  --color-misc: #35a3f1;
  --color-clothing: #a7ec2e;
  --color-armor: #a7ec2e;
  --color-resource: #ffffff;

  --color-ширпотреб: #b0c3d9;
  --color-армейское: #4b69ff;
  --color-промышленное: #5e98d9;
  --color-запрещенное: #8847ff;
  --color-засекреченное: #d32ce6;
  --color-тайное: #eb4b4b;
}
</style>
