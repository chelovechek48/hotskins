<script setup>
import sprite from '@icons/sprite-games.svg';
import SvgTemplate from '@components/SvgTemplate.vue';

const emit = defineEmits(['changeGame']);
defineProps({
  games: {
    type: Array,
    required: true,
  },
  currentGame: {
    type: String,
    required: true,
  },
});

</script>

<template>
  <section class="trade__header-wrapper">
    <div class="trade__header page-container">
      <h2 class="trade__header-title">
        Выберите игру
      </h2>
      <div class="trade__games">
        <div class="trade__games-item" v-for="game in games" :key="game">
          <input
            class="trade__games-input"
            type="radio" name="игра" :id="game"
            :checked="currentGame === game"
            @change="emit('changeGame', game);"
          >
          <label class="trade__games-label" :for="game">
            <SvgTemplate
              class="trade__games-logo"
              :icon-id="game.replace(/:| /g, '-')"
              :sprite="sprite"
            />
            <span class="trade__games-name">
              {{ game }}
            </span>
          </label>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@vars/breakpoints' as *;
@use '@vars/colors';

.trade {

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: clamp(0.75rem, 3vw, 1.5rem);
    padding-block: clamp(0.75rem, 2.5vw, 2rem);
    margin-top: -1rem;

    @media (max-width: $tablet) {
      text-align: center;
      justify-content: center;
      flex-wrap: wrap;
    }

    &-wrapper {
      background-color: colors.$blue-gray-medium;
    }

    &-title {
      color: colors.$white;

      font-size: clamp(2rem, 5vw, 4rem);
      font-weight: 600;
      line-height: 1.3;
    }
  }

  &__games {
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
    &-label {
      position: relative;
      z-index: 1;

      display: flex;
      align-items: center;
      box-shadow: 0 0 0 $border-width colors.$gray;
      transition: all 300ms ease;

      gap: clamp(0.5rem, 1.5vw, 1rem);
      padding: clamp(0.5rem, 1.5vw, 1rem);
      cursor: pointer;
    }
    &-input:checked + &-label {
      z-index: 2;
      box-shadow: 0 0 0 $border-width rgba(colors.$gold, 0.75);
      background-color: rgba(colors.$gold, 0.75);
    }

    &-input:focus-visible + &-label {
      outline: auto;
    }

    &-name {
      color: colors.$white;
      font-size: 1.5rem;
      text-transform: uppercase;
      font-weight: 500;
      white-space: nowrap;

      @media
        (max-width: $tablet-portrait) and (min-width: calc($mobile + 1px)),
        (max-width: 20rem)
      {
        display: none;
      }
    }

    &-logo {
      width: 2.5rem;
    }
  }
}
</style>
