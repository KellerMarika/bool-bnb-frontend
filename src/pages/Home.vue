<template>
  <h1 >HOME</h1>
  <i ></i>
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