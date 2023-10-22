<!--src/views/UserProfile.vue-->
<template>
  <div class="page_title">
    <p>
      Мій профіль
    </p>
  </div>
  <div class="profile-content">
<!--    Форма для зміни імені-->
    <ProfileNameForm />
<!--    Форма для зміни паролю-->
    <ProfilePasswordForm />
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
import ProfileNameForm from "@/components/Profile/ProfileNameForm.vue";
import ProfilePasswordForm from "@/components/Profile/ProfilePasswordForm.vue";

import apiService from '@/services/apiService';

export default {
  name: 'ProfilePage',
  components: {
    ProfileNameForm,
    ProfilePasswordForm
  },
  methods: {
    //Виводимо ключ get запитом у url шоб вивнести повідомлення logout на екран на сторінці UserLogin
    async logout() {
      const token = localStorage.getItem('token');
      console.log("remove " + token);
      if (token) {
        await apiService.logoutUser(token);
        localStorage.removeItem('token');  // Видаляємо токен з localStorage
        this.$router.push('/login?message=logout');
      } else {
        console.log("Токен не знайдений. Перенаправлення на сторінку входу.");
        this.$router.push('/login');
      }
    }
  },
}
</script>