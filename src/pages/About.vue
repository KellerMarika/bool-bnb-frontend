


<template>
  <TheHeaderVue />
  <h1 class="text-uppercase">about</h1>
  <TheFooterVue/>
</template>

<script>
import { titles } from '../store';
import { store } from '../store';
import TheHeader from '../components/TheHeader.vue';
import TheFooter from '../components/TheFooter.vue';

export default {
  name:"About",
  components: { TheHeader, TheFooter },
  data() {
    return {
      store,
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