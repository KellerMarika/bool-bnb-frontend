<template>
  <section>
    <div class="container">
      <h1>Apartments Index</h1>
      <!-- pagination up -->
      <div class="row g-4">

      <!-- LINK ALLO SHOW -->
      <router-link v-for="apartment in apartments"
        :to="{ name: 'Apartments.show', params: { id: apartment.id } }"
        v-slot="{ singleCard }" class=" col-xl-2 col-lg-3 col-md-4 col-sm-6 card-group my-4">

        <!-- CARD -->
        <SingleCardApartment :is="singleCard" :apartment='apartment'> </SingleCardApartment>
      </router-link>

      <!-- pagination down -->
    </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import { store } from '../../store';
import { titles } from '../../store';
import SingleCardApartment from '../../components/SingleCardApartment.vue'
export default {
  name: "Apartments Index",
  components: { SingleCardApartment },
  data() {
    return {
      store,
      apartments: null,
      pagination: null
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
    api_GET(thisRoutePath, payload) {

      let apiUrl = `${this.store.backedRootUrl}/api${thisRoutePath}`
      console.log("URL", apiUrl);

      axios.get(`${apiUrl}`, {
        params: payload
      })
        .then((resp) => {
          this.store.submitResult = "success";
          this.store.loading = false;

          /*      console.log("GET", resp.data) */
          this.apartments = { ...resp.data.data }
          this.pagination = { ...this.omitKey(resp.data, "data") }
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
    this.api_GET(this.$route.meta.apiRoutePath, this.apartments)
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