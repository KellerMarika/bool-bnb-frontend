<template>
  <section>
    <div class="container">
      <h1>Apartments Index</h1>

      <!-- PAGINAZIONE SOPRA -->
      <Pagination :pagination="pagination" @fetchProjectLists="fetchProjectLists"></Pagination>

      <!-- pagination up -->
      <div class="row g-4">

        <!-- LINK ALLO SHOW -->
        <router-link v-for="apartment in apartments"
            :to="{ name: 'Apartments.show', params: { id: apartment.id } }"
            v-slot="{ singleCard }" class=" col-xl-2 col-lg-3 col-md-4 col-sm-6 card-group my-4">

          <!-- CARD -->
          <SingleCardApartment :is="singleCard" :apartment='apartment'> </SingleCardApartment>
        </router-link>
      </div>

      <!-- PAGINAZIONE SOTTO -->
      <Pagination :pagination="pagination" @fetchProjectLists="fetchProjectLists"></Pagination>



    </div>
  </section>
</template>

<script>
import axios from 'axios';
import { store } from '../../store';
import { titles } from '../../store';
import SingleCardApartment from '../../components/SingleCardApartment.vue';
import Pagination from '../../components/pagination.vue';
export default {
  name: "Apartments Index",
  components: { SingleCardApartment, Pagination },
  data() {
    return {
      store,
      apartments: null,
      pagination: [],
/*       queries:{
        page:2
      } */
    }
  },
  methods: {

    /* FUNZIONE ESCLUDI CHIAVE DA OGGETTO (per pagination) */
    /** omit({ a: 1, b: 2, c: 3 }, 'c')  // {a: 1, b: 2}
     * 
     * @param {object} obj 
     * @param {string} omitKey 
     */
    omitKey(obj, omitKey) {
      return Object.keys(obj).reduce((result, key) => {
        if (key !== omitKey) {
          result[key] = obj[key];
        }
        return result;
      }, {});
    },

    /**FUNZIONE API CALL GET (index).........................
     * 
     * @param {string} thisRoutePath  es= 'apartments/create'
     * @param {object} payload es=  {pagination:3}
     */
    fetchProjectLists(payload) {

      let apiUrl = `${this.store.backedRootUrl}/api${this.$route.meta.apiRoutePath}`
      console.log("URL", apiUrl);

      axios.get(`${apiUrl}`, {
        params: payload
      })
        .then((resp) => {
          this.store.submitResult = "success";
          this.store.loading = false;



          this.apartments = { ...resp.data.data }
          this.pagination = { ...this.omitKey(resp.data, "data") }
          console.log("PAGINATION", this.pagination.links)
        })
        .catch((e) => {

          if (e.response && e.response.data) {
            this.store.submitResult = e.response.data.message;
          } else {
            this.store.submitResult = e.message;
          }
          console.log(e);
        });
    }
  },
  mounted() {

    titles(this.$route.meta.title);
    this.fetchProjectLists(this.queries)
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