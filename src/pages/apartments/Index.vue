<template>
  <h1>Apartments Index</h1>

  <!-- pagination  -->
  <!--   <div v-if="store.apartmentsList" v-for="element in store.apartmentsList"> -->


  <router-link v-for="apartment in store.apartmentsList"
      :to="{ name: 'Apartments.show', params: { id: apartment.id } }"
      v-slot="{ singleCard }"

      class="card  my-4 overflow-hidden shadow">
    <!-- CARD -->

    <div :is="singleCard" :apartment='apartment' class="card"> card{{ apartment.title }}</div>

  </router-link>
  <!--     <div class="card"> card</div> -->

  <!--   </div> -->



  <!-- pagination  -->
  <div v-if="apartments" v-for="element in apartments">evelyn in braccio</div>
</template>

<script>
/* import{axios} from 'axios' */
import { api_GET, store } from '../../store';
import { titles } from '../../store';
export default {
  name: "Apartments Index",
  components: {},
  data() {
    return {
      store,
      apartments: null,
      pagination: null
    }
  },
  methods: {
  },
  mounted() {

    titles(this.$route.meta.title);
    api_GET(this.$route.meta.apiRoutePath, this.apartments);
    /*  if (this.store.list) {
            console.log("daiiii")
            this.apartments = {...store.list}
    
          } */
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