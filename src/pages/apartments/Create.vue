<template>
  <h1>Apartments Create</h1>
</template>

<script>
import { titles } from '../../store';
import { router } from "./../../router"
export default {
  name: "Apartments Create",
  components: {},
  data() {
    return {
      apartments: [],
    }
  },
  methods: {
    getTitle(to) {

      router.beforeEach((to, from, next) => {
        console.log(to)
        // Get the page title from the route meta data that we have defined
        // See further down below for how we setup this data
        const title = to.meta.title
        // If the route has a title, set it as the page title of the document/page
        if (title) {
          Document.title = title
        }
        next()
      })
    }

  },
  mounted() {
    titles(this.$route.meta.title);
  
  },
  created() {
  }
}
</script>


<style lang="scss" scoped>
@use "../../styles/generic.scss";
@use "../../styles/partials/variables" as *;
</style>