<template >
            <form @submit.prevent="addContact" class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-gray-300 p-4 rounded-2xl z-50">
                    <button type="button" class="block w-12 text-2xl ml-auto mr-2" v-on:click="closeForm">X</button>
            <p class="text-3xl mx-auto block w-3/4 text-center mb-16">Thêm địa chỉ liên hệ mới</p>
            <div class="flex justify-between my-8">
                <label for="name" class="text-3xl mx-4">Tên</label>
                <input type="text" class="text-3xl focus:outline-none px-8 rounded-2xl" id="name" v-model="name" placeholder="Enter name">
            </div>
            <div class="flex justify-between my-8">
                <label for="email" class="text-3xl mx-4">Email</label>
                <input type="email" class="text-3xl focus:outline-none px-8 rounded-2xl" id="email" v-model="email" placeholder="Enter email">
            </div>
            <div class="flex justify-between my-8">
                <label for="phone" class="text-3xl mx-4">Số điện thoại</label>
                <input type="text" class="text-3xl focus:outline-none px-8 rounded-2xl" id="phone" v-model="phone" placeholder="Enter phone">
            </div>
             <div class="flex justify-between my-8">
                <label for="address" class="text-3xl mx-4">Địa chỉ</label>
                <input type="text" class="text-3xl focus:outline-none px-8 rounded-2xl" id="address" v-model="address" placeholder="Enter address">
            </div>
            <button type="button" class="text-2xl block mx-auto p-4 bg-blue-500 text-white rounded-3xl active:bg-blue-300" @click="addContact">Add Contact</button>
        </form>
</template>
<script>
export default {
    name: "FormAdd",
    props: ["changeStatus"],
    data(){
        return {
            name: "",
            email: "",
            phone: "",
            address: "",
        }     

    },
    methods:{
        addContact(){
            this.$emit("addContact",{
                name: this.name,
                email: this.email,
                phone: this.phone,
                address: this.address,
            })
            this.$emit("changeStatus");
        },
        closeForm(){
            this.$emit("changeStatus");
        }
    }
    
}
</script>
<style >
    
</style>