<template>
 <h1>Apartments Edit</h1>
</template>

<script>
import { titles } from '../../store';

export default {
 name: "Apartments Edit",
 components: {},
 data() {
  return {
   apartments: [],
  }
 },
 methods: {

 },
 mounted() {
  titles(this.$route.meta.title+this.$route.params.id);
 }
}
</script>


<style lang="scss" scoped>
@use "../../styles/generic.scss";
@use "../../styles/partials/variables" as *;
</style>