<template>
  <div class="h-3/4 w-30-rem border-2 border-black mx-auto my-40 p-8">
    <div class="h-1/2 mt-20">
      <div
        class="
          w-full
          h-20
          border
          flex
          justify-center
          items-center
          text-3xl
          font-bold
        "
      >
        {{ cityName }}
      </div>
      <div
        class="
          w-1/2
          mx-auto
          border-2 border-black
          my-8
          text-3xl
          font-bold
          text-center
        "
      >
        {{temp}}°C
      </div>

      <div
        class="
          w-3/4
          text-center
          border-2 border-black
          mx-auto
          text-3xl
          font-bold
        "
      >
        {{description}}
      </div>
    </div>

    <div
      class="h-10 w-1/2 border-2 border-black my-4"
      v-for="(item, index) in object"
      :key="index"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script>
import axios from "axios";

const object = [
  {
    name: "An Giang",
    temp: 26,
    status: "troi hom nay dep qua",
  },
  {
    name: "An Giang",
    temp: 26,
    status: "troi hom nay dep qua",
  },
];

export default {
  name: "Weather",
  data() {
    return {
      object,
      cityName: '',
      temp: '',
      description: '',
    };
  },

  methods:{
    getWeather: function (){
    const apiKey = "031a8e22affaa43ce09c0a84a8b3f29";
    const cityId = "1594446"
    const url = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apiKey}c&units=metric`
    axios.get(url).then(res=>{
        const {data} = res;
        const {main, name, weather} = data;
        const {description} = weather[0];
        const {temp} = main;
        this.cityName = name;
        this.temp = temp;
        this.description = description;
        
    }).catch(err=>{
        console.log(err);
    })


},

  },
  beforeMount(){
      this.getWeather();
  },
};
</script>

<style></style>
