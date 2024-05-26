<script setup>
import SvgTemplate from '@components/SvgTemplate.vue';
import ImgTemplate from '@components/ImgTemplate.vue';
import { useStore } from 'vuex';

const { user } = useStore().state;

const menuLinks = [
  { label: 'история', route: 'history' },
  { label: 'пополнение', route: 'trading' },
  { label: 'помощь', route: 'help' },
  { label: 'контакты', route: 'contacts' },
];
</script>

<template>
  <header class="header">
    <div class="header__container page-container">
      <router-link
        class="header__logo"
        to="home"
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
      <details
        v-if="user"
        class="header__dropdown-wrapper"
      >
        <summary class="header__dropdown">
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
        <aside class="header__dropdown-details">
          <button class="header__button header__dropdown-link">
            Сменить аккаунт
          </button>
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
        to="login"
      >
        Войти
      </router-link>
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

  z-index: 100;
  color: colors.$white;
  background-color: colors.$blue-gray-dark;

  &__container {
    background-color: inherit;

    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-block: $header-padding;
  }

  &__logo {
    position: relative;
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
    display: flex;
    align-items: center;
    gap: 0 0.75rem;
    cursor: pointer;

    &::-webkit-details-marker {
      display: none;
    }

    &-wrapper {
      $wrapper-padding: clamp(0.5rem, 2vw, 1rem);

      transition: background-color 200ms ease;
      position: relative;
      padding: $wrapper-padding; margin-block: calc(0px - clamp(0.5rem, 2vw, 1rem));
      background-color: colors.$blue-gray-dark;
      @media (min-width: calc($tablet-portrait + 1px)) {
        &:hover, &[open] {
          background-color: colors.$blue-gray-medium;
        }
      }
      @media (max-width: $tablet-portrait) {
        margin-right: calc(0px - $container-padding);
      }
    }

    &-details {
      width: 100%;
      max-height: calc(100dvh - $header-height);
      overflow-y: auto;

      z-index: -1;
      position: absolute;
      top: 100%; right: 0;
      padding-block: 0.5rem 1rem;
      padding-inline: 1rem;

      @media (min-width: calc($tablet-portrait + 1px)) {
        border-radius: 0 0 2rem 2rem;
      }
      @media (max-width: $tablet-portrait) {
        position: fixed;
        top: $header-height;
        left: 0;
      }

      background-color: colors.$blue-gray-medium;
      @keyframes details-open {
        from {
          translate: 0 -100%;
          background-color: colors.$blue-gray-dark;
        }
        to {
          translate: 0 0;
        }
      }
      animation: details-open 200ms ease;
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
      &-wrapper[open] &-marker {
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
    &__dropdown-wrapper[open] &__burger {
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
