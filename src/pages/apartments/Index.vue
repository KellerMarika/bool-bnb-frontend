<template>
  <section>
    <div class="container-fluid px-5">
      <h1>Apartments Index</h1>
      <!-- pagination up -->
      <div class="row row-cols-sm-2 row-cols-md-3 row-cols-xl-4 row-cols-xxl-5 g-4 px-md-5">

        <!-- LINK ALLO SHOW -->
        <router-link v-for="apartment in apartments"
            :to="{ name: 'Apartments.show', params: { id: apartment.id } }"
            v-slot="{ singleCard }" class="card-group my-4">
      
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
import Pagination from '../../components/Pagination.vue';
export default {
  name: "Apartments Index",
  components: { SingleCardApartment, Pagination },
  data() {
    return {
      store,
      apartments: null,
      pagination: [],
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

      axios.get(`${apiUrl}`, {
        params: { ...payload }
        /*        params: { "page":payload } */
      })
        .then((resp) => {
          console.log(resp)
          this.store.submitResult = "success";
          this.store.loading = false;



          this.apartments = { ...resp.data.data }
          this.pagination = { ...this.omitKey(resp.data, "data") }
          console.log("PAGINATION", this.pagination)
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