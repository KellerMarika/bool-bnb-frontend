<template >
  <div class="container">
    <form @submit.prevent="fetchTomTom">
      <div class="d-flex align-items-center justify-content-around gap-4 p-5">
        <div class="input-container mb-2 col-3 ">
          <label class="form-label ms-2" for="city">Street and City</label>
          <input type="text" placeholder="Ex. Via generale cascino 14 Roma" class="form-control" id="streetNameInput"
              v-model="address" />
        </div>

        <!-- rooms -->

        <div class="input-container pb-2 col-3 text-center">
          <label class="form-label" for="min_rooms">min Rooms number</label>
          <select v-model="query.min_rooms" class="form-control" id="min_rooms" name="min_rooms">
            <option v-for="i in 5" :key="i" :value="i">
              {{ i == 5 ? i + ' +' : i }}
            </option>
          </select>
        </div>

        <!--     {{-- BEDROOMS QTY ------------------------------------------------------------------ --}} -->

        <div class="input-container text-center pb-2 col-3 ">
          <label class="form-label" for="min_beads">min Beds number</label>
          <select v-model="query.min_beds" class="form-control" id="min_beads" name="min_beads">
            <option v-for="i in 5" :key="i" :value="i">
              {{ i == 5 ? i + ' +' : i }}
            </option>
          </select>
        </div>

        <!-- radis --------------------------------------------------------------------------------------- -->

        <div class="mb-2 col-3 text-end">
          <label class="form-label me-2" for="radiusInput">Radius (km)</label>
          <select v-model="query.radius" class="form-control text-center fw-semibold" name="radiusInput" value="20">
            <option value="20">20</option>
            <option value="10">10</option>
            <option value="5">-5</option>
          </select>
        </div>

        <!-- <selectinput  class="form-control" type="number" id="radiusInput" v-model="query.radius" min="1" max="100"> -->
      </div>
      <div class="input-container pb-2 col-12">
        <div class="input-container pb-2">
          <label class="form-label d-block">SERVICES:</label>
          <div class="row">
            <div v-for="(service, i) in services" :key="i"
                class="col d-flex align-items-center">
              <input class="form-check me-1" type="checkbox"
                  :value="service.id" id="service_{{i}}" v-model="query.services">
              <label
                  for="service_{{i}}">{{ service.name == 'Aria Condizionata' ? 'Clima' : service.name }}
              </label>
              <i><img :src="'../../public/services-icons/' + service.icon" alt="" /></i>
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

  </div>
</template>
<script>
import axios from 'axios';
import { store, titles } from '../store';
export default {
  name: 'AdvancedSearch',
  data() {
    return {
      store,
      services: [],
      address: '',
      querySearch: '',

      api_key: '.json?key=OwsqVQlIWGAZAkomcYI0rDYG2tDpmRPE',
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

    api_GET(thisRoutePath, payload) {
      let apiUrl = `${this.store.backedRootUrl}/api${thisRoutePath}`;
      console.log('URL', apiUrl);

      axios
        .get(`${apiUrl}`, {
          params: payload,
        })
        .then((resp) => {
          this.store.submitResult = 'success';
          this.store.loading = false;

          /*      console.log("GET", resp.data) */
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
      // axios.get("https://api.tomtom.com/search/2/geocode/De%20Ruijterkade%20154,%201011%20AC,%20Amsterdam.json?key=lAYuyhutioeCVRvHVSZgBC8wf8CPcO0E").then((resp) => {
      axios.get(this.baseUrl + this.address + this.api_key).then((resp) => {
        console.log(resp);

        if (resp.data.results.length) {
          this.querySearch = resp.data.results[0].address.freeformAddress;
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
    },
  },
  mounted() {
    titles(this.$route.meta.title);
    this.fetchServices();
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