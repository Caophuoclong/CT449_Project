<template lang="">
  <div class="w-1/2 overflow-y-auto h-128">
    <div class="flex justify-center items-center">
      <span class="text-3xl m-2">Danh ba</span>
      <font-awesome-icon size="3x" icon="users"></font-awesome-icon>
    </div>
    <div
      class="text-2xl font-bold m-4 border-2 p-4 border-gray-300 rounded-2xl cursor-pointer active:bg-blue-300 select-none truncate relative group"
      v-on:click="onClick"
      v-for="(contact, index) in contacts"
      :key="index"
      :id="contact._id"
    >
      {{ contact.name }}
      <button v-on:click="onDelete" class="hidden group-hover:inline-block float-right mx-2">
      <font-awesome-icon icon="user-slash"></font-awesome-icon>
      </button>
      <button v-on:click="onFavorite" class="hidden group-hover:inline-block float-right mx-2">
      <font-awesome-icon size="1x" icon="star"></font-awesome-icon>
      </button>
      
    </div>
  </div>
</template>
<script>
export default {
  name: "ContactView",
  props: ["contacts"],
  methods: {
    onClick: function (event) {
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
      this.$emit("chooseContact", me.id);
    },
    onDelete: function (event) {
      const { id } = event.target.parentNode;
      if (document.getElementsByClassName("contact-selected")[0]) {
        document.getElementsByClassName("contact-selected")[0].classList.remove("contact-selected");
      }
      console.log(id);
      this.$emit("deleteContact", id);
    },
    onFavorite: function (event) {
      const { id } = event.target.parentNode;
      if (document.getElementsByClassName("contact-selected")[0]) {
        document.getElementsByClassName("contact-selected")[0].classList.remove("contact-selected");
      }
      this.$emit("favoriteContact", id);
    }
  },
};
</script>
<style lang=""></style>
