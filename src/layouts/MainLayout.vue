<!--src/layouts/MainLayout.vue-->
<template>
  <div class="background_main">
    <NavbarNonLogin />
    <section class="main-section">
      <SidebarNonLogin @toggle-size="toggleSize"/>
      <main class="site-content app-content" :class="{ full: isFull }">
        <router-view />
      </main>
    </section>
    <BottombarNonLogin />
  </div>
</template>

<script>
import NavbarNonLogin from "@/components/app/NavBar.vue";
import SidebarNonLogin from "@/components/app/SideBar.vue";
import BottombarNonLogin from "@/components/app/BottomBar.vue";
export default {
  name: 'main-layout',
  components: {
    NavbarNonLogin, SidebarNonLogin,BottombarNonLogin
  },
  data: () => ({
    isFull: false
  }),
  methods: {
    toggleSize(isSmall) {
      this.isFull = isSmall;
    }
  }
}
</script>