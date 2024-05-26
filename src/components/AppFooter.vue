<script setup>
const footerLinks = [
  { label: 'помощь', route: 'help' },
  { label: 'контакты', route: 'contacts' },
  { label: 'пользовательское соглашение', route: 'agreement' },
];
</script>

<template>
  <footer class="footer">
    <div class="footer__container page-container">
      <small class="footer__copyright">
        Copyright © Skincash.ru
      </small>
      <ul class="footer__list">
        <li v-for="link in footerLinks" :key="link.route">
          <router-link
            class="footer__link"
            :to="link.route"
          >
            {{ link.label }}
          </router-link>
        </li>
      </ul>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@use '@vars/breakpoints' as *;
@use '@vars/colors';

.footer {
  z-index: 99;
  color: colors.$gray;
  background-color: colors.$blue-gray-dark;
  border-top: 2px solid colors.$blue-gray-medium;

  &__container {
    padding-block: clamp(0.75rem, 2vw, 1rem);
    text-align: center;

    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    @media (min-width: calc($tablet-portrait + 1px)) {
      align-items: center;
      justify-content: space-between;
    }
    @media (max-width: $tablet-portrait) {
      flex-direction: column;
    }
  }

  &__copyright, &__link {
    font-size: 1.125rem;
    text-transform: capitalize;
  }
  &__link {
    padding: 0.75rem;
    margin: -0.75rem;
  }

  &__list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0 clamp(1rem, 2vw, 1.5rem);
  }

}
</style>
