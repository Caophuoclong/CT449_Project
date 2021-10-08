<template lang="">
  <div class="w-1/3 h-full mx-4">
    <div
      class="
        w-90p
        my-4
        mx-auto
        text-3xl
        font-bold
        flex
        items-center
        p-4
        rounded-2xl
        bg-purple-400
      "
    >
      <div
        class="
          w-20
          h-20
          rounded-3xl
          flex
          justify-center
          items-center
          bg-purple-200
        "
      >
        <img src="../../../assets/images/done.png" alt="" class="w-12 h-12" />
      </div>
      <div class="mx-4">
        <p>Done</p>
        <p class="text-lg">Last update {{ now }}</p>
      </div>
    </div>
    <div class="tasks overflow-y-auto" style="height: 75%">
      <div
        v-for="(item, index) in done"
        class="w-90p bg-purple-200 my-4 mx-auto rounded-xl p-4"
      >
        <div class="title text-3xl font-bold mb-8 ml-4">{{ item.title }}</div>
        <div class="content text-xl px-2">{{ item.content }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    name:"DoneTask",
    props: {
        done: Array,
        now: String,
    },
}
</script>
<style lang=""></style>
