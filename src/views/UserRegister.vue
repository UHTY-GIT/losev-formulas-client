<template>
  <div :class="backgroundClass">
    <div class="empty-layout">
      <form class="card auth-card">
      <div class="card-content">
        <span class="card-title">Реєстрація Losev Formulas</span>
        <div class="input-field">
          <input
              id="email"
              type="text"
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
        <div class="input-field">
          <input
              id="name"
              type="text"
              class="validate"
          >
          <label for="name">Ваше ім'я</label>
          <small class="helper-text invalid">Name</small>
        </div>
        <p>
          <label>
            <input type="checkbox" />
            <span>Згода на обробку персональних даних</span>
          </label>
        </p>
      </div>
      <div class="card-action">
        <div class="butt_register">
          <button
              class="btn waves-effect waves-light auth-submit"
              type="submit"
          >
            Зареєструватися
          </button>
        </div>

        <p class="center under_butt_auth">
          Вже є аккаунт?
          <a href="#">Увійти</a>
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