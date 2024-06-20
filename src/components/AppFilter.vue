<!-- eslint-disable no-new -->
<script setup>
import { ref, computed, onMounted } from 'vue';
import spritePath from '@icons/sprite-games.svg';
import SvgTemplate from '@components/SvgTemplate.vue';
import Accordion from '@js/accordion.js';

const accordion = ref(null);
onMounted(() => {
  new Accordion(accordion.value);
});

const emit = defineEmits(['changeFilter']);
const props = defineProps({
  games: {
    type: Array,
    required: true,
  },
  properties: {
    type: Object,
    required: true,
  },
});

const rarityList = computed(() => {
  const selectedGameString = props.properties.game.value;
  const selectedGameObject = props.games.find((game) => game.id === selectedGameString);
  return selectedGameObject.rarity;
});

const selectedRarity = ref(props.properties.rarity);

const search = ref(null);
const resetSearch = () => {
  emit('changeFilter', { search: '' });
  search.value.focus();
};

</script>

<template>
  <div class="filter filter__container page-container">
    <section class="filter__game">
      <header class="filter__title">
        Игра
      </header>
      <ul class="filter__game-list filter__item">
        <li
          v-for="game in games" :key="game.id"
          class="filter__game-item"
          :title="game.label"
        >
          <input
            type="radio" name="игра" :id="`filter-game-${game.id}`"
            class="filter__game-input"
            :checked="properties.game.value === game.id"
            @change="emit('changeFilter', {
              game: game.id,
              search: '',
              rarity: []
            })"
          >
          <label class="filter__game-label" :for="`filter-game-${game.id}`">
            <SvgTemplate
              class="filter__game-icon"
              :icon-id="game.id"
              :sprite="spritePath"
            />
          </label>
        </li>
      </ul>
    </section>

    <div class="filter__rarity filter__item">
      <details class="filter__rarity-details" ref="accordion">
        <summary class="filter__rarity-summary filter__item accordion__button">
          Редкость
          <SvgTemplate
            class="filter__rarity-marker"
            icon-id="dropdown-arrow"
            view-box="0 0 12 7"
          />
        </summary>
        <ul class="filter__rarity-list accordion__content">
          <li
            v-for="rarity in rarityList" :key="rarity"
            class="filter__rarity-item"
            :title="rarity"
            :style="`color: var(--color-${rarity})`"
          >
            <input
              class="filter__rarity-input"
              type="checkbox" name="редкость" :id="`filter-rarity-${rarity}`"
              :value="rarity"
              v-model="selectedRarity"
              @change="emit('changeFilter', { rarity: selectedRarity })"
            >
            <label
              class="filter__rarity-label"
              :for="`filter-rarity-${rarity}`"
            >
              <div class="filter__rarity-icon-wrapper">
                <SvgTemplate
                  class="filter__rarity-icon"
                  icon-id="check"
                />
              </div>
              <span class="filter__rarity-text">
                {{ rarity }}
              </span>
            </label>
          </li>
        </ul>
      </details>
    </div>

    <div class="filter__search-wrapper filter__item">
      <input
        ref="search"
        type="search" name="поиск" id="filter-search"
        class="filter__search"
        placeholder="поиск"
        :value="properties.search.value"
        @input="emit('changeFilter', { search: $event.target.value })"
      >
      <button
        :class="properties.search.value ? 'active' : ''"
        class="filter__search-marker"
        @click="resetSearch()"
      >
        <SvgTemplate
          icon-id="search-marker"
          viewBox="0 0 17 13"
        />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@vars/breakpoints' as *;
@use '@vars/colors';

