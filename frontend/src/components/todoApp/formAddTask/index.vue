<template lang="">
  <Form
    class="
      absolute
      w-1/2
      border border-black
      top-1/2
      left-1/2
      transform
      -translate-x-1/2 -translate-y-1/2
      p-4
      rounded-3xl
      bg-white
    "
    @submit="handleSubmitForm"
  >
    <div class="w-8 h-8 ml-auto mr-4 text-3xl font-bold cursor-pointer active:bg-gray-500 rounded-3xl select-none text-center" @click="handleHideForm" title="Toogle Add Task!">X</div>

    <p class="w-max mx-auto text-3xl font-bold mb-4">Add new Task</p>
    <div class="mx-20 flex">
      <div class="w-1/2">
        <label htmlFor="start" class="text-2xl font-bold">Start Date</label>
        <div class="break"></div>
        <Field
          id="start"
          name="start"
          type="datetime-local"
          class="
            border border-gray-400
            w-full
            text-2xl
            rounded-xl
            py-2
            px-4
            my-4
            focus:outline-none
          "
        />
      </div>
      <div class="w-1/2 mx-4">
        <label htmlFor="end" class="text-2xl font-bold">Due Date</label>
        <div class="break"></div>
        <Field
          id="end"
          name="end"
          type="datetime-local"
          class="
            border border-gray-400
            w-full
            text-2xl
            rounded-xl
            py-2
            px-4
            my-4
            focus:outline-none
          "
        />
      </div>
    </div>
    <div className="mx-20 flex">
      <div class="w-1/2">
        <label htmlFor="level" class="text-2xl font-bold">Level</label>
        <div class="break"></div>
        <Field
          id="level"
          name="level"
          as="select"
         class="
            border border-gray-400
            w-full
            text-2xl
            rounded-xl
            py-2
            px-4
            my-4
            focus:outline-none
          "
        >
  <option value="" selected disabled hidden>-- Choose select --</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </Field>
      </div>
    </div>
    <div class="mx-20">
      <label htmlFor="title" class="text-2xl font-bold">Title</label>
      <br />
      <Field
        id="title"
        name="title"
        type="text"
        class="
          border border-gray-400
          w-full
          text-2xl
          rounded-xl
          py-2
          px-4
          my-4
          focus:outline-none
        "
      />
    </div>
    <div class="mx-20">
      <label htmlFor="title" class="text-2xl font-bold">Content</label>
      <br />
      <Field
        id="content"
        type="text"
        name="content"
        class="
          border border-gray-400
          w-full
          text-2xl
          rounded-xl
          py-2
          px-4
          my-4
          focus:outline-none
        "
      />
    </div>
    <div class="w-max mx-auto">
        <button type="submit"  class="w-max text-3xl py-2 px-4 border border-black rounded-xl mx-auto">Submit</button>
    </div>
  </Form>
</template>
<script>
import { Field, Form } from "vee-validate";
export default {
  name: "formAddTask",
  components: {
    Field,
    Form,
  },
  methods:{
    handleHideForm(){
      console.log("xin chao");
      this.$emit("handle-hide-form");
    },
    handleSubmitForm(values){
      this.$emit("handle-submit-form", values);
    },
  },
  components: {
    Field,
    Form,
  },
};
</script>
<style lang=""></style>
