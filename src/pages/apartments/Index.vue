<template>
 <h1>Apartments Index</h1>
</template>

<script>
/* import{axios} from 'axios' */
import { api_GET } from '../../store';
import { titles } from '../../store';
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

 titles(this.$route.meta.title); 
 api_GET(this.$route.meta.apiRoutePath);
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