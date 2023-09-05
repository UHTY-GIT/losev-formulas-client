<template>
  <div :class="backgroundClass">
    <div class="empty-layout">
      <form class="card auth-card" @submit.prevent="submitHandler">
      <div class="card-content">
        <span class="card-title">Реєстрація Losev Formulas</span>
        <div class="input-field">
          <input
              id="email"
              type="text"
              v-model.trim="email"
              :class="{
                  invalid: (v$.email.$dirty && v$.email.required.$invalid) || (v$.email.$dirty && v$.email.email.$invalid),
                  validate: v$.email.$dirty && !v$.email.required.$invalid && !v$.email.email.$invalid
                }"
          >
          <label for="email">E-mail</label>
          <small
              class="helper-text invalid"
              v-if="v$.email.$dirty && v$.email.required.$invalid"
          >Поле E-mail не може бути пустим</small>
          <small
              class="helper-text invalid"
              v-else-if="v$.email.$dirty && v$.email.email.$invalid"
          >Введіть коректний E-mail</small>
        </div>
        <div class="input-field">
          <input
              id="password"
              :type="isPasswordVisible ? 'text' : 'password'"
              v-model.trim="password"
              :class="{
                  invalid: (v$.password.$dirty && v$.password.required.$invalid) || (v$.password.$dirty && !v$.password.minLength.$invalid),
                  validate: v$.password.$dirty && !v$.password.required.$invalid && !v$.password.minLength.$invalid
                }"
          >
          <label for="password">Пароль</label>
          <small
              class="helper-text invalid"
              v-if="v$.password.$dirty && v$.password.required.$invalid"
          >Введіть пароль</small>
          <small
              class="helper-text invalid"
              v-else-if="v$.password.$dirty && v$.password.minLength.$invalid"
          >Пароль повинен бути {{ v$.password.minLength.$params.min }} символів. Зараз він {{password.length}}</small>
          <i class="toggle-password" :class="passwordIconClass" @click="togglePassword"></i>
        </div>
        <div class="input-field">
          <input
              id="name"
              type="text"
              v-model.trim="name"
              :class="{
                  invalid: v$.name.$dirty && v$.name.required.$invalid,
                  validate: v$.name.$dirty && !v$.name.required.$invalid
                }"
          >
          <label for="name">Ваше ім'я</label>
          <small
              class="helper-text invalid"
              v-if="v$.name.$dirty && v$.name.required.$invalid"
          >Введіть ваше ім'я</small>
        </div>
        <p>
          <label>
            <input type="checkbox" v-model="agree" />
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
          <router-link to="/login">Увійти</router-link>
        </p>
      </div>
    </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { inject } from 'vue';
import useVuelidate from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import { useRouter } from "vue-router";
import apiService from '@/services/apiService';
import M from 'materialize-css';

export default {
  name: 'RegisterPage',
  data () {
    return {
      backgroundClass: null,
      agree: false
    }
  },
  setup () {
    const email = ref('');
    const password = ref('');
    const name = ref(''); // Реактивний стан для імені користувача

    const router = useRouter(); // Переміщено сюди з submitHandler
    const v$ = useVuelidate(); // Визначено тут для спрощення
    const submitHandler = async () => {
      if (v$.value.$invalid) {
        v$.value.$touch();
        console.log("click to submitHandler")
        return;
      }

      const formData = {
        email: email.value,
        password: password.value,
        name: name.value // Додайте ім'я користувача в дані форми
      };
      console.log(formData);
      // router.push('/');
      // const response = await apiService.registerUser(formData.email, formData.password, formData.name);
      //
      // if (response.data.success) {
      //   router.push('/'); // Перенаправляємо користувача на головну сторінку після успішної реєстрації
      // } else {
      //   console.log("Реєстрація не вдалася");
      // }
      try {
        const response = await apiService.registerUser(email.value, password.value, name.value);

        // Перевіряємо, чи є реєстрація успішною
        if (response.data.data && response.data.data.id) {
          // Зберігаємо токен в локальному сховищі
          if (response.data.data.token) {
            localStorage.setItem('token', response.data.data.token);
          }
          // Перенаправляємо на головну сторінку
          router.push('/');
        } else {
          M.toast({ html: `Реєстрація не вдалася` });
        }
      } catch (error) {
        if (error.response && error.response.status === 422) {
          // Перевіряємо, чи є помилка з електронною поштою
          if (error.response.data.errors.email) {
            // використовуємо $error для виведення помилки
            M.toast({ html: `[Помилка]: Електронна пошта вже використовується` });
          } else {
            M.toast({ html: `[Помилка]: Реєстрація не вдалася` });
          }
        } else {
          M.toast({ html: `[Помилка]: Помилка під час реєстрації:`, error});
        }
      }
    }
    // Реактивний стан для перевірки видимості пароля
    const isPasswordVisible = ref(false);

    const passwordIconClass = ref('fas fa-eye-slash'); // Додано реактивний об'єкт для зміни іконки

    // Функція переключення видимості пароля
    const togglePassword = () => {
      isPasswordVisible.value = !isPasswordVisible.value;
      if (isPasswordVisible.value) {
        passwordIconClass.value = 'fas fa-eye';
      } else {
        passwordIconClass.value = 'fas fa-eye-slash';
      }
    }
    return {
      v$,
      submitHandler, // Повертаємо функцію з setup
      isPasswordVisible,
      togglePassword,
      passwordIconClass,
      email,
      password,
      name
    }
  },
  validations () {
    return {
      email: { required, email },
      password: { required, minLength: minLength(6) },
      name: { required },
      agree: { checked: value => value }
    }
  },
  created() {
    this.backgroundClass = inject('backgroundClass');
  },
}
</script>