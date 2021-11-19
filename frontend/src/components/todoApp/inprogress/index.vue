<template lang="">
    <div class="w-1/3 h-full mx-4 relative">
          <div
            class="
              w-90p
              my-4
              mx-auto
              text-3xl
              font-bold
              flex
              items-center
              p-4
              rounded-2xl
              bg-blue-400
            "
          >
            <div
              class="
                w-20
                h-20
                rounded-3xl
                flex
                justify-center
                items-center
                bg-blue-200
              "
            >
              <img
                src="../../../assets/images/inprogress.png"
                alt=""
                class="w-12 h-12"
              />
            </div>
            <div class="mx-4">
              <p>In Progress</p>
              <p class="text-lg">Last update {{ now }}</p>
            </div>
          </div>
          <div class="text-2xl font-semibold px-4 flex items-center">
            <div class="w-4 h-4 bg-blue-300 mx-4"></div
            >{{ inProgress.length }} Tasks
          </div>
           

          <div class="tasks overflow-y-auto" style="height: 75%">
            <div v-for="(item, index) in inProgress" class="w-90p bg-blue-200 my-4 mx-auto rounded-xl p-4">
        <Todo @edit-task="editTask" @delete="deleteTask" @change-status="changeStatus" :title="item.title" :id="item._id ? item._id: item.id" :content="item.content" />
            </div>
          </div>
              <EditTask class="right-0 left-full"  v-if="showEdit" @cancel="handleCancel" @edit="handleEdit" :todo="todo"/>

        </div>
</template>
<script>
import Todo from "./todo.vue"
import EditTask from "../editTask/index.vue"
import axiosClient from "../../../axiosClient/index"
import refreshToken from "../../../lib/refreshToken"
export default {
    name: "InProgress",
    data(){
      const todo = {}
      const showEdit = false
      return {
        todo,showEdit
      }
      
    },
    components: {
        Todo,
        EditTask
    },
    methods:{
    handleCancel(){
      this.showEdit = false;
    },
    changeStatus(id){
      axiosClient.put(`/api/task/update/${id}`,{
        status: "complete"
      },{
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(response=>{
        this.$swal.fire({
            title: "Success",
            icon: 'success',
            text: "Change status successfully",
            position: "top-end",
            showConfirmButton: false,
            timer: 1500
          });
          const length = this.inProgress.length
          for(let i = 0; i < length; i++){
            if(this.inProgress[i]._id === id || this.inProgress[i].id === id){
              const todo = this.inProgress[i];
              this.$emit("change-status",todo);
              this.inProgress.splice(i,1)
            }
          }
          
    }).catch(error=>{
      if(error.response.status === 401){
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
    })
    },
    async deleteTask(data){
      axiosClient.delete(`/api/task/delete/${data}`,{
         headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(()=>{
        this.$swal.fire({
            title: "Success",
            icon: 'success',
            text: "Delete task successfully",
            position: "top-end",
            showConfirmButton: false,
            timer: 1500
          });
        const index = this.inProgress.findIndex(item => item._id === data);
        this.inProgress.splice(index,1);
      }).catch(error=>{
      if(error.response.status === 401){
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
    })

    },
    async handleEdit(data){
      console.log(data);
      axiosClient.put(`/api/task/update/${data.id}`,data,{
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(response=>{
        this.$swal.fire({
            title: "Success",
            icon: 'success',
            text: "Update task successfully",
            position: "top-end",
            showConfirmButton: false,
            timer: 1500
          });
          this.inProgress.map((value)=>{
            if(value._id == data.id || value.id == data.id){
              value.title = data.title;
              value.content = data.content;
              value.createAt = data.createAt;
              value.endAt = data.endAt;
              value.status = data.status;
              value.level = data.level;
            }
          })
          
      }).catch(error=>{
      if(error.response.status === 401){
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
    })
    },
    async editTask(value){
        this.handleCancel();
        console.log(value);
        setTimeout(()=>{
          this.showEdit = true;
          const length = this.inProgress.length;
          for(let i = 0; i < length; i++){
            if(this.inProgress[i]._id === value || this.inProgress[i].id === value){
              this.todo = this.inProgress[i];
              this.todo.id = value;
              break;
            }
          }
        });
        

    },
  },
    props:{
        inProgress: Array,
        now: String
    }
    
}
</script>
<style lang="">
    
</style>