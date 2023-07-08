<template>
  <div :class="backgroundClass">
    <div class="empty-layout">
      <form class="card auth-card">
        <div class="card-content">
          <span class="card-title">Увійти Losev Formulas</span>
          <div class="input-field">
            <input
                id="email"
                type="text"
                class="validate"
            >
            <label for="email">E-mail</label>
            <small class="helper-text invalid">E-mail</small>
          </div>
          <div class="input-field">
            <input
                id="password"
                type="password"
                class="validate"
            >
            <label for="password">Пароль</label>
            <small class="helper-text invalid">Password</small>
            <i class="toggle-password fas fa-eye-slash" onclick="togglePassword()"></i>
          </div>
        </div>
        <div class="card-action">
          <div class="butt_login">
            <button
                class="btn waves-effect waves-light auth-submit"
                type="submit"
            >
              Увійти
            </button>
          </div>

          <p class="center under_butt_auth">
            Немає аккаунту?
            <a href="#">Зареєстурватися</a>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue';

const backgroundClass = inject('backgroundClass');
</script>
