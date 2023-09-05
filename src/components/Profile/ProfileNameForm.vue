<template>
  <form class="form name-update-form" @submit.prevent="submitUserName">
    <div class="input-field my_profile_input">
      <input
          id="name"
          type="text"
          v-model.trim="name"
          :class="{
              invalid: v$.name.$dirty && v$.name.required.$invalid,
              validate: v$.name.$dirty && !v$.name.required.$invalid
            }"
      >
      <label for="name">Ім'я</label>
      <small
          class="helper-text invalid"
          v-if="v$.name.$dirty && v$.name.required.$invalid"
      >Введіть ваше ім'я</small>
    </div>
    <button class="name-edit" type="submit">
      <img src="@/assets/icons/edit-button-1.png" alt="Edit Button">
      <span class="edit-link">Змінити ім’я</span>
    </button>
  </form>
</template>

<script>
import { ref } from "vue";
import useVuelidate from '@vuelidate/core';
import { required } from "@vuelidate/validators";

export default {
  setup() {
    const name = ref('');
    const v$ = useVuelidate();

    // Відправка форми по зміні імені
    const submitUserName = async () => {
      if (v$.value.$invalid) {
        v$.value.$touch();
        console.log("click to submitUserName");
        return;
      }
      const formDataUserName = {
        name: name.value
      };
      console.log(formDataUserName);
    }
    return {
      v$,
      submitUserName,
      name,
    }
  },
  validations() {
    return {
      name: { required }
    }
  }
}
</script>