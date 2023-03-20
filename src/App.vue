<template>

  <TheHeader></TheHeader>
    <router-view></router-view>
  <TheFooter/>
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
  
  </style>