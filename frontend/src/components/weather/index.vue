<template>
  <div class="h-3/4 w-40-rem border-2 border-black mx-auto my-40 p-8">
    <div class="rounded-3xl border border-black px-2 mb-8 w-1/2">
      <select
        v-model="itemKey"
        name="province"
        id="provice"
        class="w-60 outline-none border-black text-2xl focus:outline-none"
      >
        <option
          v-for="(item, index) in Provinces"
          :key="item.level1_id"
          v-bind:value="index"
        >
          {{ item.name }}
        </option>
      </select>
    </div>
    <div class="h-1/2 mt-20">
      <h1>{{ item }}</h1>
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
        {{ temp }}°C
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
        <img class="inline" v-bind:src="imgSrc" alt="" /> -
        {{ description.charAt(0).toUpperCase() + description.slice(1) }}
      </div>
    </div>

    <!-- <div
      class="h-10 w-1/2 border-2 border-black my-4"
      v-for="(item, index) in object"
      :key="index"
    >
      {{ item.name }}
    </div> -->
  </div>
</template>

<script>
import axios from "axios";
import Provinces from "./dvhcvn";
export default {
  name: "Weather",
  data() {
    return {
      itemKey: 89,
      cityName: "",
      imgSrc: "",
      temp: "",
      description: "",
      Provinces,
    };
  },

  methods: {
    getWeather: function (name, nameType) {
      const apiKey = "62279eb69a101ae6b8c5619e51d5509f";
      const xxx = [name, nameType];
      console.log(xxx);
      xxx.some((value) => {
        const url = `http://pro.openweathermap.org/data/2.5/weather?q=${value}&appid=${apiKey}&units=metric`;
        axios
          .get(url)
          .then((res) => {
            const { data } = res;
            const { main, weather } = data;
            const { description } = weather[0];
            const { icon } = weather[0];
            const { temp } = main;
            console.log(icon);
            this.imgSrc = `http://openweathermap.org/img/wn/${icon}@2x.png`;
            this.cityName = name;
            this.temp = temp;
            this.description = description;
            return false;
          })
          .catch((err) => {
            console.log(err);
            return true;
          });
      });
    },
    titleCase: function (str) {
      var splitStr = str.toLowerCase().split(" ");
      for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] =
          splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
      }
      return splitStr.join(" ");
    },
  },
  onchange: function (event) {
    console.log(event);
  },
  watch: {
    itemKey(index) {
      let name;
      if (Provinces[index].type === "Thành phố Trung ương") {
        name = Provinces[index].name.replace("Thành phố", " ").trim();
      } else if (Provinces[index].type === "Tỉnh") {
        name = Provinces[index].name.replace("Tỉnh", " ").trim();
      }
      this.getWeather(name, Provinces[index].name);
    },
  },
  beforeMount() {
    let index = 56;
    let name;
    if (Provinces[index].type === "Thành phố Trung ương") {
      name = Provinces[index].name.replace("Thành phố", " ").trim();
      console.log(name);
    } else if (Provinces[index].type === "Tỉnh") {
      name = Provinces[index].name.replace("Tỉnh", " ").trim();
      console.log(name);
    }
    this.getWeather(name, Provinces[index].name);
  },
};
</script>

<style></style>
