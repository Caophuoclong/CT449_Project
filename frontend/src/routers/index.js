import { createWebHistory, createRouter } from "vue-router";
import ContactBook from "../components/contactBook.vue";
import SignUp from "../components/signup.vue";
import SignIn from "../components/signin.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: ContactBook

    },
    {
        path: "/signin",
        name: "signin",
        component: SignIn
    },
    {
        path: "/signup",
        name: "signup",
        component: SignUp
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router;