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
    isFull: false,
    isSmall: false
  }),
  mounted() {
    this.checkWindowSize();
    window.addEventListener('resize', this.checkWindowSize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkWindowSize);
  },
  methods: {
    checkWindowSize() {
      // Update isSmall based on window width
      this.isSmall = window.innerWidth < 750;
      // Whenever we check the window size, adjust the isFull property too
      this.isFull = this.isSmall;
    },
    toggleSize(isSmall) {
      this.isFull = isSmall;
    },

    // toggleSize() {
    //   this.isFull = !this.isFull;
    // }
  }
}
</script>