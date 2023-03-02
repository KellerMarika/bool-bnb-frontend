<template>
 <h1>Apartments Index</h1>
</template>

<script>
import { api_GET } from '../../store';
export default {
 name: "Apartments Index",
 components: {},
 data() {
  return {
   apartments: [],
  }
 },
 methods: {

 },
 mounted() {
/* api_GET(this.$route.fullPath, this.filterParams) */
 },
 created() {
 }
}
</script>


<style lang="scss" scoped>
@use "../../styles/generic.scss";
@use "../../styles/partials/variables" as *;
@import 'bootstrap/scss/_functions';
@import 'bootstrap/scss/_variables';
@import 'bootstrap/scss/mixins/_breakpoints';
</style>