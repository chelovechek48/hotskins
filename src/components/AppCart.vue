<!-- eslint-disable no-new -->
<script setup>
import {
  ref, computed, onMounted, onUpdated,
} from 'vue';
import { useStore } from 'vuex';
import Accordion from '@js/accordion.js';

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

const accordionDOM = ref(null);
const accordionConstructor = ref(null);
const accordionHasOpen = ref(false);

onMounted(() => {
  accordionConstructor.value = new Accordion(accordionDOM.value);
});
onUpdated(() => {
  if (skinsCount.value >= 1 && !accordionHasOpen.value) {
    accordionHasOpen.value = true;
    accordionConstructor.value.open();
    const list = accordionDOM.value.querySelector('ul');
    list.style.height = `${list.offsetHeight}px`;
  } else if (skinsCount.value === 0) {
    accordionConstructor.value.shrink();
  }
});

</script>

<template>
  <aside class="cart__wrapper">
    <details
      ref="accordionDOM"
      class="cart page-container"
    >
      <summary class="cart__container" tabindex="-1">
        <button
          class="cart__button cart__toggle accordion__button"
          :data-count="skinsCount"
          :disabled="skinsCount === 0"
        >
          Предметы
        </button>
        <button class="cart__button">
          Пополнить счёт на {{ state.toRubFormat(orderPrice) }}
        </button>
        <button
          class="cart__button"
          @click="emit('resetSelected')"
        >
          Сбросить
        </button>
      </summary>
      <aside class="cart__content accordion__content">
        <slot />
      </aside>
    </details>
  </aside>
</template>

<style lang="scss" scoped>
@use '@vars/breakpoints' as *;
@use '@vars/colors';

.cart {
  overflow: hidden;

  &__wrapper {
    z-index: 100;
    position: sticky;
    bottom: 0;

    background-color: colors.$gold;
    margin-top: auto;
    margin-bottom: -1rem;
  }

  &__container {
    padding-block: clamp(0.75rem, 2vw, 1rem);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: clamp(0.75rem, 2vw, 1rem);
  }
  &__content {
    padding-top: clamp(0.75rem, 2vw, 1rem);
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
    display: inline-flex;
    align-items: center;
    gap: 0.25em;
    margin-right: auto;
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
    &:disabled {
      cursor: not-allowed;
    }
  }
}
</style>
