<template lang="">
  <div class="w-1/2 bg-red-100 overflow-y-auto h-96">
    <div class="flex justify-center items-center">
      <span class="text-3xl mx-2">Danh ba</span>
      <font-awesome-icon size="3x" icon="users"></font-awesome-icon>
    </div>
    <div
      class="text-2xl font-bold m-4 border-2 p-4 border-gray-300 rounded-2xl cursor-pointer active:bg-blue-300 select-none truncate "
      v-on:click="onClick"
      v-for="(contact, index) in contacts"
      :key="index"
      :id="contact._id"
    >
      {{ contact.name }}
    </div>
  </div>
</template>
<script>
export default {
  name: "ContactView",
  props: ["contacts"],
  methods: {
    onClick: function(event) {
      const me = event.target;
      const contactSelected = document.getElementsByClassName(
        "contact-selected"
      );
      if (contactSelected.length > 0) {
        contactSelected[0].classList.remove("contact-selected");
      }
      if (!me.classList.contains("contact-selected")) {
        event.target.classList.add("contact-selected");
      } else {
          console.log("asdfasdf");
        event.target.classList.remove("contact-selected");
      }
      this.$emit("chosseContact",me.id);
    },
  },
};
</script>
<style lang=""></style>
