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
import NavbarNonLogin from "@/components/app/Navbar.vue";
import SidebarNonLogin from "@/components/app/Sidebar.vue";
import BottombarNonLogin from "@/components/app/Bottombar.vue";
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