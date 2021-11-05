<template >
        <div class="w-full h-full bg-nord3">
    <form
      @submit.prevent="onSubmit"
      class="w-1/2 h-1/2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-black p-4 rounded-3xl flex justify-center items-center flex-wrap"
    >
      <h1 class="text-5xl">Đăng ký</h1>
            <div class="break"></div>

      <div
        class="flex content-center items-center bg-nord1 text-white w-1/2 border border-white text-5xl rounded-3xl p-4 ring-4 ring-white focus:ring-yellow-300 group m-8"
      >
        <input
          class="w-11/12 bg-transparent focus:outline-none placeholder-opacity-25 mx-4 group-focus:ring-yellow-300"
          type="text"
          placeholder="Email"
          name="email"
        />
        <font-awesome-icon size="1x" icon="email"></font-awesome-icon>
      </div>
      <div class="break"></div>
      <div
        class="flex content-center items-center bg-nord1 text-white w-1/2 border border-white text-5xl rounded-3xl p-4 ring-4 ring-white focus:ring-yellow-300 group m-8"
      >
        <input
          class="w-11/12 bg-transparent focus:outline-none placeholder-opacity-25 mx-4 group-focus:ring-yellow-300"
          type="text"
          placeholder="Username"
          name="username"
        />
        <font-awesome-icon size="1x" icon="user"></font-awesome-icon>
      </div>
      <div class="break"></div>
      <div
        class="flex content-center items-center bg-nord1 text-white w-1/2 border border-white text-5xl rounded-3xl p-4 ring-4 ring-white focus:ring-yellow-300 group m-8"
      >
        <input
          class="w-11/12 bg-transparent focus:outline-none placeholder-opacity-25 mx-4 group-focus:ring-yellow-300"
          type="password"
          placeholder="Password"
          name="password"
        />
        <font-awesome-icon size="1x" icon="key"></font-awesome-icon>
      </div>
      <div class="break"></div>
      <button
        class="text-5xl p-8 border border-white ring-2 ring-white rounded-3xl text-white"
        type="submit"
      >
        Đăng ký
      </button>
    </form>
  </div>
</template>
<script>
import router from "../routers/index"
export default {
    name: "SignUp",
    methods:{
        async onSubmit(event){
            const username = event.target.username.value;
            const email = event.target.email.value;
            const password = event.target.password.value;
            const data = {username, email, password};
            const response = await this.$store.dispatch('register', data);
            if(response.status === 200){
                this.$toast.open({
                    message: 'Đăng ký thành công',
                    type: 'success',
                    position: 'top-right',
                    duration: 1000
                });
                router.push('/signin');
            }else{
                this.$toast.open({
                    message: 'Đăng ký thất bại',
                    type: 'error',
                    position: 'top-right',
                    duration: 1000
                });
            }
        }
    }
    
}
</script>
