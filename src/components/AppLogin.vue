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

const validateInputData = () => {
  const { login, password } = userdata.value;
  const isValidUserdata = (login === user.login) && (password === user.password);

  if (isValidUserdata) {
    router.push({ name: 'home' });
    user.authorized = true;
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
    <div class="login__container page-container">
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
          <label class="login__password-label" for="toggle-password" />
        </div>
      </div>
      <button class="login__button" @click="validateInputData">
        Войти
      </button>
    </div>
  </main>
</template>

<style lang="scss" scoped>
@use '@vars/breakpoints' as *;
@use '@vars/colors';

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
      cursor: pointer;
      width: 2.25rem;
      height: 2.25rem;
      border-radius: 50%;
    }

    &-input {
      opacity: 0;
      position: absolute;
    }
    &-input:focus-visible + &-label {
      outline: auto;
    }
    &-input:not(:checked) + &-label {
      background-image: url('@icons/sprite.svg#eye-close');
    }
    &-input:checked + &-label {
      background-image: url('@icons/sprite.svg#eye-open');
    }
  }

  &__error {
    color: #ef3a3a;
    font-size: clamp(1.25rem, 3vw, 1.5rem);
    font-weight: 500;
    text-align: center;

    transition: all 300ms ease;
    visibility: hidden;
    opacity: 0;
    &_active {
      visibility: visible;
      opacity: 1;
      animation: shake 500ms linear;
      @keyframes shake {
        0% {
          translate: 0rem;
        }
        25% {
          translate: 1rem;
        }
        50% {
          translate: 0rem;
        }
        75% {
          translate: 1rem;
        }
        100% {
          translate: 0rem;
        }
      }
    }
  }
}
</style>
