<script>
import { mapGetters, mapMutations } from 'vuex';
import store from "./store/index";

// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
// import ContactBook from "./components/contactBook.vue"
export default{
  name: "App",
  computed: {
    ...mapGetters({
      currentUser: "loggedInUser"
    })
  },

  methods:{
    ...mapMutations([
      "initAuthState",
    ])
  },
  mounted() {
    this.initAuthState();
  },
}
</script>

<template>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
