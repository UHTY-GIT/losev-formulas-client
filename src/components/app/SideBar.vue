<template>
  <nav class="sidebar-menu" :class="{ small: isSmall }">
    <div class="menu-header">
      <a href="#" @click.prevent="toggleSize">
        <img class="menu-icon" src="@/assets/icons/menu-1.png" alt="Menu icon">
        <span v-show="!isSmall">МЕНЮ</span>
      </a>
    </div>
<!--    Видалив :exact="link.exact" після :to="link.url бо матюкався Vue 3"-->
    <ul class="menu-ul">
      <router-link
          v-for="link in links"
          :key="link.url"
          :to="link.url"

          active-class="active"
          custom
          v-slot="{ navigate, isActive }"
      >
        <li
            class="menu-item"
            :class="{ 'active': isActive }"
            @click="navigate"
            v-if="link.isVisible"
        >
          <a>
            <img class="menu-icon" :src="link.icon" :alt="`${link.title} icon`">
            <span v-show="!isSmall">{{ link.title }}</span>
          </a>
        </li>
      </router-link>
    </ul>
  </nav>
</template>
<script>
import homeIcon from '@/assets/icons/home-1.png';
import allPodcastIcon from '@/assets/icons/all-podcast-1.png';
import mypodcastIcon from '@/assets/icons/my-podcast-1.png';
import mysavedIcon from '@/assets/icons/my-saved-1.png';
import categoriesIcon from '@/assets/icons/categories-1.png';
import apiService from '@/services/apiService';
import M from "materialize-css";

export default {
  data: () => ({
    // Перевірка токену
    //const isLoggedIn = localStorage.getItem('token');

    // Визначення доступних посилань
    // const baseLinks = [
    //   {title: 'Головна', url: '/', icon: homeIcon},
    //   {title: 'Всі подкасти', url: '/allpodcast', exact:true, icon: allPodcastIcon},
    //   isLoggedIn ? {title: 'Мої подкасти', url: '/podcast', exact:true, icon: mypodcastIcon} : null,
    //   isLoggedIn ? {title: 'Збереження', url: '/saved', exact:true, icon: mysavedIcon} : null,
    //   {title: 'Категорії', url: '/categories', exact:true, icon: categoriesIcon},
    // ];
    //
    // // Видалити всі значення null (для незалогінених користувачів)
    // const filteredLinks = baseLinks.filter(Boolean);
    //
    // return {
    //   links: filteredLinks,
    //   isSmall: false
    // };
    isSmall: false,
    links: [
      { title: 'Головна', url: '/', icon: homeIcon, isVisible: true },
      { title: 'Всі подкасти', url: '/allpodcast', exact: true, icon: allPodcastIcon, isVisible: true },
      { title: 'Мої подкасти', url: '/podcast', exact: true, icon: mypodcastIcon, isVisible: false },
      { title: 'Збереження', url: '/saved', exact: true, icon: mysavedIcon, isVisible: false },
      { title: 'Категорії', url: '/categories', exact: true, icon: categoriesIcon, isVisible: true },
    ],

  }),
  async created() {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const userProfile = await apiService.getUserProfile(token);
      if (!userProfile.error) {
        // Користувач залогінений, робимо сторінки "Мої подкасти" і "Збереження" видимими
        this.links.find(link => link.title === 'Мої подкасти').isVisible = true;
        this.links.find(link => link.title === 'Збереження').isVisible = true;
      } else if (userProfile.error.message === 'You need to login before continue') {
        // Користувач не залогінений, приховуємо сторінки "Мої подкасти" і "Збереження"
        this.links.find(link => link.title === 'Мої подкасти').isVisible = false;
        this.links.find(link => link.title === 'Збереження').isVisible = false;
        M.toast({ html: `Ви вийшли з аккаунту` });
      }
    } catch (error) {
      console.log('Помилка при отриманні профілю користувача:', error);
    }
  },
  methods: {
    toggleSize() {
      this.isSmall = !this.isSmall;
      //Надіслати подію батькові при перемиканні розміру
      this.$emit('toggle-size', this.isSmall);
    }
  }
}
</script>

<style>
.sidebar-menu.small {
  width: 70px;
}
.menu-ul {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}
.menu-header a {
  padding: 15px 0 25px;
  display: flex;
  align-items: center;
  align-content: center;
  flex-wrap: nowrap;
  flex-direction: row;
}
.menu-header a span {
  line-height: 0;
}
</style>