<template>

  <TheHeader></TheHeader>
  <div class=" a flex-fill">
    <router-view ></router-view>
  </div>

  <TheFooter />
  </template>
  
  <script>
  import TheFooter from "./components/TheFooter.vue";
import TheHeader from "./components/TheHeader.vue";
  export default {
    components: { TheHeader, TheFooter },
    data() {
      return {
      }
    },
    methods: {
  
    },
    mounted() {
    },
    created() {
    }
  }
  </script>
  <style lang="scss">
  @use "./styles/generic.scss";
  @use "./styles/partials/variables" as *;
  a{
    flex-grow: 10;
  }
  </style>