<template >
  <fieldset class="container border rounded px-5" style="margin-top:80px">
    <legend class=" fw-bold text-primary fs-1 pb-0 pt-5 p-3 text-start">Advanced Search:</legend>

    <form @submit.prevent="api_GET('/search', this.query)" class="px-5 pb-4 text-start">

      <div class="row align-items-center justify-content-between gap-4 p-5">

        <div class="input-container mb-2 col-12 ">
          <label class="form-label fw-bold ms-2 fw-bold " for="city">Street and City: </label>
          <input type="text" placeholder="Ex. Via generale cascino 14 Roma" class="form-control" id="streetNameInput"
              v-model="querySearchText" @input="getSuggestions" />
          <ul class="list-group list-group-flush" v-if="suggestions && suggestions.length > 0">
            <li class="list-unstyled list-group-item-action list-group-item" v-for="suggestion in suggestions"
                :key="suggestion.id" @click="selectSuggestion(suggestion)">
              {{ suggestion.address.freeformAddress + ' ' + suggestion.address.country }}
            </li>
          </ul>
        </div>

        <!-- rooms -->

        <div class="input-container pb-2 col-3 text-start ">
          <label class="form-label fw-bold fw-bold" for="min_rooms">min Rooms number: </label>
          <select v-model="query.min_rooms" class="form-control" id="min_rooms" name="min_rooms">
            <option v-for="i in 5" :key="i" :value="i">
              {{ i == 5 ? i + ' +' : i }}
            </option>
          </select>
        </div>

        <!--     {{-- BEDROOMS QTY ------------- --}} -->

        <div class="input-container text-start pb-2 col-3">
          <label class="form-label fw-bold" for="min_beads ">min Beds number</label>
          <select
              v-model="query.min_beds"
              class="form-control"
              id="min_beads"
              name="min_beads">
            <option v-for="i in 5" :key="i" :value="i">
              {{ i == 5 ? i + ' +' : i }}
            </option>
          </select>
        </div>

        <!-- radius --------->

        <div class="mb-2 col-3">
          <label class="form-label fw-bold me-2 text-start" for="radiusInput">Radius (km)</label>
          <select v-model="query.radius" class="form-control " name="radiusInput" value="20">
            <option value="20">20</option>
            <option value="10">10</option>
            <option value="5">-5</option>
          </select>
        </div>

      </div>
      <div class="input-container pb-2 col-12">
        <label class="form-label fw-bold d-block pb-3 ">choose serviceses:</label>
        <div class="input-container pb-2 row justify-content-center">

          <div
              class=" col row  row-cols-1 row-cols-md-2 row-cols-lg-3 justify-content-between align-items-baseline mx-0 ">
            <div v-for="(service, i) in services" :key="i"
                class="col text-center d-flex align-items-center py-2">

              <input class="form-check" type="checkbox"
                  :value="service.id" id="service_{{i}}" v-model="query.services">
              <label
                  for="service_{{i}}">
                <i><img :src="'../../public/services-icons/' + service.icon" alt="" /></i>

                {{ service.name == 'Aria Condizionata' ? 'Clima' : service.name }}
              </label>

            </div>
          </div>
        </div>
      </div>

      <div class="d-flex justify-content-center gap-3">
        <button class="btn btn-secondary" typeof="reset" :disabled="loading"> Annulla
        </button>
        <button class="btn btn-success" :disabled="loading">
          <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          Invia
        </button>
      </div>
    </form>
  </fieldset>




  <section v-if=" selectedSuggestion &&  apartments" class="pt-5 mt-5">
    <div class="container-fluid px-5">
      <h1 class="p-5" >Appartamenti nel raggio di {{ query.radius }}km da {{ selectedSuggestion }}</h1>
 

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
      <Pagination :pagination="pagination"
          :query="query"
          @api_GET="api_GET"></Pagination>

    </div>
  </section>
</template>

