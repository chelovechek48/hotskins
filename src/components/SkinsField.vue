<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import SvgTemplate from '@components/SvgTemplate.vue';
import ImgTemplate from '@components/ImgTemplate.vue';

const { state } = useStore();

const props = defineProps({
  listStyle: {
    type: String,
    required: true,
  },
  skins: {
    type: Array,
    required: true,
  },
  selected: {
    type: Array,
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

const selectedSkins = ref(props.selected);
const changeSkins = (skin) => {
  const skinIndex = selectedSkins.value.indexOf(skin);
  if (skinIndex !== -1) {
    selectedSkins.value.splice(skinIndex, 1);
  } else {
    selectedSkins.value.push(skin);
  }
};

</script>

<template>
  <ul :class="`card__list card__list_${listStyle}`">
    <li
      v-for="(skin, index) in skins" :key="listStyle + index"
      class="card__list-item"
    >
      <input
        type="checkbox" name="скин" :id="listStyle + index"
        class="card__input"
        :disabled="skin['trade-ban']"
        :checked="selectedSkins.includes(skin)"
        @change="changeSkins(skin)"
      >
      <label
        :for="listStyle + index"
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
          {{ state.toRubFormat(skin.price) }}
        </span>

        <div
          v-if="skin['trade-ban']"
          class="card__trade-status card__trade-status_locked"
        >
          <SvgTemplate
            class="card__icon-clock"
            icon-id="clock"
          />
          <span>
            {{ getTimer(skin['trade-ban']) || 'Ожидание' }}
          </span>
        </div>
        <span
          v-else
          class="card__trade-status"
        >
          {{ listStyle === 'grid' ? 'Обменять' : 'Удалить' }}
        </span>
      </label>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
@use '@vars/colors';
@use '@vars/mixins';

.card {
  cursor: pointer;
  transition:
  background-color 200ms ease,
  border-color 50ms ease;

  &__list {
    &_grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
      gap: 1rem;
    }
    &_inline {
      display: flex;
      gap: 0.5rem;
      overflow-x: auto;
      padding-inline: 0.75rem;
      margin-inline: -0.75rem;
      padding-block: clamp(0.75rem, 2vw, 1rem);
      margin-top: calc(0px - clamp(0.75rem, 2vw, 1rem) * 2);

      @include mixins.scrollbar(
        $thumb: darken(colors.$white, 15),
        $track: darken(colors.$white, 0)
      );
    }
    &_inline &-item {
      position: relative;
      flex: 0 0 8rem;
    }
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
    max-width: 100%;
    width: 100%;
    aspect-ratio: 4/3;
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
  &__input:hover + & {
    background-color: colors.$blue-gray-dark;
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

  &__input:hover + & &__label {
    opacity: 1;
  }
  &__input:focus-visible + & &__label {
    opacity: 1;
  }

  &__image {
    z-index: 2;
    position: relative;
    width: 100%;
    height: 100%;
    object-fit: contain;

    opacity: 1;
    transition: opacity 200ms ease;
  }
  &__input:hover + & &__image {
    opacity: 0.5;
  }
  &__input:focus-visible + & &__image {
    opacity: 0.5;
  }

  &__icon {
    &-clock {
      flex: 0 0 1.125em;
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
