import { createWebHistory, createRouter } from "vue-router";
import TodoApp from "../components/todoApp/index.vue"
import Login from "../components/login/index.vue"
import Register from "../components/register/index.vue"

const routes = [
    {
        path: "/",
        name: "Home",
        component: TodoApp,

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