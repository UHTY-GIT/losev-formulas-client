<template>
  <div class="page_title">
    <p>
      Мій профіль
    </p>
  </div>
  <div class="profile-content">
<!--    Форма для зміни імені-->
    <form class="form name-update-form" @submit.prevent="submitUserName">
      <div class="input-field my_profile_input">
        <input
            id="name"
            type="text"
            v-model.trim="name"
            :class="{
              invalid: v$.nameForm.name.$dirty && v$.nameForm.name.required.$invalid,
              validate: v$.nameForm.name.$dirty && !v$.nameForm.name.required.$invalid
            }"
        >
        <label for="name">Ім'я</label>
        <small
            class="helper-text invalid"
            v-if="v$.nameForm.name.$dirty && v$.nameForm.name.required.$invalid"
        >Введіть ваше ім'я</small>
      </div>
      <button class="name-edit" type="submit">
        <img src="@/assets/icons/edit-button-1.png" alt="Edit Button">
        <span class="edit-link">Змінити ім’я</span>
      </button>
    </form>
<!--    Форма для зміни паролю-->
    <form class="form password-update-form" @submit.prevent="submitUserPassword">
      <div class="input-field my_profile_input">
        <input
            id="old-password"
            :type="isOldPasswordVisible ? 'text' : 'password'"
            v-model.trim="password"
            :class="{
              invalid: v$.passwordForm.password.$dirty && v$.passwordForm.password.required.$invalid,
              validate: v$.passwordForm.password.$dirty && !v$.passwordForm.password.required.$invalid
            }"
        >
        <label for="old-password">Старий пароль</label>
        <small
            class="helper-text invalid"
            v-if="v$.passwordForm.password.$dirty && v$.passwordForm.password.required.$invalid"
        >Введіть старий пароль</small>
        <i class="toggle-password user-page-password" :class="OldPasswordIconClass" @click="OldTogglePassword"></i>
      </div>

      <div class="input-field my_profile_input">
        <input
            id="new-password"
            :type="isNewPasswordVisible ? 'text' : 'password'"
            v-model.trim="newPassword"
            :class="{
                  invalid: (v$.passwordForm.newPassword.$dirty && v$.passwordForm.newPassword.required.$invalid) || (v$.passwordForm.newPassword.$dirty && !v$.passwordForm.newPassword.minLength.$invalid),
                  validate: v$.passwordForm.newPassword.$dirty && !v$.passwordForm.newPassword.required.$invalid && !v$.passwordForm.newPassword.minLength.$invalid
                }"
        >
        <label for="new-password">Новий пароль</label>
        <small
            class="helper-text invalid"
            v-if="v$.passwordForm.newPassword.$dirty && v$.passwordForm.newPassword.required.$invalid"
        >Введіть новий пароль</small>
        <small
            class="helper-text invalid"
            v-else-if="v$.passwordForm.newPassword.$dirty && v$.passwordForm.newPassword.minLength.$invalid"
        >Новий пароль повинен бути {{ v$.passwordForm.newPassword.minLength.$params.min }} символів. Зараз він {{newPassword.length}}</small>
        <i class="toggle-password user-page-password" :class="NewPasswordIconClass" @click="NewTogglePassword"></i>
      </div>

      <button class="name-edit" type="submit">
        <img src="@/assets/icons/edit-button-1.png" alt="Edit Button">
        <span class="edit-link">Змінити пароль</span>
      </button>
    </form>
<!--    Вихід з аккаунту-->
    <div class="logout-section">
      <a href="#" @click.prevent="logout" class="logout-link">
        <img src="@/assets/icons/log-out-1.png" alt="Edit Button">
         <span class="edit-link">Вийти з аккаунту</span>
      </a>
    </div>
  </div>

</template>

<script>
//import messages from "@/utils/messages";
import {ref} from "vue";
import useVuelidate from "@vuelidate/core";
import {required, minLength} from "@vuelidate/validators";

export default {
  name: 'ProfilePage',
  setup () {
    const nameForm = ref(null);
    const passwordForm = ref(null);
    const name = ref('');
    const password = ref('');
    const newPassword = ref('');

    const v$ = useVuelidate();

    // Відправка форми по зміні імені
    const submitUserName = async () => {
      if (v$.value.nameForm.$invalid) {
        v$.value.nameForm.$touch();
        console.log("click to submitUserName");
        return;
      }
      const formDataUserName = {
        name: name.value
      };
      console.log(formDataUserName);
    }

    // Відправка форми по зміні паролю
    const submitUserPassword = async () => {
      if (v$.value.passwordForm.$invalid) {
        v$.value.passwordForm.$touch();
        console.log("click to submitUserPassword");
        return;
      }
      const formDataPassword = {
        password: password.value,
        newPassword: newPassword.value
      };
      console.log(formDataPassword);
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
      submitUserName,
      submitUserPassword,
      OldTogglePassword,
      NewTogglePassword,
      isOldPasswordVisible,
      isNewPasswordVisible,
      OldPasswordIconClass,
      NewPasswordIconClass,
      name,
      password,
      newPassword,
      nameForm,
      passwordForm
    }
  },
  validations () {
    return {
      nameForm: {
        name: { required }
      },
      passwordForm: {
        password: { required },
        newPassword: { required, minLength: minLength(6) }
      }
    }
  },
  methods: {
    //Виводимо ключ get запитом у url шоб вивнести повідомлення logout на екран на сторінці UserLogin
    logout() {
      this.$router.push('/login?message=logout')
    }
  },
}
</script>