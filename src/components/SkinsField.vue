<script setup>
import skins from '@/assets/data/skins.json';
import SvgTemplate from '@components/SvgTemplate.vue';
</script>

<template>
  <ul class="card__list page-container">
    <li v-for="skin in skins" :key="skin.id">
      <input
        type="checkbox" name="игра" :id="`skin-${skin.id}`"
        class="card__input"
        :disabled="skin['trade-ban']"
      >
      <label
        :for="`skin-${skin.id}`"
        class="card"
        :style="`color: var(--color-${skin.rarity})`"
      >
        <div class="card__top">
          <header class="card__title">
            Нож керамбит кровавая паутина
          </header>
          <img
            class="card__image"
            src="@images/skins/skin.png" alt=""
          >
          <SvgTemplate
            class="card__icon-trade"
            icon-id="trade"
          />
        </div>
        <span class="card__price">
          {{ skin.price }}
        </span>

        <span class="card__trade-status">
          <div
            v-if="skin['trade-ban']"
            class="card__trade-status_locked"
          >
            <SvgTemplate
              class="card__icon-clock"
              icon-id="clock"
            />
            <span>{{ skin['trade-ban'] }}</span>
          </div>
          <span v-else>Обменять</span>
        </span>
      </label>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
@use '@vars/colors';

.card {
  position: relative;
  transition: background-color 200ms ease;
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

  &__top {
    width: 100%;
    position: relative;
  }

  &__input {
    position: absolute;
    opacity: 0;
  }
  &__input:checked + & {
    box-shadow: 0 0 0 2px colors.$gold;
  }
  &__input:focus-visible + & {
    outline: auto;
  }

  &__input:not(:disabled) + & {
    background-color: colors.$blue-gray-medium;
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
  }
  &__input:hover + & {
    background-color: colors.$blue-gray-dark;
  }
  &__input:disabled + & {
    background-color: transparent;
    box-shadow: 0 0 0 1px rgba(colors.$gray, 0.5);
  }

  &__title {
    z-index: 3;
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 1rem;
    color: colors.$white;
    text-align: center;

    transition: opacity 200ms ease;
    opacity: 0;
  }
  &__input:hover + & &__title {
    opacity: 1;
  }
  &__input:focus-visible + & &__title {
    opacity: 1;
  }

  &__image {
    z-index: 2;
    position: relative;
    width: 100%;
  }

  &__icon {
    &-clock {
      width: 1.125em;
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
    opacity: 0.75;
  }

  &__price {
    color: colors.$white;
    font-size: 1.25rem;
    font-weight: 500;
    &::after {
      content: ' ₽';
    }
  }

  &__trade-status {
    color: colors.$gray;
    &_locked {
      display: flex;
      align-items: center;
      gap: 0.5em;
    }
  }
}
</style>
