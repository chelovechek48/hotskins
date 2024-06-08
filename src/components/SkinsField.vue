<script setup>
import { ref, computed } from 'vue';
import skinsList from '@/assets/data/skins.json';
import SvgTemplate from '@components/SvgTemplate.vue';
import ImgTemplate from '@components/ImgTemplate.vue';

const emit = defineEmits(['changeSkins']);
const props = defineProps({
  gamesId: {
    type: Array,
    required: true,
  },
  properties: {
    type: Object,
    required: true,
  },
});

const getTimer = (futureDateString) => {
  // const currentDate = new Date();
  const currentDate = new Date('June 1, 2024 00:00:00');
  const futureDate = new Date(futureDateString);

  const timeDifference = futureDate.getTime() - currentDate.getTime();

  const seconds = Math.floor((timeDifference / 1000) % 60);
  const minutes = Math.floor((timeDifference / 1000 / 60) % 60);
  const hours = Math.floor((timeDifference / 1000 / 60 / 60) % 24);
  const days = Math.floor(timeDifference / 1000 / 60 / 60 / 24);

  if (days > 0) {
    return `${days} д. ${hours} ч.`;
  }
  if (hours > 0) {
    return `${hours} ч. ${minutes} м.`;
  }
  if (minutes > 0 || seconds > 0) {
    return `${minutes} м. ${seconds} с.`;
  }
  return false;
};

const skins = computed(() => skinsList.filter((skin) => {
  const filterGame = props.properties.game.value;
  const filterRarity = props.properties.rarity.value;
  const filterSearch = props.properties.search.value;

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

const selectedSkins = ref(
  props.gamesId.reduce((acc, game) => {
    acc[game] = [];
    return acc;
  }, {}),
);

</script>

<template>
  <ul class="card__list page-container">
    <li v-for="skin in skins" :key="skin.pattern.en">
      <input
        type="checkbox" name="скин" :id="skin.pattern.en"
        class="card__input"
        :disabled="getTimer(skin['trade-ban'])"
        :value="skin.pattern.en"
        v-model="selectedSkins[skin.game]"
        @change="emit('changeSkins', selectedSkins)"
      >
      <!-- <input
        type="checkbox" name="скин" :id="`${skin.slot.en || skin.slot}-${skin.pattern.en}`"
        class="card__input"
        :disabled="getTimer(skin['trade-ban'])"
        :checked="selectedSkins.includes(`${skin.slot.en || skin.slot}-${skin.pattern.en}`)"
      > -->
      <label
        :for="skin.pattern.en"
        class="card"
        :style="`color: var(--color-${skin.rarity})`"
      >
        <div class="card__top">
          <header class="card__label">
            <span class="card__label-weapon">
              {{ skin.slot.ru || skin.slot }}
            </span>
            <span class="card__label-pattern">
              {{ skin.pattern.ru || skin.pattern.en }}
            </span>
          </header>
          <ImgTemplate
            class="card__image"
            :src="skin.image"
          />
          <SvgTemplate
            class="card__icon-trade"
            icon-id="trade"
          />
        </div>
        <span class="card__price">
          {{
            new Intl.NumberFormat('ru-RU', {
              style: 'currency',
              currency: 'RUB',
              minimumFractionDigits: 0,
            })
              .format(skin.price)
          }}
        </span>

        <div
          v-if="getTimer(skin['trade-ban'])"
          class="card__trade-status card__trade-status_locked"
        >
          <SvgTemplate
            class="card__icon-clock"
            icon-id="clock"
          />
          <span>{{ getTimer(skin['trade-ban']) }}</span>
        </div>
        <span
          v-else
          class="card__trade-status"
        >
          Обменять
        </span>
      </label>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
@use '@vars/colors';

.card {
  cursor: pointer;
  transition:
    background-color 200ms ease,
    border-color 50ms ease;
  &__list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
    gap: 1rem;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.75rem;
  border-radius: 0.75rem;

  position: relative;
  &::after {
    content: '';
    position: absolute;
    left: calc(50% - 1.5rem);
    bottom: 0;
    width: 3rem;
    height: 0.4rem;
    background-color: currentColor;
    border-radius: 15% 15% 0% 0% / 100% 100% 0% 0%;
    box-shadow: 0 0 5px 0 currentColor;
  }

  &__top {
    width: 100%;
    position: relative;
  }

  &__input {
    position: absolute;
    opacity: 0;
  }

  &__input:not(:disabled) + & {
    background-color: colors.$blue-gray-medium;
  }
  &__input:not(:checked) + & {
    border: 2px solid colors.$blue-gray-medium;
  }
  &__input:checked + & {
    border: 2px solid colors.$gold;
  }
  &__input:disabled + &,
  &__input:focus-visible + & {
    background-color: colors.$blue-gray-dark;
  }
  @media (hover: hover) {
    &__input:hover + & {
      background-color: colors.$blue-gray-dark;
    }
  }

  &__input:focus-visible + & {
    outline: auto;
  }

  &__label {
    z-index: 3;
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    text-align: center;

    transition: opacity 200ms ease;
    opacity: 0;

    &-weapon {
      font-size: 1.125rem;
      color: colors.$gold;
      font-weight: 500;
    }
    &-pattern {
      font-size: 1rem;
      color: colors.$white;
      font-weight: 400;
    }
  }

  @media (hover: hover) {
    &__input:hover + & &__label {
      opacity: 1;
    }
  }
  &__input:focus-visible + & &__label {
    opacity: 1;
  }

  &__image {
    z-index: 2;
    position: relative;
    width: 100%;
    aspect-ratio: 4/3;
    object-fit: contain;

    opacity: 1;
    transition: opacity 200ms ease;
  }
  @media (hover: hover) {
    &__input:hover + & &__image {
      opacity: 0.5;
    }
  }
  &__input:focus-visible + & &__image {
    opacity: 0.5;
  }

  &__icon {
    &-clock {
      max-width: 1.125em;
    }
    &-trade {
      z-index: 1;
      height: 100%;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      transition: opacity 200ms ease;
    }
  }
  &__input:not(:checked) + & &__icon-trade {
    opacity: 0;
  }
  &__input:checked + & &__icon-trade {
    opacity: 0.5;
  }

  &__price {
    color: colors.$white;
    font-size: 1.25rem;
    font-weight: 500;
    text-align: center;
  }

  &__trade-status {
    transition: color 200ms ease;
    &_locked {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5em;
    }
  }

  &__input:not(:checked) + & &__trade-status {
    color: colors.$gray;
  }
  &__input:checked + & &__trade-status {
    color: colors.$gold;
  }
}
</style>
