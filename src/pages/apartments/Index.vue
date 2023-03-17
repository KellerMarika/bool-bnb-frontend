<template>
  <section>
    <div class="container-fluid px-5">

      <div id="map" class="map  border rounded-3 mb-5 m-auto ms-3" style="width:800px; height:800px"> </div>


      <h1>Apartments Index</h1>


      <div class="col-8 m-auto my-5">
        <div class="map" id="map" style="width: 800px; height: 800px;"></div>
      </div>
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

      <Pagination :pagination="pagination" @fetchPageList="fetchPageList"></Pagination>
    </div>
  </section>
</template>

<script>

import tt from '@tomtom-international/web-sdk-maps';
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
      redirectData: {
        address: 'a',
        lat: 'b',
        lon: 'c'
      },


      center: [12.49427, 41.89056],
      markers: [],

    }
  },
  methods: {

    /* MAP :::::::::::::::::::::::::::::::::::::::::::*/
    createMap(center, array) {
      // mappa
      this.map = tt.map({
        key: 'lAYuyhutioeCVRvHVSZgBC8wf8CPcO0E',
        container: 'map',
        center: center,
        zoom: 10,
      });

      /* questo va per uno */
      this.marker = new tt.Marker()
        .setLngLat(center)
        .setPopup(new tt.Popup({ offset: 35 }).setHTML("center"))
        .addTo(this.map);

      Object.keys(array).forEach(key => {
        console.log(array[key])

        new tt.Marker().setLngLat([array[key].longitude, array[key].latitude]).addTo(this.map)
          .setPopup(new tt.Popup({ offset: 35 }).setHTML(array[key].title + '<br/>' + array[key].address))
        /*  console.log(marker) */
      });






    },

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
    fetchPageList(payload) {

      let apiUrl = `${this.store.backedRootUrl}/api${this.$route.meta.apiRoutePath}`

      axios.get(`${apiUrl}`, {
        params: { ...payload }
        /*        params: { "page":payload } */
      })
        .then((resp) => {
          /*  console.log(resp) */
          this.store.submitResult = "success";
          this.store.loading = false;

          this.apartments = { ...resp.data.data }
          this.pagination = { ...this.omitKey(resp.data, "data") }

          /* MAP */
          this.createMap(this.center, this.apartments);
          /*  console.log("PAGINATION", this.pagination) */
        })
        .catch((e) => {

          if (e.response && e.response.data) {
            this.store.submitResult = e.response.data.message;
          } else {
            this.store.submitResult = e.message;
          }
          /*   console.log(e); */
        });
    },

    saveRedirectData() {
      this.redirectData = this.$route.query
    }
  },
  mounted() {

/*     this.createMegaMap(); */
    console.log('REF ' , this.mapRef);

    titles(this.$route.meta.title);
    this.fetchPageList(this.queries)
    /*  this.createMap(this.center); */

    /*  console.log(this.$route.query) */
    this.saveRedirectData();
  },
  watch: {

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