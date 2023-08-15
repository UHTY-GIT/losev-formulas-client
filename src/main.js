import { createApp } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'materialize-css/dist/js/materialize.min'

createApp(App).use(store).use(router).use(useVuelidate).use(required).use(email).mount('#app')
