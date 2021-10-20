<template>
  <div id="xinchao" class="h-full w-full relative">
    <FormAdd
      v-if="isAddContact"
      @changeStatus="changeStatusAddContact"
      @addContact="addContact"
    />
    <div id="main">
      <SearchBox @xinchao="handleSubmit" />
      <div class="w-1/2 mx-auto flex justify-center my-16">
        <ContactView @chooseContact="chooseContact" :contacts="contacts"  @deleteContact="deleteContact" @favoriteContact="handleFavorite"/>
        <DetailContact :contact="contact" />
      </div>

      <div class="my-8 w-1/2 mx-auto">
        <button
          class="text-2xl w-40 h-12 border border-black rounded-2xl bg-blue-600 text-white mx-4 active:bg-blue-300"
          v-on:click="changeStatusAddContact"
          id="addContactViewButton"
        >
          Thêm liên hệ
        </button>
        <button
          class="text-2xl w-40 h-12 border border-black rounded-2xl bg-red-600 text-white active:bg-red-300"
          v-on:click="deleteAll"
          id="deleteContactViewButton"
        >
          Xóa tất cả
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import contactService from "../services/contact.service";
import SearchBox from "./serachBox.vue";
import FormAdd from "./addContact.vue";
import DetailContact from "./detailContact.vue";
import ContactView from "./contactView.vue";
export default {
  name: "index",
  components: {
    SearchBox,
    FormAdd,
    DetailContact,
    ContactView,
  },
  data() {
    return {
      contacts: [],
      contact: {},
      isAddContact: false,
    };
  },
  methods: {
    async handleSubmit(event) {
      const response = await contactService.getBy(event, null);
      const res = response.data;
      if (res.data === null) {
        this.$toast.open({
          message: "Không tìm thấy liên hệ!",
          type: "error",
          position: "top-right",
          duration: 1000,
        });
      } else {
        this.$toast.open({
          message: "Đã tìm thấy liên hệ!",
          type: "success",
          position: "top-right",
          duration: 1000,
        });
        this.contact = res.data;
        const { _id } = this.contact;
        if (
          document.getElementsByClassName("contact-selected")[0] !== undefined
        ) {
          document
            .getElementsByClassName("contact-selected")[0]
            .classList.remove("contact-selected");
        }

        document.getElementById(_id).classList.add("contact-selected");
      }
    },
    async handleFavorite(id){
        const response = await contactService.favorite(id);
        this.getData();
        const res = response.data;
        this.chooseContact(id);
        this.$toast.open({
        message: `${res.message}`,
        type: "success",
        position: "top-right",
        duration: 1000,
      });
    },
    async deleteContact(id){
        await contactService.delete(id);
        this.getData();
        this.$toast.open({
        message: "Xóa thành công",
        type: "success",
        position: "top-right",
        duration: 1000,
      });
    },
    changeStatusAddContact() {
      this.isAddContact = !this.isAddContact;
      if(this.isAddContact){
          document.getElementById("main").classList.add("blur-effect");
      }else{
            document.getElementById("main").classList.remove("blur-effect");
    }
              document.getElementById("addContactViewButton").disabled = this.isAddContact;
              document.getElementById("deleteContactViewButton").disabled = this.isAddContact;

      
    },
    async chooseContact(id) {
      const response = await contactService.getById(id);
      window.localStorage.setItem("choosing",id);
      const res = response.data;
      this.contact = res.data;
      if (
          document.getElementsByClassName("contact-selected")[0] !== undefined
        ) {
          document
            .getElementsByClassName("contact-selected")[0]
            .classList.remove("contact-selected");
        }

        document.getElementById(id).classList.add("contact-selected");
    },
    async addContact(data) {
      await contactService.create(data);
      this.getData();
      this.$toast.open({
        message: "Thêm thành công",
        type: "success",
        position: "top-right",
        duration: 1000,
      });
    },
    async deleteAll() {
        if(this.contacts.length > 0){
            await contactService.deleteAll();
      this.getData();
      this.chooseContact("");
      this.$toast.open({
        message: "Xóa thành công",
        type: "success",
        position: "top-right",
        duration: 1000,
      });
        }else{
            this.$toast.open({
        message: "Không có liên hệ nào để xóa!",
        type: "error",
        position: "top-right", 
        duration: 1000,

        })
        }
      
    },

    async getData() {
      const response = await contactService.getAll();
      const { data } = response;
      const xxx = data.data;
      this.contacts = xxx;
    },
  },
  beforeMount() {
    this.getData();
    const id = window.localStorage.getItem("choosing");
    this.chooseContact(id);

  },
};
</script>
