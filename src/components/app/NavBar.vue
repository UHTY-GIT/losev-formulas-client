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
        <router-link to="/login">Login</router-link>
        <router-link to="/register">Sign up</router-link>
      </div>
    </div>
  </header>
</template>
<script setup>
</script>