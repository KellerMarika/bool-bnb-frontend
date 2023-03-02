<template>

  <TheHeader></TheHeader>
    <router-view></router-view>
  
  </template>
  
  <script>
  import TheHeader from "./components/TheHeader.vue";
  export default {
    components: { TheHeader },
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