import { createApp } from 'vue';
import App from './App.vue';
import router from './routes';
import Toaster from 'v-toaster'
import 'v-toaster/dist/v-toaster.css'
import "./index.css";
const app = createApp(App);
app.use(router,Toaster);
app.mount("#app");
