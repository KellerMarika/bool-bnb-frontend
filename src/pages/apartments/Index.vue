<template>
 <h1>Apartments Index</h1>
 <div v-if="store.list" v-for="element in store.list">evelyn dormi</div>
</template>

<script>
/* import{axios} from 'axios' */
import { api_GET,store } from '../../store';
import { titles } from '../../store';
export default {
 name: "Apartments Index",
 components: {},
 data() {
  return {
   store,
   apartments: null,
   pagination:null
  }
 },
 methods: {
 },
 mounted() {

 titles(this.$route.meta.title); 
 api_GET(this.$route.meta.apiRoutePath,this.apartments);
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