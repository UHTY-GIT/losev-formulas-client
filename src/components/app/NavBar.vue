<template>
  <header>
    <div class="header_items">
      <div>
        <img class="logotype" src="@/assets/photo/logo-4-1.png" alt="logotype">
      </div>
      <div class="search">
        <input type="text" placeholder="Пошук">
        <img class="search-icon" src="@/assets/icons/search-1.png" alt="search icon">
      </div>
      <div class="autorizhate">
        <router-link to="/settings"><img src="@/assets/icons/settings-1.png" alt="settings"></router-link>
        <router-link v-if="username" to="/profile" class="username-account"><img :src="userphoto" alt="userphoto"> {{ username }}</router-link>
        <router-link v-if="!username" to="/login">Login</router-link>
        <router-link v-if="!username" to="/register">Sign up</router-link>
      </div>
    </div>
  </header>
</template>

<script>
import apiService from '@/services/apiService';
import defaultUserPhoto from '@/assets/icons/user-photo-1.png';

export default {
  name: 'NavBar',
  data() {
    return {
      username: null,
      userphoto: defaultUserPhoto
    };
  },
  async mounted() {
    const token = localStorage.getItem('token');
    console.log(token);
    // перевіряємо чи є токен
    if (token) {
      const userProfile = await apiService.getUserProfile(token);
      // Отримуємо дані такі як аватар і ім'я
      if (userProfile && userProfile.data) {
        this.username = userProfile.data.name;
        this.userphoto = userProfile.data.avatar ? userProfile.data.avatar : defaultUserPhoto;
      }
    }
  },
};
</script>