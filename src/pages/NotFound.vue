<template>
 <div class="not-found container text-center py-5">
  <H1>404 NOT FOUND</H1>
  <router-link to="/" class="btn btn-primary m-3"> TORNA ALLA HOME </router-link>
 </div>
</template>

<script>
import { titles } from '../store';
export default {
 name: "NotFound",
 data() {

 },
 mounted() {
  titles(this.$route.meta.title);
 }
};
</script>
<style></style>