<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

const { state } = useStore();

const emit = defineEmits(['resetSelected']);
const props = defineProps({
  selectedSkins: {
    type: Array,
    required: true,
  },
});

const orderPrice = computed(
  () => props.selectedSkins
    .reduce((total, item) => total + Number(item.price), 0),
);
const skinsCount = computed(() => props.selectedSkins.length);

const details = ref(null);
</script>

<template>
  <aside class="cart__wrapper">
    <details ref="details" class="cart page-container">
      <summary class="cart__container" tabindex="-1">
        <button
          class="cart__button"
          @click="emit('resetSelected')"
        >
          Сбросить
        </button>
        <button
          class="cart__button cart__toggle"
          data-show="Показать"
          data-hide="Скрыть"
          :data-count="skinsCount"
          @click="details.open = !details.open"
        >
          предметы
        </button>
        <button class="cart__button cart__price">
          Пополнить счёт на {{ state.toRubFormat(orderPrice) }}
        </button>
      </summary>
      <slot />
    </details>
  </aside>
</template>

<style lang="scss" scoped>
@use '@vars/breakpoints' as *;
@use '@vars/colors';

.cart {
  &__wrapper {
    background-color: colors.$gold;
    margin-top: auto;
    margin-bottom: -1rem;
    padding-block: clamp(0.75rem, 2vw, 1rem);
  }

  &__container {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: clamp(0.75rem, 2vw, 1rem);
  }

  &__button {
    font-size: 1.125rem;
    font-weight: 500;

    color: colors.$blue-gray-dark;
    background-color: colors.$white;
    padding: 0.75rem 1.25rem;
    border-radius: 2rem;
  }

  &__toggle {
    display: flex;
    align-items: center;
    gap: 0.25em;
    &::after {
      content: attr(data-count);

      height: 1.5rem;
      aspect-ratio: 1;
      display: flex;
      align-items: center;
      justify-content: center;

      color: colors.$white;
      font-size: 1rem;
      font-weight: 400;

      background-color: colors.$gray;
      border-radius: 50%;
      margin-block: -1em;
    }
  }
  &[open] &__toggle::before {
    content: attr(data-hide);
  }
  &:not([open]) &__toggle::before {
    content: attr(data-show);
  }

  &__price {
    margin-left: auto;
  }
}
</style>
