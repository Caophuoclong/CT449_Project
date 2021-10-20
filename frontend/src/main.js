import { createApp } from 'vue'
import App from './App.vue'
import "./index.css"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faUsers, faIdBadge, faCheckCircle, faStar as Star } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';


library.add(faSearch,faUsers,faIdBadge, faCheckCircle, Star)

createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(VueToast).mount('#app')