.filter {
  z-index: 10;

  &__container {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: clamp(0.75rem, 2.5vw, 1.5rem);
    flex-wrap: wrap;
  }
  &__item {
    height: 3rem;
  }

  &__title {
    color: #fff;
    font-size: 1.5rem;
    font-weight: 400;
    @media (max-width: $mobile) {
      display: none;
    }
  }

  &__rarity {
    z-index: 10;
    flex-basis: 14rem;
    @media (min-width: calc($tablet-portrait + 1px)) {
      flex-shrink: 0; flex-grow: 0;
    }
    @media (max-width: $tablet-portrait) {
      flex-shrink: 1; flex-grow: 1;
    }

    &-summary, &-label {
      cursor: pointer;
    }

    &-details {
      box-shadow: 0 0 0 2px colors.$gray inset;
      border-radius: 0.75rem;
      background-color: colors.$blue-gray-dark;
    }

    &-summary {
      z-index: 1;
      position: relative;

      color: #fff;
      font-size: 1.5rem;
      font-weight: 400;

      background-color: colors.$indigo;
      border-radius: 0.75rem;
      box-shadow: 0 0 0 2px colors.$gray inset;
      padding-inline: 1rem;

      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
    }

    &-marker {
      color: colors.$gray;
      height: 0.6rem;
      transition: scale 200ms ease;
    }
    &-details[open] &-marker {
      scale: 1 -1;
    }

    &-list {
      border-left: solid 2px colors.$gray;
      border-right: solid 2px colors.$gray;
      border-bottom: solid 2px colors.$gray;
      display: flex;
      flex-direction: column;
      gap: 4px;

      border-radius: 0 0 0.75rem 0.75rem;
      padding-top: 0.25rem;
      padding-bottom: 0.5rem;
    }

    &-item {
      position: relative;
      width: 100%;
      height: 2.5rem;

      display: flex;
      align-items: center;

      background-color: colors.$indigo;
    }

    &-input {
      z-index: -1;
      opacity: 0;
      position: absolute;
    }
    &-input:focus-visible + &-label {
      outline: auto;
    }

    &-label {
      width: 100%;
      max-width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      padding-inline: 0.75rem;
    }

    &-icon {
      $border-width: 3px;
      transition: opacity 50ms ease;
      &-wrapper {
        width: 1.75rem;
        height: 1.75rem;
        border: $border-width solid currentColor;
        border-radius: 25%;
      }
    }
    &-input:not(:checked) + &-label &-icon {
      opacity: 0;
    }

    &-text {
      font-size: 1.125rem;
      padding-left: 0.75rem;
      text-transform: capitalize;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }

  &__search {
    width: 100%;
    height: 100%;

    &-wrapper {
      flex: 1 1 14rem;
      position: relative;
    }
    &-marker {
      color: colors.$gray;
      background-color: transparent;

      height: 100%;
      padding: 0.75rem 1rem;
      position: absolute;
      top: 0;
      right: 0;

      transition:
        opacity 150ms ease,
        visibility 150ms ease;
      opacity: 0;
      visibility: hidden;
      &.active {
        opacity: 1;
        visibility: visible;
      }
    }

    font-size: 1.5rem;
    color: #fff;
    background-color: colors.$indigo;
    border-radius: 0.75rem;
    border: 2px solid colors.$gray;

    padding: 0.5rem 1rem;
  }

  &__game {
    $border-radius: 0.75rem;
    $border-width: 2px;

    display: flex;
    align-items: center;
    gap: 0.75rem;
    @media (min-width: calc($mobile + 1px)) {
      flex: 0 0 auto;
    }
    @media (max-width: $mobile) {
      flex: 1 1 0;
    }

    &-list {
      display: flex;
      gap: $border-width;
      border: $border-width solid transparent;
      width: 100%;
    }

    &-item {
      width: 100%;
      height: 100%;
    }
    &-item:first-child &-label {
      border-radius: $border-radius 0 0 $border-radius;
    }
    &-item:last-child &-label {
      border-radius: 0 $border-radius $border-radius 0;
    }

    &-input {
      position: absolute;
      opacity: 0;
    }
    &-input:focus-visible + &-label {
      outline: auto;
    }

    &-label {
      z-index: 1;
      position: relative;
      height: 100%;

      display: flex;
      justify-content: center;
      box-shadow: 0 0 0 $border-width colors.$gray;
      transition: all 300ms ease;

      padding: 0.5rem;
      cursor: pointer;
    }

    &-input:checked + &-label {
      z-index: 2;
      box-shadow: 0 0 0 $border-width colors.$gray;
      background-color: colors.$gray;
    }
  }
}
</style>
