<template >
    <div class="w-1/2 mx-4 h-128">
        <div class="flex justify-center items-center">
      <span class="text-3xl m-2">Chi tiết</span>
      <font-awesome-icon size="3x" icon="id-badge"></font-awesome-icon>
    </div>
    <div>
        <div class="flex justify-start my-8 border border-black p-2 rounded-2xl">
            <span class="ml-4 mr-8 text-3xl font-bold">Tên:</span>
            <span class="text-3xl truncate">{{contact.name}}</span>
        </div>
        <div class="flex justify-start my-8 border border-black p-2 rounded-2xl">
            <span class="ml-4 mr-8 text-3xl font-bold">Email:</span>
            <span class="text-3xl truncate" :title="contact.email">{{contact.email}}</span>
        </div>
        <div class="flex justify-start my-8 border border-black p-2 rounded-2xl">
            <span class="ml-4 mr-8 text-3xl font-bold">Địa chỉ:</span>
            <span class="text-3xl truncate" :title="contact.address">{{contact.address}}</span>
        </div>
        <div class="flex justify-start my-8 border border-black p-2 rounded-2xl">
            <span class="ml-4 mr-8 text-3xl font-bold">Số điện thoại:</span>
            <span class="text-3xl truncate" :title="contact.phone">{{contact.phone}}</span>
        </div>
        <div class="flex justify-start my-8 items-center border border-black p-2 rounded-2xl">
            <span class="ml-4 mr-8 text-3xl font-bold">Liên lạc yêu thích:</span>
            <font-awesome-icon v-if="contact.favorite" size="3x" :style="{ color: 'green' }" icon="check-circle"></font-awesome-icon>
            <font-awesome-icon v-if="!contact.favorite" size="3x" icon="check-circle"></font-awesome-icon>
        </div>
    </div>
    </div>
</template>
<script>
export default {
    name: "DetailContact",
    props:["contact"],
}
</script>
<style >
    
</style>