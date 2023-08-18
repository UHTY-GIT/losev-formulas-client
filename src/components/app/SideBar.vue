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

export default {
  data: () => ({
    links: [
      {title: 'Головна', url: '/', icon: homeIcon},
      {title: 'Всі подкасти', url: '/allpodcast', exact:true, icon: allPodcastIcon},
      {title: 'Мої подкасти', url: '/podcast', exact:true, icon: mypodcastIcon},
      {title: 'Збереження', url: '/saved', exact:true, icon: mysavedIcon},
      {title: 'Категорії', url: '/categories', exact:true, icon: categoriesIcon},
    ],
    isSmall: false
  }),
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