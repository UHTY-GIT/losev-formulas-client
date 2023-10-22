<!--src/components/app/NavBar.vue-->
<template>
  <header>
    <div class="header_items">
      <div>
        <img class="logotype" src="@/assets/photo/logo-4-1.png" alt="logotype">
      </div>
      <div class="search">
        <input type="text" v-model.trim="searchQuery" @input="searchPodcasts" @keyup.enter="openSearchResults" placeholder="Пошук">
        <img class="search-icon" src="@/assets/icons/search-1.png" alt="search icon" @click="openSearchResults">
      </div>
      <div class="autorizhate">
        <router-link to="/settings"><img src="@/assets/icons/settings-1.png" alt="settings"></router-link>
        <router-link v-if="username" to="/profile" class="username-account"><img :src="userphoto" alt="userphoto"> {{ username }}</router-link>
        <router-link v-if="!username" to="/login">Login</router-link>
        <router-link v-if="!username" to="/register">Sign up</router-link>
      </div>
    </div>
  </header>
  <!-- Відображення результатів пошуку -->
  <div class="search-results"
       v-if="searchResults && searchResults.length > 0"
       :style="{ height: searchResults.length < 2 ? '69px' : '120px' }">
    <ul class="dropdown-result">
      <li v-for="result in searchResults" :key="result.id" @click="gotoSearchResultsPage">
        <b>{{ result.title }}</b>
      </li>
<!--      за авторством {{ result.author }}-->
    </ul>
  </div>
</template>

<script>
import apiService from '@/services/apiService';
import defaultUserPhoto from '@/assets/icons/user-photo-1.png';
import { mapState } from 'vuex';

export default {
  name: 'NavBar',
  data() {
    return {
      userphoto: defaultUserPhoto,
      searchQuery: '', // Реактивний стан для зберігання пошукового запиту
      searchResults: [], // Реактивний стан для зберігання результатів пошуку
      showSearchResults: false
    };
  },
  computed: {
    ...mapState(['username']),
  },
  async mounted() {
    const token = localStorage.getItem('token');
    console.log(token);
    // перевіряємо чи є токен
    if (token) {
      const userProfile = await apiService.getUserProfile(token);
      // Отримуємо дані такі як аватар і ім'я
      if (userProfile && userProfile.data) {
        this.$store.commit('setUsername', userProfile.data.name); // Використовуйте мутацію для зберігання імені користувача
        this.userphoto = userProfile.data.avatar ? userProfile.data.avatar : defaultUserPhoto;
      }
    }
  },
  created() {
    document.addEventListener('click', this.hideSearchResults); // Додаємо подію click для документу
  },
  unmounted() {
    document.removeEventListener('click', this.hideSearchResults); // Видаляємо подію при знищенні компоненту
  },
  methods: {
    // перехід на стоірнку з результатом пошуку (якщо натиснути на 1 подкаст конкретний)
    gotoSearchResultsPage() {
      this.$store.commit('SET_SEARCH_RESULTS', this.searchResults);
      this.$router.push({ name: 'searchresult' });
      this.searchResults = [];
      this.showSearchResults = false; // І ховаємо блок результатів
      this.searchQuery = '';
    },
    // переадресація на нову сторінку з результатами пошуку (якщо натиснути на енетр або на іконку пошуку)
    openSearchResults() {
      if (this.searchResults && this.searchResults.length > 0) {
        // Зберігаємо результати пошуку у глобальному стані або передаємо як параметр через роутер
        this.$store.commit('SET_SEARCH_RESULTS', this.searchResults);
        this.$router.push({ name: 'searchresult' });
        this.searchResults = [];
        this.showSearchResults = false; // І ховаємо блок результатів
        this.searchQuery = '';
      }
    },
    //пошук подкастів
    async searchPodcasts() {
      if (!this.searchQuery.trim()) { // Якщо поле пошуку пусте, скидаємо результати пошуку
        this.searchResults = [];
        this.showSearchResults = false; // І ховаємо блок результатів
        return;
      }
      try {
        const responseQuery = await apiService.searchPodcasts(this.searchQuery);
        this.searchResults = responseQuery.data.data; // Оновлюємо результати пошуку, перетворюючи об'єкт Proxy в масив
        this.showSearchResults = true; // Показуємо блок результатів при наявності даних
        // console.log(this.searchResults);
        // console.log(this.searchResults.data.length);
        // console.log(Array.isArray(this.searchResults), this.searchResults.length);
        // if (Array.isArray(this.searchResults)) {
        //   const length = this.searchResults.length;
        //   console.log(`Довжина масиву searchResults: ${length}`);
        // } else {
        //   console.log('searchResults не є масивом.');
        // }
      } catch (error) {
        console.error('Під час пошуку сталася помилка: ', error);
      }
    },
    hideSearchResults(event) {
      if (!this.$el.contains(event.target)) { // Перевіряємо чи клік було зроблено поза компонентом
        this.showSearchResults = false;
      }
    }
  },
};
</script>
<style>
.search-results {
  display: block;
  position: absolute;
  padding: 10px 0px;
  width: 573px;
  top: 90px;
  left: 33%;
  background-color: #FFFFFF;
  color: #000000;
  z-index: 20;
  border-radius: 15px;
  overflow: auto;
}
.dropdown-result {
  color: #000000;
  font-size: 19px;
  font-family: Gilroy;
  font-weight: 500;
}
.dropdown-result li {
  transition: .3s;
  cursor: pointer;
  padding: 10px 15px;
}
.dropdown-result li:hover {
  background-color: #56A442;
  color: #fff;
}
.search-icon {
  cursor: pointer;
}
</style>