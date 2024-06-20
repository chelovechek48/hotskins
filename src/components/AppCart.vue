<!-- eslint-disable no-new -->
<script setup>
import {
  ref, computed, onMounted, onUpdated, watch,
} from 'vue';
import { useStore } from 'vuex';
import Accordion from '@js/accordion.js';
import SvgTemplate from '@components/SvgTemplate.vue';

const { state } = useStore();

const emit = defineEmits(['tradeSkins', 'resetSelected']);
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
const accordionContentDOM = ref(null);
const accordionConstructor = ref(null);
const accordionIsLocked = ref(false);
const accordionIsOpen = ref(false);

watch(
  () => accordionIsOpen.value,
  (IsOpen) => {
    if (IsOpen) {
      accordionConstructor.value.open();
      accordionContentDOM.value.style.height = `${accordionContentDOM.value.offsetHeight}px`;
    } else {
      accordionConstructor.value.shrink();
    }
  },
);

onMounted(() => {
  accordionConstructor.value = new Accordion(accordionDOM.value);
});
onUpdated(() => {
  if (skinsCount.value >= 1 && window.innerHeight > 850 && !accordionIsLocked.value) {
    accordionIsOpen.value = true;
  } else if (skinsCount.value === 0) {
    accordionIsOpen.value = false;
  }
});

const toggleAccordion = () => {
  accordionIsLocked.value = !accordionIsLocked.value;
  accordionIsOpen.value = true;
};

</script>

<template>
  <aside class="cart__wrapper">
    <details
      ref="accordionDOM"
      class="cart page-container"
    >
      <summary class="cart__container" tabindex="-1">
        <button
          class="cart__button cart__button_toggle accordion__button"
          :data-count="skinsCount"
          :disabled="skinsCount === 0"
          @click="toggleAccordion()"
        >
          <SvgTemplate
            class="cart__button-icon"
            icon-id="dropdown-arrow"
            viewBox="0 0 12 7"
          />
          <span class="cart__button-text">
            Предметы
          </span>
        </button>
        <button
          class="cart__button cart__button_reset"
          @click="emit('resetSelected')"
        >
          <span class="cart__button-text">
            Сбросить
          </span>
          <SvgTemplate
            class="cart__button-icon"
            icon-id="reset"
          />
        </button>
        <button
          class="cart__button cart__button_price"
          :disabled="skinsCount === 0"
          @click="emit('tradeSkins')"
        >
          <span class="cart__button-text">
            Пополнить счёт на
          </span>
          {{ state.toRubFormat(orderPrice) }}
          <SvgTemplate
            class="cart__button-icon"
            icon-id="double-arrow-right"
            viewBox="0 0 14 12"
          />
        </button>
      </summary>
      <aside class="cart__content accordion__content" ref="accordionContentDOM">
        <slot />
      </aside>
    </details>
  </aside>
</template>

<style lang="scss" scoped>
@use '@vars/breakpoints' as *;
@use '@vars/colors';
@use '@vars/keyframes';

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
    gap: clamp(0.5rem, 2vw, 1rem);
  }
  &__content {
    padding-top: clamp(0.75rem, 2vw, 1rem);
  }

  &__button {
    &:disabled {
      cursor: not-allowed;
    }
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;

    font-size: clamp(1rem, 2.25vw, 1.25rem);
    font-weight: 500;

    color: colors.$blue-gray-dark;
    background-color: colors.$white;
    padding: 0.75rem clamp(0.75rem, 5vw, 1.25rem);
    border-radius: 2rem;

    &-text {
      @media (max-width: $tablet-portrait) {
        display: none;
      }
    }

    &_toggle {
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
    &_reset {
      margin-right: auto;
    }

    &-icon {
      width: 1.125rem;
      height: 1.125rem;
      transition: all 250ms ease;
    }

    [open] &_toggle &-icon {
      scale: 1 -1;
    }

    &_reset:hover &-icon,
    &_reset:focus-visible &-icon {
      rotate: 90deg;
    }

    &_price:not(:disabled):hover &-icon,
    &_price:not(:disabled):focus-visible &-icon {
      animation: icon-shake 350ms ease;
    }
  }
}
</style>
