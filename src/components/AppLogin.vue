<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import SvgTemplate from '@components/SvgTemplate.vue';

const router = useRouter();
const { user } = useStore().state;

const hasLoginError = ref(null);
const passwordIsVisible = ref(false);

const userdata = ref({
  login: null,
  password: null,
});

const validateInputData = (e) => {
  e.preventDefault();

  const { login, password } = userdata.value;
  const isValidUserdata = (login === user.login) && (password === user.password);

  if (isValidUserdata) {
    router.push({ name: 'home' });
    user.authorized = true;
    localStorage.setItem('authorized', true);
  } else {
    hasLoginError.value = false;
    setTimeout(() => {
      hasLoginError.value = true;
    }, 1);
  }
};
</script>

<template>
  <main class="login">
    <form class="login__container page-container">
      <div class="login__logo">
        <SvgTemplate
          class="login__logo-icon"
          icon-id="logo"
          view-box="0 0 173 40"
        />
      </div>
      <span :class="hasLoginError ? 'login__error login__error_active' : 'login__error'">
        Неверный логин или пароль
      </span>
      <input
        type="text" name="логин" id="input-login"
        class="login__input"
        placeholder="Логин: login"
        v-model="userdata.login"
        list="login-tip"
      >
      <datalist id="login-tip">
        <option value="login" />
      </datalist>
      <div class="login__password">
        <input
          :type="passwordIsVisible ? 'text' : 'password'"
          name="пароль" id="input-password"
          class="login__input"
          placeholder="Пароль: admin"
          v-model="userdata.password"
        >
        <div class="login__password-button">
          <input
            type="checkbox" name="скрыть-показать-пароль" id="toggle-password"
            class="login__password-input"
            v-model="passwordIsVisible"
          >
          <label class="login__password-label" for="toggle-password">
            <SvgTemplate
              class="login__password-icon_open"
              icon-id="eye-open"
              view-box="0 0 22 15"
            />
            <SvgTemplate
              class="login__password-icon_close"
              icon-id="eye-close"
              view-box="0 0 22 19"
            />
          </label>
        </div>
      </div>
      <button class="login__button" @click="validateInputData">
        Войти
      </button>
    </form>
  </main>
</template>

<style lang="scss" scoped>
@use '@vars/breakpoints' as *;
@use '@vars/colors';
@use '@vars/keyframes';

.login {
  display: flex;
  &__container {
    max-width: 35rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (min-width: calc($tablet-portrait + 1px)) {
      justify-content: center;
    }
    gap: 1rem;
  }

  &__logo {

    position: relative;
    overflow: hidden;
    $logo-height: clamp(10rem, 15vw, 15rem);

    height: $logo-height;
    width: calc($logo-height * (45 / 40));

    &-icon {
      position: absolute;
      top: 0; left: 0;
      height: 100%;
      aspect-ratio: 173 / 40;
    }
    @media (max-width: $tablet-portrait) {
      display: none;
    }
  }

  &__input, &__button, &__password {
    width: 100%;
  }
  &__input, &__button {
    font-size: clamp(1.25rem, 3vw, 1.5rem);
    padding: clamp(0.75rem, 2vw, 1rem) clamp(1rem, 2vw, 1.5rem);
    border-radius: 2rem;
  }

  &__input {
    color: colors.$gray;
    background-color: colors.$indigo;
    border: 2px solid colors.$gray;
  }

  &__button {
    font-weight: 500;
    color: colors.$blue-gray-dark;
    background-color: colors.$gold;
    justify-content: center;
  }

  &__password {
    position: relative;
    &-button {
      position: absolute;
      top: 0; right: 1.25rem;
      height: 100%;
      background-color: transparent;

      display: flex;
      align-items: center;
      justify-content: center;
    }

    &-label {
      z-index: 1;
      display: flex;
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      cursor: pointer;
      background-color: colors.$indigo;
      padding: 0.5rem;
      margin: -0.5rem;
    }

    &-input {
      opacity: 0;
      position: absolute;
    }
    &-input:focus-visible + &-label {
      outline: auto;
    }

    &-input:not(:checked) + &-label &-icon_open {
      display: none;
    }
    &-input:checked + &-label &-icon_close {
      display: none;
    }
  }

  &__error {
    color: colors.$red;
    font-size: clamp(1.25rem, 3vw, 1.5rem);
    font-weight: 500;
    text-align: center;

    transition: all 300ms ease;
    visibility: hidden;
    opacity: 0;
    &_active {
      visibility: visible;
      opacity: 1;
      animation: text-shake 500ms linear;
    }
  }
}
</style>
