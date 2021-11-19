<template >
        <div class="absolute flex flex-col top-4 w-1/2 ring-4 ring-gray-200  p-4 bg-white rounded-3xl shadow-xl transition-all z-50">
        <input class="bg-transparent ring-2 my-4 p-2 text-2xl rounded-3xl focus:ring-4 ring-gray-300 focus:ring-gray-400 outline-none px-4" v-model="createAt" type="datetime-local">
        <input class="bg-transparent ring-2 my-4 p-2 text-2xl rounded-3xl focus:ring-4 ring-gray-300 focus:ring-gray-400 outline-none px-4" v-model="endAt" type="datetime-local">
        <input class="bg-transparent ring-2 my-4 p-2 text-2xl rounded-3xl focus:ring-4 ring-gray-300 focus:ring-gray-400 outline-none px-4" v-model="title" type="text">
           <textarea class="bg-transparent ring-2 my-4 p-2 text-2xl rounded-3xl focus:ring-4 ring-gray-300 focus:ring-gray-400 outline-none px-4" v-model="content" rows="5"></textarea>
        <input class="w-full break-all bg-transparent ring-2 my-4 p-2 text-2xl rounded-3xl focus:ring-4 ring-gray-300 focus:ring-gray-400 outline-none px-4" v-model="level" type="text">
        <div class="flex justify-center items-center">
            <button @click="handleEdit" class="ring-2 text-3xl mx-4 px-8 rounded-full active:ring-4 text-white bg-green-500 ring-green-100 active:ring-green-200">Edit</button>
            <button @click="handleCancel" class="ring-2 text-3xl mx-4 px-8 rounded-full active:ring-4 text-white bg-red-400 ring-red-200 active:ring-red-300">Cancel</button>
        </div>
    </div>
</template>
<script>
export default {
    name: "EditTask",
    data(){
        return {
            title: "",
            content: "",
            createAt: "",
            endAt: "",
            status: "",
            level: "",
        }
        
    },
    methods:{
        handleEdit(){
            const data = {
                id: this.todo?.id,
                title: this.title,
                content: this.content,
                createAt: this.createAt,
                endAt: this.endAt,
                status: this.status,
                level: this.level,
            
            }
        this.$emit("edit", data)
        },
        handleCancel(){
            this.$emit("cancel");
        }
    },
    props:{
        todo: {},
    },
    created() {
        console.log(this.todo);
        this.title = this.todo?.title;
        this.content = this.todo?.content;
        this.createAt = this.todo?.createAt;
        this.endAt = this.todo?.endAt;
        this.status = this.todo?.status;
        this.level = this.todo?.level;
    },
}
</script>
<style >

</style>