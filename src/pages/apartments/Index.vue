<template>
  <h1>Apartments Index</h1>
  <!-- pagination up -->


  <!-- LINK ALLO SHOW -->
  <router-link v-for="apartment in store.apartmentsList"
      :to="{ name: 'Apartments.show', params: { id: apartment.id } }"
      v-slot="{ singleCard }"

      class="card  my-4 overflow-hidden shadow">

    <!-- CARD -->
    <SingleCardApartment :is="singleCard" :apartment='apartment' class="card"> </SingleCardApartment>
  </router-link>

  <!-- pagination down -->
</template>

<script>
/* import{axios} from 'axios' */
import { api_GET, store } from '../../store';
import { titles } from '../../store';
import SingleCardApartment from '../../components/SingleCardApartment.vue'
export default {
  name: "Apartments Index",
  components: { SingleCardApartment },
  data() {
    return {
      store,
    /*   apartments: null,
      pagination: null */
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