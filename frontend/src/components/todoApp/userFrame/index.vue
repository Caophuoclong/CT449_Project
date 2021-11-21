<template lang="">
  <div id="user" class="w-1/4 relative z-0 rounded-2xl shadow-2xl mx-4 h-full relative">
    <button @click="editInfo" class="group shadow-md absolute right-8 top-4 text-3xl px-4 py-2 rounded-3xl active:ring-4 active:ring-red-200 ring-2 ring-gray-200">
      <font-awesome-icon class="p-2 rounded-full text-5xl" icon="pencil-alt" fill="white" />
      <p class="hidden text-3xl group-hover:inline mx-8">Edit</p>
    </button>
    <div id="info" class="flex flex-col items-center mt-28 w-full h-2/3">
      <p v-if="firstTime" class="text-3xl text-red-400">Please update your information!</p>
        <div class="relative">
          <img
          :src="url?url:avatar"
          class="w-32 h-32 border-2 border-gray-300 rounded-full text-center"
          />
          <input type="file" id="file" hidden @change="handleChoosingFile" accept="image/png, image/jpeg"/>
          <button @click="chooseFile" class="absolute bottom-0 bg-white rounded-full right-0 shadow-xl ring ring-gray-200">
            <font-awesome-icon class="p-2 rounded-full text-4xl" icon="camera"  />
          </button>
        </div>
    <div class="my-8 text-3xl font-bold">{{`@${username}`}}</div>
    <div class="flex justify-start m-4 w-11/12 ">
      <p class="text-3xl font-bold truncate w-1/3">First name: </p>
      <input class="text-3xl mx-8 w-1/2 outline-none truncate" readonly="true" v-model="firstName"/>
    </div>
    <div class="flex justify-start m-4 w-11/12 ">
      <p class="text-3xl font-bold truncate w-1/3">Last name: </p>
      <input class="text-3xl mx-8 w-1/2 outline-none truncate" readonly="true" v-model="lastName"/>
    </div>
    <div class="flex justify-start m-4 w-11/12 ">
      <p class="text-3xl font-bold truncate w-1/3">Email: </p>
      <input class="text-3xl mx-8 w-3/4 outline-none truncate" readonly="true" v-model="email"/>
    </div>
    <div class="flex justify-start m-4 w-11/12">
       <p class="text-3xl font-bold truncate w-1/2">Phone number: </p>
      <input class="text-3xl mx-8 w-1/2 outline-none truncate" readonly="true" v-model="phoneNumber"/>
    </div>
    <div class="flex justify-start m-4 w-11/12">
      <p class="text-3xl font-bold truncate w-1/2">Date of birth: </p>
      <input class="text-3xl mx-8 outline-none truncate"  v-model="dateOfBirth" readonly="true" type="date">
    </div>
    <div id="btnEditAndCancel" class="mt-auto hidden justify-space-between">
      <button @click="handleEdit" class="mx-4 text-3xl ring-2 ring-green-200 px-auto py-2 rounded-3xl w-40 active:ring-4 bg-green-500 text-white"> Edit </button>
      <button @click="handleCancel" class="mx-4 text-3xl ring-2 ring-red-200 px-auto py-2 rounded-3xl w-40 active:ring-4 bg-red-500 text-white">Cancel</button>
    </div>
    </div>
    <div class="h-96 w-full py-8 opacity-0">
      <div id="calendar" class=" h-80 border-2 border-black mx-auto" style="width:95%"></div>
    </div>
    
  </div>
</template>
<script>

import moment from "moment"
import axiosClient from "../../../axiosClient/index"
import refreshToken from "../../../lib/refreshToken";
export default {
  name: "UserFrame",
  data(){
    return{
      username: "" ,
      email: "" ,
      lastName: "",
      firstName: "",
      phoneNumber: "" ,
      dateOfBirth: "" ,
      avatar : "",
      firstTime: false,
      url: "",
    }
  },
  methods:{
    editInfo(){
      const inputElement = document.querySelectorAll("input");
      inputElement.forEach(value=>{
        value.removeAttribute("readonly");
      })
      document.getElementById("btnEditAndCancel").classList.remove("hidden");
      document.getElementById("btnEditAndCancel").classList.add("flex");
    },
    handleEdit(){
      const inputElement = document.querySelectorAll("input");
      inputElement.forEach(value=>{
        value.setAttribute("readonly","true");
      })
      const user = {
        lastName: this.lastName,
        firstName: this.firstName,
        email: this.email,
        phoneNumber: this.phoneNumber,
        dateOfBirth: this.dateOfBirth,
      }
      console.log(user);
      axiosClient.put("/user/update", user, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(response=>{
        this.$swal({
          title: "Success",
          text: "Update success",
          position: "top-end",
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        })
        this.firstTime = false;
        document.getElementById("btnEditAndCancel").classList.remove("flex");
        document.getElementById("btnEditAndCancel").classList.add("hidden");
      }).catch(error=>{
        if(error.status === 401){
          refreshToken();
          this.$swal({
            title: "Error",
            position: "top-end",
            text: "Your session has expired, please login again",
            icon: "error",
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
      
    },
    handleCancel(){
      const inputElement = document.querySelectorAll("input");
      inputElement.forEach(value=>{
        value.setAttribute("readonly","true");
      })
      document.getElementById("btnEditAndCancel").classList.remove("flex");
      document.getElementById("btnEditAndCancel").classList.add("hidden");
    },
    chooseFile(){
      document.getElementById("file").click();
    },
    async handleChoosingFile(){
      const fileInput = document.getElementById("file");
      console.log(fileInput);
      const img = fileInput.files[0];
      let data = new FormData();
      this.url = URL.createObjectURL(img);
      data.append("image", img);
      data.append("long","xinchao");
      this.$emit("upload-file",img);
// upload img to firebase storage
     
      // const storage = getStorage();
      // const imgFirebase = ref(storage, img);
      // console.log(imgFirebase);


      // axiosClient.put("/user/avatar", {data: "123123"},{
      //   headers: {
      //     Authorization: localStorage.getItem("token")
      //   }
      // }).then(response=>{
      //   console.log(response);
      // }).catch(error=>{
      //   if(error.status === 401){
      //     refreshToken();
      //     this.handleChoosingFile();
      //     this.$swal({
      //       title: "Error",
      //       position: "top-end",
      //       text: "Your session has expired, please login again",
      //       icon: "error",
      //       showConfirmButton: false,
      //       timer: 1500
      //     });
      //   }
      // })
      // const config = {
      //   headers:{
      //     "Content-type": "application/x-www-form-urlencoded",
      //     Authorization: "Client-ID c4e093605058f80",
      //   },
      // };
      // try{
      //   const response = await axios.post("https://api.imgur.com/3/upload", data, config);
      //   console.log(response);
      // }catch(error){
      //   console.log(error);
      // }
    
    }
  },
  props:{
    user: Object,
  },
  created() {
    this.avatar = this.$props.user.profile.avatar ? this.$props.user.profile.avatar : "https://i.imgur.com/X2J9QQh.png";
    this.username = this.$props.user.username;
    this.email = this.$props.user.email;
    this.lastName= this.$props.user.profile.lastName;
    this.firstName = this.$props.user.profile.firstName;
    this.phoneNumber = this.$props.user.profile.phoneNumber || "0xxxxx123";
    this.dateOfBirth =  moment(this.$props.user.profile.dateOfBirth).utc().format("YYYY-MM-DD");
    this.firstTime = this.$props.user.profile.firstTime;

  },

};
</script>
<style lang="">

</style>
