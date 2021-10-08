<template lang="">
    <div id="nav-bar" class="w-full h-20 mx-4 flex justify-end p-4 shadow-md rounded-3xl">
        <button id="btnAddNew" className="w-80 h-12 flex items-center justify-center p-2 border-2 rounded-3xl" @click="handleHideForm">
            <div class=" w-8 h-8 rounded-full flex items-center justify-center text-3xl ">{{isHideForm?"-":"+"}}</div> <span class="text-3xl font-bold mx-4 text-gray-500">{{isHideForm?"Hide Add Task":"Show Add Task"}}</span>
        </button>
        <button id="btnAddNew" className="w-60 h-12 flex items-center justify-center p-2 border-2 rounded-3xl mx-4" @click="handleHide">
            <div class=" w-8 h-8 rounded-full flex items-center justify-center text-3xl ">{{!isHide?"-":"+"}}</div> <span class="text-3xl font-bold mx-4 text-gray-500">{{!isHide?"Hide Info":"Show Info"}}</span>
        </button>
      </div>
</template>
<script>
export default {
    name:"NavBar",
    props:{
        handleHide: Function,
        isHide: Boolean,
        handleHideForm: Function,
        isHideForm: Boolean,
    },
    data(){
        
    },
    methods:{
        

    },

}
</script>
<style lang="">
    
</style>