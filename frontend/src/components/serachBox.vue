<template >
    <div class="h-1/4 p-4">
        <form @submit.prevent="onSubmit" >
            <div class="flex justify-between items-center bg-white w-1/4 px-4 mx-auto h-16 rounded-2xl border border-white bg-nord3">
                <input class="w-10/12 h-12 text-3xl px-4 rounded-2xl focus:outline-none font-medium bg-transparent bg-transparent" v-model="searchText" name="searchText" type="text" placeholder="Search for...">
                <button type="submit">
                    <font-awesome-icon class="right text-white" size="4x" icon="search" />
                </button>
            </div>
        </form>
    </div>
</template>
<script>
export default {
    name: "SearchBox",
   setup(props){
       const searchText = "";
       return {
           searchText,
           props,
       }
   },
    methods:{
        onSubmit: function(){
            this.$emit("xinchao",this.searchText);
        }
    }

}
</script>
<style >
    
</style>