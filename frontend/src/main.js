import { createApp } from 'vue'
import App from './App.vue'
import "./index.css"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faUsers, faIdBadge, faCheckCircle, faStar as Star, faEdit as Edit, faUserSlash, faUser as User, faKey as Key, faMedal as Email } from '@fortawesome/free-solid-svg-icons'
import { faStart } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import router from "./routers/index";
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import store from "./store/index"


library.add(faSearch, faUsers, faIdBadge, faCheckCircle, Star, Edit, faUserSlash, User, Key, Email)
const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(store);
app.use(router);
app.use(VueToast);
app.mount('#app');
