<!-- eslint-disable no-new -->
<script setup>
import { ref, onMounted } from 'vue';
import SvgTemplate from '@components/SvgTemplate.vue';
import ImgTemplate from '@components/ImgTemplate.vue';
import { useStore } from 'vuex';
import Accordion from '@js/accordion.js';

const accordion = ref(null);
onMounted(() => {
  new Accordion(accordion.value);
});

const { user } = useStore().state;

const menuLinks = [
  { label: 'история', route: 'history' },
  { label: 'пополнение', route: 'trading' },
  { label: 'помощь', route: 'help' },
  { label: 'контакты', route: 'contacts' },
];

const logout = () => {
  user.authorized = false;
  localStorage.setItem('authorized', false);
};
</script>

<template>
  <header class="header">
    <div class="header__container page-container">
      <router-link
        class="header__logo"
        :to="{ name: 'home' }"
      >
        <SvgTemplate
          class="header__logo-icon"
          icon-id="logo"
          view-box="0 0 173 40"
        />
      </router-link>
      <nav class="header__menu">
        <ul class="header__menu-list">
          <li v-for="link in menuLinks" :key="link.route">
            <router-link
              class="header__menu-link"
              :to="link.route"
            >
              {{ link.label }}
            </router-link>
          </li>
        </ul>
      </nav>
      <div class="header__dropdown-wrapper">
        <details
          v-if="user.authorized"
          class="header__dropdown"
          ref="accordion"
        >
          <summary class="header__dropdown-summary accordion__button">
            <ImgTemplate
              class="header__dropdown-avatar"
              :src="user.avatar"
            />
            <span class="header__dropdown-nickname">
              {{ user.nickname }}
            </span>
            <SvgTemplate
              class="header__dropdown-marker"
              icon-id="dropdown-arrow"
              view-box="0 0 12 7"
            />
            <div class="header__burger">
              <div class="header__burger-item" />
            </div>
          </summary>
          <aside class="header__dropdown-details accordion__content">
            <router-link
              class="header__button header__dropdown-link"
              :to="{ name: 'login' }"
              @click="logout"
            >
              Сменить аккаунт
            </router-link>
            <ul class="header__dropdown-list">
              <li v-for="link in menuLinks" :key="link.route">
                <router-link
                  class="header__dropdown-link"
                  :to="link.route"
                >
                  {{ link.label }}
                </router-link>
              </li>
            </ul>
          </aside>
        </details>
        <router-link
          v-else
          class="header__button"
          :to="{ name: 'login' }"
        >
          Войти
        </router-link>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@use '@vars/breakpoints' as *;
@use '@vars/colors';

