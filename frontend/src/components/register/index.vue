<template lang="">
  <div>
    <Form
      @submit="onSubmit"
      class="w-2/4 h-max shadow-2xl mx-auto my-auto p-8 rounded-3xl bg-white"
      :validation-schema="schema"
    >
      <p class="text-4xl font-bold w-max mx-auto my-20">Signup</p>
      <div class="my-8 w-3/4">
        <label for="username" class="text-2xl italic my-4 font-bold"
          >Username</label
        >
        <br />
        <Field
          id="username"
          name="username"
          type="text"
          class="
            border border-black
            w-full
            text-3xl
            font-bold
            h-16
            p-4
            focus:outline-none
            rounded-2xl
          "
            />
        <ErrorMessage class="text-xl font-bold text-red-300" name="username" />
      </div>
      <div class="my-8 w-3/4">
        <label for="password" class="text-2xl italic my-4 font-bold"
          >Password</label
        >
        <br />
        <Field
          id="password"
          name="password"
          type="password"
          class="
            border border-black
            w-full
            text-3xl
            font-bold
            h-16
            p-4
            focus:outline-none
            rounded-2xl
          "
        />
        <ErrorMessage class="text-xl font-bold text-red-300" name="password" />
      </div>
      <div class="my-8 w-3/4">
        <label for="confirmPassword" class="text-2xl italic my-4 font-bold"
          >Confirm Password</label
        >
        <br />
        <Field
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          class="
            border border-black
            w-full
            text-3xl
            font-bold
            h-16
            p-4
            focus:outline-none
            rounded-2xl
          "
          
        />
        <ErrorMessage
          class="text-xl font-bold text-red-300"
          name="confirmPassword"
        />
      </div>
      <div class="my-8 w-3/4">
        <label for="email" class="text-2xl italic my-4 font-bold">Email</label>
        <br />
        <Field
          id="email"
          name="email"
          type="text"
          class="
            border border-black
            w-full
            text-3xl
            font-bold
            h-16
            p-4
            focus:outline-none
            rounded-2xl
          "
          />
        <ErrorMessage class="text-xl font-bold text-red-300" name="email" />
      </div>

      <div
        class="
          w-2/4
          h-16
          border border-white
          flex
          justify-start
          items-center
          rounded-2xl
          bg-blue-500
          text-white
          shadow-2xl
          active:bg-blue-300
          focus:outline-none
        "
        type="submit"
      >
        <button class="text-3xl font-bold w-full h-full">Submit</button>
      </div>
      <p class="text-2xl my-4 italic">
        Already have an account!
        <router-link to="/register" class="text-blue-700">Login</router-link>
        here!
      </p>
    </Form>
  </div>
</template>
<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup
        .string()
        .required()
        .min(4)
        .max(20)
        .matches(/^[a-zZ-a].*/, "Username must start with a letter"),
      password: yup
        .string()
        .required()
        .min(8)
        .max(20)
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g,
          "Password must contain at least one letter, one number and one special character"
        ),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match"),
      email: yup.string().required().email(),
    });

    return {
      schema,
    };
  },
  methods: {
    onSubmit(value) {
      console.log(value);
      this.$router.push("/login");
    },
  },
};
</script>
<style lang=""></style>
