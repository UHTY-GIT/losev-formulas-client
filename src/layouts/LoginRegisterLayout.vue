<template>
  <router-view />
</template>

<script>
import { computed, provide } from 'vue'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const route = useRoute()

    const backgroundClass = computed(() => {
      if (route.path === '/login') {
        return 'background_login'
      } else if (route.path === '/register') {
        return 'background_register'
      } else {
        return 'default_class'
      }
    })

    provide('backgroundClass', backgroundClass)

    return {}
  }
}
</script>
