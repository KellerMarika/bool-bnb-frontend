
import TheFooter from '../components/TheFooter.vue';

<template>
  <TheHeaderVue />
  <h1 class="text-uppercase">abaut</h1>
  <TheFooterVue/>
</template>

<script>
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
  },
  created() {
  }
}
</script>
<style lang="scss" scoped>
@use "../styles/generic.scss";
@use "../styles/partials/variables" as *;
</style>