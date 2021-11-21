<template>
<HalfCircleSpinner
      :animation-duration="1000"
      :size="60"
      color="#ff1d5e"
      class="
        absolute
        top-1/2
        left-1/2
        transform
        -translate-x-1/2 -translate-y-1/2
      "
      v-if="isLoading"
    />
  <div id="container" class="w-full mx-auto p-4 h-full relative flex">
    <div id="main" class="w-full flex flex-wrap h-full">
      <NavBar
        :handleHideForm="toggleForm"
        :handleHide="toggleInfo"
        :isHide="isHide"
        :isHideForm="isHideForm"
      />
      <div class="break"></div>
      <div class="w-full flex h-90p py-4 shadow-xl rounded-3xl" style="height: 93%">
        <Todos @change-status="changeStatus" :todos="todoList" :now="now" />
        <Inprogress @change-status="changeStatus1" :inProgress="inProgress" :now="now" />
        <DoneTask :done="done" />
      </div>
    </div>
    <UserFrame v-if="!isHide" :user="user" @upload-file="uploadImage" />
  </div>
  <FormAddTask
    v-if="isHideForm"
    @handle-submit-form="handleSubmitForm"
    @handle-hide-form="toggleForm"
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
import axiosClient from "../../axiosClient";
import refreshToken from "../../lib/refreshToken";
import { getStorage, ref, uploadBytes  } from "firebase/storage";
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
  props:{
    app
  },
  data() {
    const isHide = true;
    const todo = {};

    return {
      isHide,
      username: "",
      isHideForm: false,
      user: "",
      todoList: [
        
      ],
      inProgress: [
        
      ],
      done: [
        
      ],
      todo,
      isLoading: false,
      showEdit: false,
    };
  },
  methods: {
    changeStatus(todo){
      console.log(todo);
      this.inProgress.push(todo);
    },
    changeStatus1(todo){
      console.log(todo);
      this.done.push(todo);
    },
    uploadImage(img){
      const app = this.$props.app;
      const storage = getStorage(app);    
      console.log(storage.ref())
      const storageRef = ref(storage);
      uploadBytes(storageRef, img).then((snapshot) => {
        console.log('Uploaded a blob or file!');
        console.log(snapshot);
      }).catch((error) => {
        console.log(error);
      });     

    },

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
    async handleSubmitForm(value) {
      console.log(value);
      const container = document.getElementById("container");
      this.isHideForm = false;
      container.classList.remove("blur-effect");
      const token = window.localStorage.getItem("token");
     axiosClient.post("/api/task/create", value,{
        headers:{
          Authorization: token
        }
      }).then(response=>{
        const {data}= response;
        const todo = {
          ...value,
          id: data.id,
          createAt: value.start,
          endAt: value.end,
        }
        console.log(todo);
        this.todoList.push(todo)
      }).catch(error=>{
        if(error.status === 401){
          refreshToken();
        }else{
          this.$swal.fire({
            title: "Error",
            content: "Something went wrong, please try again!",
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
          })
        }
      });
      
      
    },
    
    getUser(token){
        axiosClient.get("/user",{
            headers: { Authorization: token },
        }).then((response) => {
            const { data } = response;
            this.user = data;
            console.log(this.user);
          }).catch(error=>{
            const reFreshToken = window.localStorage.getItem("refreshToken");
            error.response.status === 401 ?  
              axiosClient
                .get("/refreshToken", {
                  headers: { Authorization: reFreshToken },
                })
                .then((res) => {
                  const { token } = res.data;
                  window.localStorage.setItem("token", token);
                }) : console.log(error);
          });
        },
    getAllTask(token){
      axiosClient.get("/api/task/getAll",{
        headers:{
          Authorization: token
        }
      }).then((response) => {
          const { data } = response;
          const todos = data.data;      
          console.log(todos);
          todos.map(value=>{
            if(value.status === "prepare"){
              this.todoList.push({
                ...value,
                createAt: moment(value.createAt).utc().format("YYYY-MM-DDTHH:mm"),
                endAt: moment(value.endAt).utc().format("YYYY-MM-DDTHH:mm"),
              });
            }else if(value.status === "pending"){
              this.inProgress.push({
                ...value,
                createAt: moment(value.createAt).utc().format("YYYY-MM-DDTHH:mm"),
                endAt: moment(value.endAt).utc().format("YYYY-MM-DDTHH:mm"),
              });
            } else{
              this.done.push({
                ...value,
                createAt: moment(value.createAt).utc().format("YYYY-MM-DDTHH:mm"),
                endAt: moment(value.endAt).utc().format("YYYY-MM-DDTHH:mm"),
              });
            }
          })
        });

        

    }
  },
  watch: {},
  computed: {
    now: () => {
      return moment().format("DD/MM/YYYY");
    },
  },
  created() {
    console.log(this.$props.app);
    const token = window.localStorage.getItem("token");
    if (token === null) {
      this.$router.push("/login");
    } 
    this.getUser(token);
    this.getAllTask(token)
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
