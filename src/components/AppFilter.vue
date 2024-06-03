<script setup>
import { ref, computed } from 'vue';
import sprite from '@icons/sprite-games.svg';
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
                :sprite="sprite"
              />
            </label>
          </li>
        </ul>
      </section>

      <section class="filter__item">
        <header class="filter__title">
          Редкость
        </header>
        <div
          v-for="rarity in rarityList" :key="rarity"
          class="filter__checkbox"
          :title="rarity"
        >
          <input
            class="filter__checkbox-input"
            type="checkbox" name="редкость" :id="`filter-rarity-${rarity}`"
            :value="rarity"
            v-model="selectedRarity"
            @change="emit('changeFilter', { rarity: selectedRarity })"
          >
          <label
            class="filter__checkbox-label"
            :for="`filter-rarity-${rarity}`"
            :style="`color: var(--color-${rarity})`"
          />
        </div>
      </section>

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
    gap: 1.5rem;
    flex-wrap: wrap
  }
  &__item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  &__title {
    color: #fff;
    font-size: 1.5rem;
    font-weight: 400;
  }

  &__search {
    flex: 1 1 auto;

    font-size: 1.5rem;
    color: #fff;
    background-color: colors.$indigo;
    border-radius: 0.75rem;
    box-shadow: 0 0 0 2px colors.$gray;

    height: 3rem;
    padding-inline: 1rem;
    appearance: none;
  }

  &__game {
    $border-radius: 0.75rem;
    $border-width: 2px;
    display: flex;
    gap: $border-width;

    &-item {
      position: relative;
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

      display: flex;
      align-items: center;
      box-shadow: 0 0 0 $border-width colors.$gray;
      transition: all 300ms ease;

      gap: 0.5rem;
      padding: 0.5rem;
      cursor: pointer;
    }

    &-input:checked + &-label {
      z-index: 2;
      box-shadow: 0 0 0 $border-width rgba(colors.$gold, 0.75);
      background-color: rgba(colors.$gold, 0.75);
    }

    &-icon {
      height: 2rem;
    }
  }

  &__checkbox {
    position: relative;
    display: flex;
    width: 1.75rem;
    height: 1.75rem;
    align-items: center;
    justify-content: center;

    $border-width: 4px;
    &-input {
      z-index: 2;
      width: calc(100% - $border-width * 2);
      height: calc(100% - $border-width * 2);
      outline: none;
      &:not(:checked) {
        opacity: 0;
      }
    }

    &-label {
      position: absolute;
      inset: 0;
      border: $border-width solid currentColor;
      border-radius: 25%;
    }
    &-input:checked + &-label {
      background-color: currentColor;
    }
    &-input:focus-visible + &-label {
      outline: auto;
    }

    &-input, &-label {
      cursor: pointer;
    }
  }
}
</style>
