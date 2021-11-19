import { createApp } from 'vue';
import App from './App.vue';
import router from './routes';
import VueSweetalert2 from 'vue-sweetalert2';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPencilAlt, faMinus, faCheck, faArrowRight} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome' 
import 'sweetalert2/dist/sweetalert2.min.css';

import "./index.css";
library.add(faPencilAlt, faMinus, faCheck, faArrowRight);

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router);
app.use(VueSweetalert2);

// app.use(Toaster);
app.mount("#app");
