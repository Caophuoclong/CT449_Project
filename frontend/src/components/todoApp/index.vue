<template>
  <div id="container" class="w-full mx-auto p-4 h-full relative flex">
    <div id="main" class="w-full flex py-2 flex-wrap">
      <NavBar
        :handleHideForm="toggleForm"
        :handleHide="toggleInfo"
        :isHide="isHide"
        :isHideForm="isHideForm"
      />
      <div class="break"></div>
      <div class="w-full flex h-90p my-4 shadow-sm rounded-3xl">
        <Todos :todos="todos" :now="now" />
        <Inprogress :inProgress="inProgress" :now="now" />
        <DoneTask :done="done" />
      </div>
    </div>
    <UserFrame v-if="!isHide" :username="username" />
  </div>
  <FormAddTask
    v-if="isHideForm"
    :onSubmit="handleSubmitForm"
    :handleHideForm="toggleForm"
  />
</template>
<script>
import moment from "moment";
import Todos from "./todos/index.vue";
import Inprogress from "./inprogress/index.vue";
import DoneTask from "./done/index.vue";
import UserFrame from "./userFrame/index.vue";
import NavBar from "./navBar/index.vue";
import FormAddTask from "./formAddTask/index.vue";
import axios from "axios";
export default {
  name: "TodoApp",
  components: {
    Todos,
    Inprogress,
    DoneTask,
    UserFrame,
    NavBar,
    FormAddTask,
  },
  data() {
    const isHide = true;
    return {
      isHide,
      username: "",
      isHideForm: false,
      todos: [
        {
          id: 1,
          title: "xin chao",
          isDone: 1,
          content:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores neque corporis explicabo dolorum sequi, nobis exercitationem consequatur quod voluptatum excepturi suscipit in unde modi perferendis. Libero mollitia doloremque voluptatibus facilis.",
          level: "high",
        },
        {
          id: 2,
          title: "xin chao",
          isDone: 0,
          level: "medium",
        },
      ],
      inProgress: [
        {
          id: 1,
          title: "Dang lam",
          isDone: 1,
          content:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores neque corporis explicabo dolorum sequi, nobis exercitationem consequatur quod voluptatum excepturi suscipit.",
          level: "high",
        },
        {
          id: 1,
          title: "Dang lam",
          isDone: 1,
          content:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores neque corporis explicabo dolorum sequi, nobis exercitationem consequatur quod voluptatum excepturi suscipit.",
          level: "high",
        },
        {
          id: 1,
          title: "Dang lam",
          isDone: 1,
          content:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores neque corporis explicabo dolorum sequi, nobis exercitationem consequatur quod voluptatum excepturi suscipit.",
          level: "high",
        },
        {
          id: 1,
          title: "Dang lam",
          isDone: 1,
          content:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores neque corporis explicabo dolorum sequi, nobis exercitationem consequatur quod voluptatum excepturi suscipit.",
          level: "high",
        },
      ],
      done: [
        {
          id: 1,
          title: "Da xong",
          isDone: 1,
          content:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores neque corporis explicabo dolorum sequi, nobis exercitationem consequatur quod voluptatum excepturi suscipit.",
          level: "high",
        },
      ],
      levels: ["low", "medium", "high"],
    };
  },
  methods: {
    toggleInfo() {
      this.isHide = !this.isHide;
    },
    toggleForm() {
      this.isHideForm = !this.isHideForm;
      const container = document.getElementById("container");
      if (this.isHideForm) {
        container.classList.add("blur-effect");
      } else {
        container.classList.remove("blur-effect");
      }
    },
    handleSubmitForm(value) {
      const container = document.getElementById("container");
      this.isHideForm = false;
      container.classList.remove("blur-effect");
      console.log(value);
    },
  },
  watch: {},
  computed: {
    now: () => {
      return moment().format("DD/MM/YYYY");
    },
  },
  created() {
    const token = window.localStorage.getItem("token");
    if (token === null) {
      this.$router.push("/login");
    } else {
      try {
        const response = axios
          .get("http://localhost:5000/user", {
            headers: { Authorization: token },
          })
          .then((response) => {
            const { data } = response;
            console.log(data);
            if (data.status === 403) {
              const reFreshToekn = window.localStorage.getItem("refreshToken");
              axios
                .get("http://localhost:5000/refreshToken", {
                  headers: { Authorization: reFreshToekn },
                })
                .then((res) => {
                  const { token } = res.data;
                  window.localStorage.setItem("token", token);
                });
            } else {
              this.username = data.username;
            }
          });
      } catch (error) {
        this.$router.push("/login");
      }
    }
  },
};
</script>
<style>
.break {
  flex-basis: 100%;
  height: 0;
}
.hideUser {
  width: 1.2rem;
}
.blur-effect {
  filter: blur(8px);
  -webkit-filter: blur(8px);
}
</style>
