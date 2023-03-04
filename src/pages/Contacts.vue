<template>
  <h1 class="text-uppercase">CONTATTI</h1>
</template>

<script>
import axios from 'axios';
import { titles } from '../store';
export default {
  components: {},
  data() {
    return {
      
    }
  },
  methods: {
    
  },
  mounted() {
    titles(this.$route.meta.title); 
  },
  created() {
  }
}
</script>
<style lang="scss" scoped>
@use "../styles/generic.scss";
@use "../styles/partials/variables" as *;
</style>