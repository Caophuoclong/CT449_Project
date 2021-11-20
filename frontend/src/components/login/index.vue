<template lang="">
  <div class="backgroundImage w-full h-full py-4 relative">
    <HalfCircleSpinner
      :animation-duration="1000"
      :size="60"
      color="#ff1d5e"
      class="
        absolute
        top-1/2
        left-1/2
        transform
        -translate-x-1/2 -translate-y-1/2
      "
      v-if="isLoading"
    />
    <Form
      id="loginForm"
      @submit="onSubmit"
      class="
        w-1/4
        h-max
        shadow-2xl
        ml-auto
        mr-12
        my-auto
        p-8
        rounded-3xl
        bg-white
      "
    >
      <p class="text-4xl font-bold w-max mx-auto my-20">
        Signin to your account
      </p>
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
          :rules="validateUsername"
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
          :rules="validatePassword"
        />
        <ErrorMessage class="text-xl font-bold text-red-300" name="password" />
      </div>

      <div
        class="
          w-2/4
          h-16
          border border-black
          flex
          justify-start
          items-center
          rounded-2xl
        "
        type="submit"
      >
        <button class="text-3xl font-bold w-full h-full">Submit</button>
      </div>
      <p class="text-2xl my-4 italic">
        Don't have an account?
        <router-link to="/register" class="text-blue-700">Signup</router-link>
        here!
      </p>
      <router-link to="/forgot" class="text-blue-500 text-2xl italic"
        >Forgot password?</router-link
      >
    </Form>
  </div>
</template>
<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { HalfCircleSpinner } from "epic-spinners";
import axios from "axios";
import axiosClient from "../../axiosClient";
export default {
  name: "Login",

  components: {
    Form,
    Field,
    ErrorMessage,
    HalfCircleSpinner,
  },
  data() {
    const validateUsername = yup
      .string()
      .required()
      .min(4)
      .max(20)
      .matches(/^[a-zZ-a].*/, "Username must start with a letter");
    const validatePassword = yup
      .string()
      .required()
      .min(8)
      .max(20)
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g,
        "Password must contain at least one letter, one number and one special character"
      );
    return {
      validateUsername,
      validatePassword,
      isLoading: false,
    };
  },
  methods: {
    async onSubmit(value) {
      const { username, password } = value;
      const loginForm = document.getElementById("loginForm");
      this.isLoading = true;
      loginForm.classList.add("blur-effect");
      try {
        const response = await axiosClient.post("/auth/login", {
          username,
          password,
        });
        const { data } = response;
        const {token, refreshToken} = data;
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);
        this.$router.push("/");
      } catch (error) {
        console.log(error);
        alert("Wrong username or password!")
      }
      this.isLoading = false;
      loginForm.classList.remove("blur-effect");
    },
  },
  watch: {
    isLoading: {},
  },
};
</script>
<style>
.backgroundImage {
  background-image: url("../../assets/images/background.jpg");
  background-repeat: no-repeat;
}
.blur-effect {
  filter: blur(8px);
  -webkit-filter: blur(8px);
}
</style>
