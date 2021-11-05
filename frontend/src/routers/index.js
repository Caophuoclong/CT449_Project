import { createWebHistory, createRouter } from "vue-router";
import ContactBook from "../components/contactBook.vue";
import SignUp from "../components/signup.vue";
import SignIn from "../components/signin.vue";
import store from "../store/index"
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
router.beforeEach((to,from, next)=>{
    const publicPage = ["/signin","/signup"];
    const authRequired = !publicPage.includes(to.path);
    const loggedIn = store.getters.userLoggedIn;
    console.log(store.getters);
    if(authRequired && !loggedIn){
        next("/signin");
    }else{
        next();
    }

})
export default router;