<script>
import axios from 'axios';
import { store, titles } from '../store';
import SingleCardApartment from '../components/SingleCardApartment.vue';
import Pagination from '../components/Pagination.vue';
export default {
  components: { SingleCardApartment, Pagination },
  name: 'AdvancedSearch',
  data() {
    return {
      store,
      services: [],
      /*  */
      querySearchText: null,
      suggestions: null,
      selectedSuggestion: null,
      querySearch: '',

      api_key: '.json?storeResult=false&limit=6&countrySet=IT&view=Unified&key=OwsqVQlIWGAZAkomcYI0rDYG2tDpmRPE',
      baseUrl: 'https://api.tomtom.com/search/2/geocode/',
      pagination: null,
      apartments: null,

      query: {
        lat: '',
        lon: '',
        radius: 20,
        min_rooms: 1,
        min_beds: 1,
        services: [],
      }
    }
  },
  methods: {
    // nuova funzione------------------------------------------------------------

    getSuggestions() {
      this.selectedSuggestion = "";
      if (this.querySearchText.length > 0) {
        axios.get(`https://api.tomtom.com/search/2/geocode/${this.querySearchText}.json?storeResult=false&limit=5&countrySet=IT&view=Unified&key=OwsqVQlIWGAZAkomcYI0rDYG2tDpmRPE`)
          .then((resp) => {
            /* 	console.log(resp.data.results); */
            this.suggestions = resp.data.results;
            console.log(this.suggestions);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.suggestions = [];
      }
    },

    selectSuggestion(suggestion) {
      this.querySearchText = (suggestion.address.freeformAddress + ', ' + suggestion.address.country);
      this.query.lat = suggestion.position.lat;
      this.query.lon = suggestion.position.lon;
      console.log(this.query)

      this.suggestions = [];
    },

    /* RECUPERA LISTA SERVIZI DISPONIBILI PER APPARTAMENTO */
    fetchServices() {
      let apiUrl = `${this.store.backedRootUrl}/api/services`;
      axios
        .get(`${apiUrl}`)
        .then((resp) => {
          this.store.submitResult = 'success';
          this.store.loading = false;
          this.services = resp.data;
        })
        .catch((e) => {
          if (e.response && e.response.data) {
            this.store.submitResult = e.response.data.message;
          } else {
            this.store.submitResult = e.message;
          }
          console.log(e);
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

    api_GET(thisRoutePath, payload, page) {
      let apiUrl = `${this.store.backedRootUrl}/api${thisRoutePath}`;
      console.log('URL', apiUrl);
      this.selectedSuggestion = this.querySearchText
      axios
        .get(`${apiUrl}`, {
          params: {
            ...page,
            ...payload
          },
        })
        .then((resp) => {
          this.store.submitResult = 'success';
          this.store.loading = false;

          console.log("GET", resp.data)
          this.apartments = { ...resp.data.data };
          this.pagination = { ...this.omitKey(resp.data, 'data') };
        })
        .catch((e) => {
          if (e.response && e.response.data) {
            this.store.submitResult = e.response.data.message;
          } else {
            this.store.submitResult = e.message;
          }
          console.log(e);
        });
    },
    /* CHIAMATA A GEOCODE TOM TOM RECUPERA LAT LONG E ADDRESS DA STRINGA */
    fetchTomTom() {
      if (this.selectSuggestion) {
        // axios.get("https://api.tomtom.com/search/2/geocode/De%20Ruijterkade%20154,%201011%20AC,%20Amsterdam.json?key=lAYuyhutioeCVRvHVSZgBC8wf8CPcO0E").then((resp) => {
        axios.get(this.baseUrl + encodeURIComponent(this.selectedSuggestion) + this.api_key).then((resp) => {
          console.log(resp);

          if (resp.data.results.length) {
            this.querySearchText = resp.data.results[0].address.freeformAddress;
            this.query.lat = resp.data.results[0].position.lat;
            this.query.lon = resp.data.results[0].position.lon;

            console.log(this.query);

            this.api_GET('/search', this.query);
          } else {
            return alert(
              'Ricerca non valida, inserisci un indirizzo valido!'
            );
          }
        });
      };
    },
    /* recupero i dati e li assegno alle variabili del form */
    fechRedirectData() {
      this.querySearchText = this.$route.query.homeSearchAddress;
      this.selectedSuggestion = this.querySearchText;
      this.query.lat = this.$route.query.lat;
      this.query.lon = this.$route.query.lon;
      console.log(this.query);
      //faccio partire il get sui dati che ho aggiornato al redirect
  
     this.api_GET('/search', this.query); 
    }
  },
  mounted() {
    //asssegno titolo
    titles(this.$route.meta.title);
    //recupero i services per form
    this.fetchServices();
    //recupero i dati del redirect se c'?? (modifica url!!)
    this.fechRedirectData();
  },
  beforeUpdate() {
    //reset submitREsult
    this.store.submitResult = '';
  },
  created() { },
};
</script>
<style lang="scss" scoped>
@use '../styles/generic.scss';
@use '../styles/partials/variables' as *;

i {
  img {
    width: 25px;
    margin-left: 0.7rem;
  }
}
</style>
