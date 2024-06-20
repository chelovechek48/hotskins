<script setup>

</script>

<template>
  <main class="firstscreen">
    <div class="page-container">
      <div class="firstscreen__text">
        <h1 class="firstscreen__title">
          Продавайте и обменивайте скины
          <span class="firstscreen__title-games">
            CS:2
          </span>
          и
          <span class="firstscreen__title-games">
            RUST
          </span>
        </h1>
        <router-link class="firstscreen__button" :to="{ name: 'login' }">
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
  background-image: image-set(
    url("@images/firstscreen/firstscreen-background@1x.avif") type("image/avif") 1x,
    url("@images/firstscreen/firstscreen-background@2x.avif") type("image/avif") 2x,
    url("@images/firstscreen/firstscreen-background.jpg") type("image/jpeg") 1x,
  );
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
    font-size: clamp(2rem, 5vw, 4rem);
    font-weight: 600;
    line-height: 1.3;

    max-width: clamp(40rem, 51vw, 50rem);
    &-games {
      white-space: nowrap;
    }
  }

  &__button {
    font-size: 1.5rem;
    font-weight: 500;

    color: colors.$blue-gray-dark;
    background-color: colors.$gold;
    padding: 1rem 1.5rem;
    border-radius: 2rem;
  }
}
</style>
