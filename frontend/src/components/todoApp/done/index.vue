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
        bg-purple-400
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
          bg-purple-200
        "
      >
        <img src="../../../assets/images/done.png" alt="" class="w-12 h-12" />
      </div>
      <div class="mx-4">
        <p>Done</p>
        <p class="text-lg">Last update {{ now }}</p>
      </div>
    </div>
    <div class="text-2xl font-semibold px-4 flex items-center">
            <div class="w-4 h-4 bg-purple-300 mx-4"></div
            >{{ done.length }} Tasks
          </div>
    <div class="tasks overflow-y-auto" style="height: 75%">
      <div
        v-for="(item, index) in done"
        class="w-90p bg-purple-200 my-4 mx-auto rounded-xl p-4"
      >
        <Todo @delete="deleteTask" @edit-task="editTask" :title="item.title" :id="item._id ? item._id : item.id" :content="item.content" />

      </div>
    </div>
     <EditTask class="left-0 transform -translate-x-full"  v-if="showEdit" @cancel="handleCancel" @edit="handleEdit" :todo="todo"/>
  </div>
</template>
<script>
import Todo from "./todo.vue"
import EditTask from "../editTask/index.vue"
import axiosClient from "../../../axiosClient";
export default {
  name: "DoneTask",
  components: {
        Todo,
        EditTask,

  },
  data(){
    const showEdit = false
    return{
      showEdit,
    }
  },
    methods:{
      handleCancel(){
      this.showEdit = false;
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
          this.done.map((value)=>{
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
          const length = this.done.length;
          for(let i = 0; i < length; i++){
            if(this.done[i]._id === value || this.done[i].id === value){
              this.todo = this.done[i];
              this.todo.id = value;
              break;
            }
          }
        });
        
    },
    deleteTask(data){
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
        const length = this.done.length;
        for(let i = 0; i < length; i++){
          if(this.done[i]._id === data || this.done[i].id === data){
            this.done.splice(i,1);
            break;
        }
        }

      }).catch(error=>{
      console.log(error);
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
    })
    }
  },
  props: {
    done: Array,
    now: String,
  },
};
</script>
<style lang=""></style>
