<template>
  <header>
    <div class="header_items">
      <div>
        <img class="logotype" src="@/assets/photo/logo-4-1.png" alt="logotype">
      </div>
      <div class="search">
        <input type="text" v-model.trim="searchQuery" @input="searchPodcasts" placeholder="Пошук">
        <img class="search-icon" src="@/assets/icons/search-1.png" alt="search icon">
      </div>
      <!-- Відображення результатів пошуку -->
      <div class="search-results" v-if="searchResults && searchResults.length > 0">
        <ul>
          <li v-for="result in searchResults" :key="result.id">
            Подкаст {{ result.title }} за авторством {{ result.author }}
          </li>
        </ul>
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
      userphoto: defaultUserPhoto,
      searchQuery: '', // Реактивний стан для зберігання пошукового запиту
      searchResults: [], // Реактивний стан для зберігання результатів пошуку
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
  methods: {
    async searchPodcasts() {
      try {
        const responseQuery = await apiService.searchPodcasts(this.searchQuery);
        this.searchResults = responseQuery.data; // Оновлюємо результати пошуку, перетворюючи об'єкт Proxy в масив
        console.log(this.searchResults);
        console.log(this.searchResults.length);
        if (Array.isArray(this.searchResults.data)) {
          const length = this.searchResults.data.length;
          console.log(`Довжина масиву searchResults: ${length}`);
        } else {
          console.log('searchResults не є масивом.');
        }
      } catch (error) {
        console.error('Під час пошуку сталася помилка: ', error);
      }
    },
  },
};
</script>
<style>
.search-results {
  display: block;
  position: absolute;
  height: auto;
  padding: 10px 15px;
  width: 500px;
  top: 80px;
  left: 333px;
  background-color: #FFFFFF;
  color: #000000;
}
</style>