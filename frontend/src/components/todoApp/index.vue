<template>
  <div class="w-full mx-auto p-4 border border-black h-full relative flex">
    <div id="main" class="w-full border border-black flex py-2 flex-wrap">
      <div id="nav-bar" class="w-full h-20 border border-black mx-4"></div>
      <div class="break"></div>
      <div class="w-full flex h-90p my-2">
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
              bg-yellow-400
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
                bg-yellow-200
              "
            >
              <img
                src="../../assets/images/to-do-list.png"
                alt=""
                class="w-12 h-12"
              />
            </div>
            <div class="mx-4">
              <p>To-do</p>
              <p class="text-lg">Last update {{ now }}</p>
            </div>
          </div>
          <div class="text-2xl font-semibold px-4 flex items-center">
            <div class="w-4 h-4 bg-yellow-300 mx-4"></div>{{ todos.length }} Tasks
          </div>
          <div class="tasks overflow-y-auto" style="height: 75%">
            <div v-for="(item, index) in todos" class="w-90p bg-yellow-200 my-4 mx-auto rounded-xl px-4">
            <div class="title text-3xl font-bold mb-8 ml-4">{{ item.title }}</div>
            <div class="content text-xl  px-2">{{item.content}}</div>
            </div>
          </div>
        </div>
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
              bg-blue-400
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
                bg-blue-200
              "
            >
              <img
                src="../../assets/images/inprogress.png"
                alt=""
                class="w-12 h-12"
              />
            </div>
            <div class="mx-4">
              <p>In Progress</p>
              <p class="text-lg">Last update {{ now }}</p>
            </div>
          </div>
          <div class="text-2xl font-semibold px-4 flex items-center">
            <div class="w-4 h-4 bg-blue-300 mx-4"></div
            >{{ inProgress.length }} Tasks
          </div>
          <div class="tasks overflow-y-auto" style="height: 75%">
            <div v-for="(item, index) in inProgress" class="w-90p bg-blue-200 my-4 mx-auto rounded-xl px-4">
            <div class="title text-3xl font-bold mb-8 ml-4">{{ item.title }}</div>
            <div class="content text-xl  px-2">{{item.content}}</div>
            </div>
          </div>
        </div>
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
              <img
                src="../../assets/images/done.png"
                alt=""
                class="w-12 h-12"
              />
            </div>
            <div class="mx-4">
              <p>Done</p>
              <p class="text-lg">Last update {{ now }}</p>
            </div>
          </div>
          <div class="tasks overflow-y-auto" style="height: 75%">
            <div v-for="(item, index) in done" class="w-90p bg-purple-200 my-4 mx-auto rounded-xl px-4">
            <div class="title text-3xl font-bold mb-8 ml-4">{{ item.title }}</div>
            <div class="content text-xl  px-2">{{item.content}}</div>

            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="user" class="w-1/4 border border-black relative z-0">
      <button
        class="
          absolute
          w-8
          h-8
          border border-black
          rounded-full
          text-center
          transform
          -translate-x-1/2
          top-1/2
          bg-white
        "
        @click="toggleUserFrame"
      >
        M 
      </button>
    </div>
  </div>
</template>
<script>
import moment from "moment";

export default {
  name: "TodoApp",
  components: {},
  data() {
    return {
      todos: [
        {
          id: 1,
          title: "xin chao",
          isDone: 1,
          content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores neque corporis explicabo dolorum sequi, nobis exercitationem consequatur quod voluptatum excepturi suscipit in unde modi perferendis. Libero mollitia doloremque voluptatibus facilis.",
          level: "high",
        },
        {
          id: 2,
          title: "xin chao",
          isDone: 0,
          level: "medium",
        },
      ],
      inProgress: [
        {
          id: 1,
          title: "Dang lam",
          isDone: 1,
          content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores neque corporis explicabo dolorum sequi, nobis exercitationem consequatur quod voluptatum excepturi suscipit.",
          level: "high",
        },
        {
          id: 1,
          title: "Dang lam",
          isDone: 1,
          content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores neque corporis explicabo dolorum sequi, nobis exercitationem consequatur quod voluptatum excepturi suscipit.",
          level: "high",
        },
        {
          id: 1,
          title: "Dang lam",
          isDone: 1,
          content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores neque corporis explicabo dolorum sequi, nobis exercitationem consequatur quod voluptatum excepturi suscipit.",
          level: "high",
        },
        {
          id: 1,
          title: "Dang lam",
          isDone: 1,
          content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores neque corporis explicabo dolorum sequi, nobis exercitationem consequatur quod voluptatum excepturi suscipit.",
          level: "high",
        },
      ],
      done: [
        {
          id: 1,
          title: "Da xong",
          isDone: 1,
          content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores neque corporis explicabo dolorum sequi, nobis exercitationem consequatur quod voluptatum excepturi suscipit.",
          level: "high",
        },
      ],
      levels: ["low", "medium", "high"],
    };
  },
  methods: {
    toggleUserFrame(event) {
      const userFrame = document.getElementById("user");
      if (userFrame.classList.contains("hideUser")) {
        userFrame.classList.remove("hideUser");
        userFrame.classList.add("w-1/4");
      } else {
        userFrame.classList.add("hideUser");
        userFrame.classList.remove("w-1/4");
      }
    },
  },
  watch: {},
  computed: {
    now: () => {
      return moment().format("DD/MM/YYYY");
    },
  },
};
</script>
<style>
.break {
  flex-basis: 100%;
  height: 0;
}
.hideUser{
  width: 1.2rem;
}
</style>
