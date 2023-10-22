<template>
  <form class="form password-update-form" @submit.prevent="submitUserPassword">
    <div class="input-field my_profile_input">
      <input
          id="old-password"
          :type="isOldPasswordVisible ? 'text' : 'password'"
          v-model.trim="password"
          :class="{
              invalid: v$.password.$dirty && v$.password.required.$invalid,
              validate: v$.password.$dirty && !v$.password.required.$invalid
            }"
      >
      <label for="old-password">Старий пароль</label>
      <small
          class="helper-text invalid"
          v-if="v$.password.$dirty && v$.password.required.$invalid"
      >Введіть старий пароль</small>
      <i class="toggle-password user-page-password" :class="OldPasswordIconClass" @click="OldTogglePassword"></i>
    </div>

    <div class="input-field my_profile_input">
      <input
          id="new-password"
          :type="isNewPasswordVisible ? 'text' : 'password'"
          v-model.trim="newPassword"
          :class="{
                  invalid: (v$.newPassword.$dirty && v$.newPassword.required.$invalid) || (v$.newPassword.$dirty && !v$.newPassword.minLength.$invalid),
                  validate: v$.newPassword.$dirty && !v$.newPassword.required.$invalid && !v$.newPassword.minLength.$invalid
                }"
      >
      <label for="new-password">Новий пароль</label>
      <small
          class="helper-text invalid"
          v-if="v$.newPassword.$dirty && v$.newPassword.required.$invalid"
      >Введіть новий пароль</small>
      <small
          class="helper-text invalid"
          v-else-if="v$.newPassword.$dirty && v$.newPassword.minLength.$invalid"
      >Новий пароль повинен бути мінімум {{ v$.newPassword.minLength.$params.min }} символів. Зараз він {{newPassword.length}}</small>
      <i class="toggle-password user-page-password" :class="NewPasswordIconClass" @click="NewTogglePassword"></i>
    </div>

    <button class="name-edit" type="submit">
      <img src="@/assets/icons/edit-button-1.png" alt="Edit Button">
      <span class="edit-link">Змінити пароль</span>
    </button>
  </form>
</template>

<script>
import { ref } from "vue";
import useVuelidate from '@vuelidate/core';
import { required, minLength } from "@vuelidate/validators";
import M from "materialize-css";
import apiService from '@/services/apiService';
import { useRouter } from "vue-router";

export default {
  setup () {
    const password = ref('');
    const newPassword = ref('');

    const v$ = useVuelidate();
    const router = useRouter();

    // Відправка форми по зміні паролю
    const submitUserPassword = async () => {

      if (v$.value.$invalid) {
        v$.value.$touch();
        console.log("click to submitUserPassword");
        return;
      }
      const token = localStorage.getItem('token');
      if (!token) {
        console.log("Токен не знайдений. Перенаправлення на сторінку входу.");
        router.push('/login');
        return;
      }

      const oldPassword = password.value;
      const newPass = newPassword.value;

      try {
        const response = await apiService.changeUserPassword(token, oldPassword, newPass);
        M.toast({ html: `Пароль успішно змінено` });
        console.log('Пароль успішно змінено:', response);
        // Очищення поля вводу
        password.value = '';
        newPassword.value = '';
      } catch (error) {
        M.toast({ html: `[Помилка]: Пароль змінити не вдалося` });
        console.log('Помилка при зміні паролю:', error);
      }
      // const formDataPassword = {
      //   password: password.value,
      //   newPassword: newPassword.value
      // };
      // console.log(formDataPassword);
    }

    // Реактивний стан для перевірки видимості старого пароля
    const isOldPasswordVisible = ref(false);

    const OldPasswordIconClass = ref('fas fa-eye-slash'); // Додано реактивний об'єкт для зміни іконки

    // Функція переключення видимості пароля
    const OldTogglePassword = () => {
      isOldPasswordVisible.value = !isOldPasswordVisible.value;
      if (isOldPasswordVisible.value) {
        OldPasswordIconClass.value = 'fas fa-eye';
      } else {
        OldPasswordIconClass.value = 'fas fa-eye-slash';
      }
    }

    // Реактивний стан для перевірки видимості нового пароля
    const isNewPasswordVisible = ref(false);

    const NewPasswordIconClass = ref('fas fa-eye-slash'); // Додано реактивний об'єкт для зміни іконки

    // Функція переключення видимості пароля
    const NewTogglePassword = () => {
      isNewPasswordVisible.value = !isNewPasswordVisible.value;
      if (isNewPasswordVisible.value) {
        NewPasswordIconClass.value = 'fas fa-eye';
      } else {
        NewPasswordIconClass.value = 'fas fa-eye-slash';
      }
    }

    return {
      v$,
      submitUserPassword,
      OldTogglePassword,
      NewTogglePassword,
      isOldPasswordVisible,
      isNewPasswordVisible,
      OldPasswordIconClass,
      NewPasswordIconClass,
      password,
      newPassword,
    }
  },
  validations () {
    return {
      password: { required },
      newPassword: { required, minLength: minLength(6) }
    }
  },
}
</script>