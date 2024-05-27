<script setup>
</script>

<template>
  <main class="firstscreen">
    <div class="page-container">
      <div class="firstscreen__text">
        <h1 class="firstscreen__title">
          Продавайте и обменивайте игровые предметы
          <span class="firstscreen__title-games">
            CS:GO
          </span>
          и
          <span class="firstscreen__title-games">
            DOTA 2
          </span>
        </h1>
        <router-link class="firstscreen__button" to="login">
          Приступить
        </router-link>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
@use '@vars/breakpoints' as *;
@use '@vars/colors';

.firstscreen {
  padding-block: 1rem;

  background-color: #1d2027;
  background-image: url('@images/firstscreen-background.jpg');
  background-repeat: no-repeat;
  background-position: right bottom;

  @media (min-width: calc($tablet-portrait + 1px)) {
    background-size: auto 100%;

    display: flex;
    align-items: center;
  }
  @media (max-width: $tablet-portrait) {
    background-size: contain;
  }

  &__text {
    display: flex;
    flex-direction: column;
    gap: clamp(0.75rem, 3vw, 2rem);

    @media (min-width: calc($tablet-portrait + 1px)) {
    align-items: flex-start;
    }
    @media (max-width: $tablet-portrait) {
      align-items: center;
      text-align: center;
    }
  }

  &__title {
    color: #fff;
    font-weight: 600;
    font-size: clamp(2rem, 5vw, 4rem);
    max-width: clamp(40rem, 50vw, 60rem);

    &-games {
      white-space: nowrap;
    }
  }

  &__button {
    font-size: clamp(1.5rem, 4vw, 2rem);
    font-weight: 500;

    color: colors.$blue-gray-dark;
    background-color: colors.$gold;
    padding: 1rem 1.5rem;
    border-radius: 2rem;
  }
}
</style>
