<script setup>
import { ref, computed } from 'vue';
import spritePath from '@icons/sprite-games.svg';
import SvgTemplate from '@components/SvgTemplate.vue';

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

</script>

<template>
  <aside class="filter">
    <div class="filter__container page-container">
      <section class="filter__item">
        <header class="filter__title">
          Игра
        </header>
        <ul class="filter__game">
          <li
            v-for="game in games" :key="game.id"
            class="filter__game-item"
            :title="game.label"
          >
            <input
              type="radio" name="игра" :id="`filter-game-${game.id}`"
              class="filter__game-input"
              :checked="properties.game.value === game.id"
              @change="emit('changeFilter', { game: game.id })"
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

      <details class="filter__item filter__rarity">
        <summary class="filter__rarity-summary">
          Редкость
          <SvgTemplate
            class="filter__rarity-marker"
            icon-id="dropdown-arrow"
            view-box="0 0 12 7"
          />
        </summary>
        <div class="filter__rarity-wrapper">
          <ul class="filter__rarity-list">
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
        </div>
      </details>

      <input
        type="search" name="поиск" id="filter-search"
        class="filter__search"
        placeholder="поиск"
        :value="properties.search.value"
        @input="emit('changeFilter', { search: $event.target.value })"
      >
    </div>
  </aside>
</template>

<style lang="scss" scoped>
@use '@vars/breakpoints' as *;
@use '@vars/colors';

.filter {
  background-color: colors.$blue-gray-dark;
  margin-top: -1rem;
  padding-block: clamp(0.75rem, 2.5vw, 1rem);

  &__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: clamp(0.75rem, 2.5vw, 1.5rem);
    flex-wrap: wrap
  }
  &__item {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    @media (max-width: $mobile) {
      flex: 0 0 100%;
    }
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
    position: relative;
    cursor: pointer;
    min-width: min(15rem, 100%);

    &::-webkit-details-marker {
      display: none;
    }

    &-summary {
      color: #fff;
      font-size: 1.5rem;
      font-weight: 400;

      z-index: 1;
      position: relative;
      background-color: colors.$indigo;
      border-radius: 0.75rem;
      border: 2px solid colors.$gray;
      padding: 0.5rem 1rem;

      display: flex;
      align-items: center;
      justify-content: space-between;

    }

    &-marker {
      transition: scale 200ms ease;
      height: 0.6rem;
    }
    &[open] &-marker {
      scale: 1 -1;
    }

    &-wrapper {
      @media (min-width: calc($mobile + 1px)) {
        position: absolute;
        width: 100%;
      }
      overflow: hidden;
      margin-top: -0.75rem;

      display: grid;
      grid-template-rows: 0;
    }
    &[open] &-wrapper {
      grid-template-rows: 1fr;
    }

    &-list {
      display: flex;
      flex-direction: column;
      gap: 4px;

      @keyframes details-open {
        from {
          translate: 0 -100%;
        }
        to {
          translate: 0 0;
        }
      }
      animation: details-open 200ms ease;

      background-color: colors.$blue-gray-dark;
      border-radius: 0 0 0.75rem 0.75rem;
      border: 2px solid colors.$gray;
      padding-top: 1rem;
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
      opacity: 0;
      position: absolute;
    }
    &-input:focus-visible + &-label {
      outline: auto;
    }

    &-label {
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

    &-input, &-label {
      cursor: pointer;
    }
  }

  &__search {
    width: 100%;
    flex: 1 1 14rem;

    font-size: 1.5rem;
    color: #fff;
    background-color: colors.$indigo;
    border-radius: 0.75rem;
    border: 2px solid colors.$gray;

    padding-inline: 1rem;
    padding-block: 0.5rem;
    appearance: none;
  }

  &__game {
    $border-radius: 0.75rem;
    $border-width: 2px;
    display: flex;
    gap: $border-width;
    border: $border-width solid transparent;
    width: 100%;

    &-item {
      width: 100%;
      height: calc(3rem - 4px);
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
      box-shadow: 0 0 0 $border-width rgba(colors.$gold, 0.75);
      background-color: rgba(colors.$gold, 0.75);
    }
  }
}
</style>
