import { createWebHistory, createRouter } from "vue-router";
import { initializeApp } from "firebase/app";
import TodoApp from "../components/todoApp/index.vue"
import Login from "../components/login/index.vue"
import Register from "../components/register/index.vue"
const firebaseConfig = {
    apiKey: "AIzaSyAp4AiFvnM0XW0b8KAGk2okKuMH4_tjdP8",
    authDomain: "tokyo-scholar-322004.firebaseapp.com",
    projectId: "tokyo-scholar-322004",
    storageBucket: "tokyo-scholar-322004.appspot.com",
    messagingSenderId: "492842769630",
    appId: "1:492842769630:web:b00dc8f0f2d43ed264764f",
    measurementId: "G-W58W2WSY78"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

const routes = [
    {
        path: "/",
        name: "Home",
        component: TodoApp,
        props:{
            app
        }

    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/register",
        name: "Register",
        component: Register,

    }
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router;