<template >
    <div class="flex group">
        <div class="w-10/12">
            <div class="title text-3xl font-bold mb-8 ml-4 truncate">{{ title }}</div>
            <div class="content text-xl  px-2 truncate">{{content}}</div>
        </div>
        <div class="w-2/12 justify-center items-center hidden group-hover:flex">
            <button @click="editClick" ><font-awesome-icon class="mx-2" icon="pencil-alt" size="2x"/></button>
            <button @click="handleDeleteClick"><font-awesome-icon class="mx-2" icon="minus" size="2x"/></button>
            <button @click="handleChangeStatus"><font-awesome-icon class="mx-2" icon="arrow-right" size="2x"/></button>
        </div>
    </div>
</template>
<script>
export default {
    name: "Todo",
    props:{
        id: String,
        title: String,
        content: String
    },
    methods: {
        editClick(){
            this.$emit("edit-task", this.id)
        },
        handleDeleteClick(){
            this.$emit("delete", this.id);
        },
        handleChangeStatus(){
            this.$emit("change-status", this.id);
        }
    }
}
</script>
<style >
    
</style>