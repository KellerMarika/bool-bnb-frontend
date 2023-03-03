<template>
  <div class="container">
  <h1 class="text-danger">HOME</h1>
  <i ></i>
</div>
</template>

<script>
import { titles } from '../store';
export default {
  name: 'Home',
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