<template>
  <h1>Apartments Show</h1>
</template>

<script>
import { titles } from '../../store';
import { api_GET } from '../../store';
export default {
  name: "Apartments Show",
  components: {},
  data() {
    return {
      apartments: [],
    }
  },
  methods: {

  },
  mounted() {
    console.log(this.$route)
    api_GET(this.$route.fullPath);
    titles(this.$route.meta.title+this.$route.params.id); 
  },
  created() {
  }
}
</script>


<style lang="scss" scoped>
@use "../../styles/generic.scss";
@use "../../styles/partials/variables" as *;
</style>