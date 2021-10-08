<template lang="">
  <div id="user" class="w-1/4 relative z-0 rounded-2xl shadow-2xl mx-4">
    <div id="info" class="flex flex-wrap justify-center my-12">
        <img
      src="../../../assets/images/avatar.jpg"
      class="w-28 h-28 border-2 border-gray-300 rounded-full text-center"
    />
    <div class="break"></div>
    <div>Phuoc long</div>
    </div>
    <div id="calendar" class=" h-80 border-2 border-black absolute bottom-10 right-1/2 transform translate-x-1/2" style="width:95%"></div>
  </div>
</template>
<script>
export default {
  name: "UserFrame",
};
</script>
<style lang="">
/* .avatar {
  vertical-align: middle;
  width: 50px;
  height: 50px;
  border-radius: 50%;
} */
</style>