.header {
  $logo-height: clamp(2.5rem, 5vw, 3rem);
  $header-padding: clamp(0.75rem, 2vw, 1rem);
  $header-height: calc($logo-height + 2 * $header-padding);

  z-index: 1000;
  color: colors.$white;
  background-color: colors.$blue-gray-dark;
  border-bottom: 2px solid colors.$blue-gray-medium;

  &__container {
    background-color: inherit;

    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-block: $header-padding;
  }

  &__logo {
    position: relative;
    z-index: 1000;
    overflow: hidden;

    height: $logo-height;
    @media (max-width: $tablet) and (min-width: calc($tablet-portrait + 1px)) {
      min-width: calc($logo-height * (45 / 40));
    }
    @media
      (max-width: $tablet-portrait) and (min-width: calc($mobile + 1px)),
      (min-width: calc($tablet + 1px))
    {
      min-width: calc($logo-height * (173 / 40));
    }
    @media (max-width: $mobile) {
      min-width: calc($logo-height * (45 / 40));
    }

    &-icon {
      position: absolute;
      top: 0; left: 0;
      height: 100%;
      aspect-ratio: 173 / 40;
    }
  }

  &__menu {
    @media (min-width: calc($tablet-portrait + 1px)) {
      font-size: 1.125rem;
      text-transform: capitalize;
      &-list {
        display: flex;
        gap: clamp(1rem, 2vw, 1.5rem);
      }
      &-link {
        padding: 0.75rem;
        margin: -0.75rem;
      }
    }
    @media (max-width: $tablet-portrait) {
      display: none;
    }
  }

  &__dropdown {
    $wrapper-padding: clamp(0.5rem, 2vw, 1rem);

    &-wrapper {
      height: calc($logo-height + $header-padding * 2);
      margin-block: calc(0px - $header-padding);

      @media (max-width: $tablet-portrait) {
        position: absolute;
        width: 100%;
        left: 0;
      }
    }

    transition: box-shadow 250ms ease;
    &:hover,
    &[open] {
      box-shadow: 0 2px 0 0 rgba(colors.$gray, 0.5);
    }

    &-summary {
      height: calc($logo-height + $header-padding * 2);
      display: flex;
      align-items: center;
      gap: 0 0.75rem;
      cursor: pointer;
      padding-inline: $wrapper-padding;
      outline-offset: calc(0px - $wrapper-padding / 2);
      transition: background-color 250ms ease;
      background-color: colors.$blue-gray-dark;
      &:hover {
        background-color: colors.$blue-gray-medium;
      }

      @media (max-width: $tablet-portrait) {
        justify-content: flex-end;
      }
    }
    &[open] &-summary {
      background-color: colors.$blue-gray-medium;
    }

    &-details {
      $border-width: 4px;

      max-height: calc(100dvh - $header-height);
      background-color: colors.$blue-gray-medium;
      padding: $wrapper-padding;
      overflow-y: auto;
    }

    &-avatar {
      width: $logo-height;
      height: $logo-height;
    }

    &-nickname {
      color: colors.$gold;
      font-size: 1rem;
      font-size: clamp(0.9rem, 2vw, 1rem);
      font-weight: 500;
      line-height: 1.25;

      max-width: 8rem;
      overflow: hidden;
      text-overflow: ellipsis;
      &::before {
        content: 'Привет,';
        color: colors.$gray;
        font-weight: 400;
        display: block;
      }
    }

    &-link {
      width: 100%;
      justify-content: center;
      text-align: center;
    }

    @media (min-width: calc($tablet-portrait + 1px)) {
      &-marker {
        transition: scale 200ms ease;
        height: 0.6rem;
      }
      &[open] &-marker {
        scale: 1 -1;
      }
      &-list {
        display: none;
      }
    }
    @media (max-width: $tablet-portrait) {
      &-marker {
        display: none;
      }
      &-list {
        display: flex;
        flex-direction: column;
        gap: 0.5em;
        padding-top: 0.5em;

        font-size: 1.25rem;
        text-transform: capitalize;
      }
    }
  }

  &__button {
    font-size: 1.125rem;
    font-weight: 500;

    color: colors.$blue-gray-dark;
    background-color: colors.$gold;
    padding: 0.75rem 1.25rem;
    border-radius: 2rem;
  }

  @media (min-width: calc($tablet-portrait + 1px)) {
    &__burger {
      display: none;
    }
  }
  @media (max-width: $tablet-portrait) {
    $burger-height: 1.25rem;
    $burger-item-height: 3px;

    &__burger {
      width: 2rem;
      height: calc($burger-height + $burger-item-height);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      &-item, &::before, &::after {
        width: 100%;
        height: $burger-item-height;
        border-radius: 2rem;
        background-color: colors.$gray;
        transition: all 200ms ease;
      }
      &::before, &::after {
        content: '';
      }
    }
    &__dropdown[open] &__burger {
      &::before {
        rotate: 45deg;
        translate: 0 calc($burger-height / 2);
      }
      &::after {
        rotate: -45deg;
        translate: 0 calc(0px - $burger-height / 2);
      }
      &-item {
        width: 0;
        opacity: 0;
      }
    }
  }
}
</style>
