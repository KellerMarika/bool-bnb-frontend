<template >
  <div class="bg-main-container position-relative" style="padding-top: 80px;">

    <fieldset class="container form-container border rounded-4 shadow" @click="showActive = false">
      <legend class=" fw-bold text-primary fs-1 pb-0 pt-5 p-3 text-start">
        <i class="fa-solid fa-magnifying-glass-location"></i>
        Ricerca Avanzata:
      </legend>

      <form @submit.prevent="api_SEARCH(this.query)" class="px-5 pb-4 text-start">

        <div class="row align-items-end justify-content-between gap-4 mb-4">

          <!-- SEARCHBAR -->
          <div class="input-container col-12  ">
            <label class="form-label fw-bold ms-2 fw-bold " for="city">Citta e Indirizzo: </label>

            <input type="text" placeholder="Es. Via generale cascino 14 Roma" class="form-control rounded-5"
                id="streetNameInput"
                v-model="query.querySearchText" @input="getSuggestions()" style="max-width: 100%;" />

            <ul class="list-group list-group-flush" v-if="suggestions && suggestions.length > 0">
              <li class="list-unstyled list-group-item-action list-group-item" v-for="suggestion in suggestions"
                  :key="suggestion.id" @click="selectSuggestion(suggestion)">
                {{ suggestion.address.freeformAddress + ' ' + suggestion.address.country }}
              </li>
            </ul>
          </div>

          <div class="row gap-3 align-items-end m-0 p-0">

            <div class="col row row-cols-1 row-cols-md-3 align-items-end">
              <!-- rooms -->
              <div class="input-container pb-2 col text-start ">
                <label class="form-label fw-bold fw-bold" for="min_rooms">min Camere: </label>
                <select v-model="query.min_rooms" class="form-control rounded-5" id="min_rooms" name="min_rooms">
                  <option v-for="i in 5" :key="i" :value="i" class=" bg-transparent">
                    {{ i == 5 ? i + ' +' : i }}
                  </option>
                </select>
              </div>

              <!--     {{-- BEDROOMS QTY ------------- --}} -->

              <div class="input-container text-start pb-2 col">
                <label class="form-label fw-bold" for="min_beads ">min Letti</label>
                <select v-model="query.min_beds" class="form-control rounded-5" id="min_beads" name="min_beads">
                  <option v-for="i in 5" :key="i" :value="i">
                    {{ i == 5 ? i + ' +' : i }}
                  </option>
                </select>
              </div>

              <!-- radius --------->

              <div class="col pb-2 input-container ">
                <label class="form-label fw-bold me-2 text-start" for="radiusInput">Raggio (km)</label>
                <select v-model="query.radius" class="form-control rounded-5 " name="radiusInput" value="20">
                  <option value="20">20</option>
                  <option value="10">10</option>
                  <option value="5">-5</option>
                </select>
              </div>
            </div>

            <div class=" col-12  col-lg-5 row m-0 p-0">
              <!-- services -->
              <div class="input-container  pb-2 col">
                <div class="dropdown w-auto pt-3 ">
                  <button class="btn btn-primary text-light w-100 dropdown-toggle " type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false">Scegli i Servizi:</button>


                  <div class="dropdown-menu p-0 w-100">
                    <div class="dropdown-toggle position-relative">
                      <div v-for="(service, i) in services" :key="i" class="text-center d-flex align-items-center ">


                        <label for="service_{{i}}"
                            class=" service-label dropdown-item d-flex gap-2 h-100 w-100 position-relative py-2"
                            :class="(query.services.includes(service.id)) ? 'active' : ''">

                          <input class="service-input form-check position-absolute ms-2 opacity-0 " type="checkbox"
                              :value="service.id" id="service_{{i}}" style="transform: scale(300%) ;"
                              v-model="query.services">

                          <img class="service-icon"
                              style="height: 30px; width: 30px;"
                              :src="'../../public/services-icons/' + service.icon">

                          <div class="service-title"> {{ service.name == 'Aria Condizionata' ? 'Clima' : service.name }}
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- options -->

        <div class="d-flex justify-content-between  justify-content-lg-start gap-3">
          
            <button class="btn btn-outline-primary " typeof="reset" >
              <router-link :to="{ name: 'home' }"
              class="" >
              <i class="fa-solid fa-reply"></i>

              Annulla
            </router-link>
            </button>

      

          <button class="btn btn-primary text-light" :disabled="loading">
            <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Mostra I Risultati
          </button>
        </div>
      </form>
    </fieldset>

    <section id="search-Result" v-if="showActive === true && selectedSuggestion && apartments"
        class="pt-lg-5 pt-sm-2 mt-3">
      <div class="container-fluid p-0">

        <div class="map-main-container">
          <h1 class=" p-0 text-center  title-cursive">Appartamenti nel raggio di {{ this.$route.query.radius }}km da
            <span class="title-focus"> {{ selectedSuggestion }}</span>
          </h1>


          <!-- MAP -->
          <div class="container row justify-content-center p-0 pb-5 m-auto ">
            <div class="map-container p-0 m-0 col-8-lg col-8-md col-12-sm position-relative ">
              <div id="map" class="map  border rounded-3 mb-5 m-auto">
              </div>
            </div>
          </div>
        </div>
        <!-- pagination up -->
        <div class="cards-container  row row-cols-sm-2 row-cols-md-3 row-cols-xl-4 row-cols-xxl-5 g-4 px-md-5">

          <!-- LINK ALLO SHOW -->
          <router-link v-for="apartment in apartments" :to="{ name: 'Apartments.show', params: { id: apartment.id } }"
              v-slot="{ singleCard }" class="card-group my-4">

            <!-- CARD -->
            <div>
              <SingleCardApartment :is="singleCard" :apartment='apartment'> </SingleCardApartment>
              <div class="px-1 mt-0 fw-bolder">
                <span class="text-black"> Distanza: </span> {{ apartment.distance }} <span
                    class="card-text text-black opacity-25 ">Km</span>
              </div>
              <!-- <div class="px-1 mt-0 fw-bolder">
              <span class="text-black" > Total services: </span> {{ apartment.services.length }}
            </div> -->
            </div>
          </router-link>
        </div>

        <!-- PAGINAZIONE SOTTO -->
        <Pagination :pagination="pagination"
            :query="query"
            @api_SEARCH="api_SEARCH"></Pagination>
      </div>
    </section>
  </div>
</template>

<script>
import tt, { map } from '@tomtom-international/web-sdk-maps';
import axios from 'axios';
import { store, titles } from '../store';
import SingleCardApartment from '../components/SingleCardApartment.vue';
import Pagination from '../components/Pagination.vue';
import { toHandlers } from 'vue';
import { walkIdentifiers } from '@vue/compiler-core';
export default {
  components: { SingleCardApartment, Pagination },
  name: 'AdvancedSearch',
  data() {
    return {
      store,
      services: [],

      showActive: true,

      suggestions: null,
      selectedSuggestion: null,
      querySearch: '',

      api_key: '.json?storeResult=false&limit=6&countrySet=IT&view=Unified&key=OwsqVQlIWGAZAkomcYI0rDYG2tDpmRPE',
      baseUrl: 'https://api.tomtom.com/search/2/geocode/',
      pagination: null,
      apartments: null,
      appartamenti: null,

      query: {
        querySearchText: '',
        lat: '',
        lon: '',
        radius: 20,
        min_rooms: 1,
        min_beds: 1,
        services: [],
        page: 1
      },

      map_Element: document.getElementById('map'),
      marker: [],
      lng: {},
      lat: {},
      markertitle: null,
    }
  },
  methods: {


    /* CREATE MAP */
    createMap(lon, lat, appartamenti) {

      this.map = tt.map({
        key: 'lAYuyhutioeCVRvHVSZgBC8wf8CPcO0E',
        container: 'map',
        center: [lon, lat],
        zoom: 13,
      })

      Object.keys(appartamenti).forEach((apartment) => {
        this.Marker = new tt.Marker().setLngLat([appartamenti[apartment].longitude, appartamenti[apartment].latitude]).setPopup(new tt.Popup({ offset: 35 }).setHTML(appartamenti[apartment].title + '<br/>' + appartamenti[apartment].address)).addTo(this.map);
      });
      return this.map
    },


    // AUTOCOMPLETE------------------------------------------------------------
    getSuggestions() {
      this.selectedSuggestion = "";
      if (this.query.querySearchText.length > 0) {
        axios.get(`https://api.tomtom.com/search/2/geocode/${this.query.querySearchText}.json?storeResult=false&limit=5&countrySet=IT&view=Unified&key=OwsqVQlIWGAZAkomcYI0rDYG2tDpmRPE`)

          .then((resp) => {
            this.suggestions = resp.data.results;
            /*  console.log(this.suggestions); */
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.suggestions = [];
      }
    },
    //SELECT SUGGESSTED ADDRESS
    selectSuggestion(suggestion) {
      this.query.querySearchText = (suggestion.address.freeformAddress + ', ' + suggestion.address.country);
      this.query.lat = suggestion.position.lat;
      this.query.lon = suggestion.position.lon;
      /* console.log('suggestion: ', this.query, this.suggestion) */
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



    api_SEARCH(payload/* , page */) {

      let apiUrl = `${this.store.backedRootUrl}/api/search`;
      //  console.log('URL', apiUrl);
      this.selectedSuggestion = this.query.querySearchText;
      console.log("PAYLOAD", payload)

      axios
        .get(`${apiUrl}`, {
          params: {
            ...payload
          },
        })
        .then((resp) => {

          this.$router.replace({
            query: { ...payload }
          }).then(() => {
            console.log("ROUTE SEARCH REPLACE", this.$route.query),
              this.showActive = true;
          });
          /*    console.log("this dopo invio", this.$route.query) */
          // this.store.submitResult = 'success';
          // this.store.loading = false;

          /*  console.log("GET", resp.data) */
          this.apartments = { ...resp.data.data };
          this.pagination = { ...this.omitKey(resp.data, 'data') };

          const map_Element = document.getElementById("map");
          if (map_Element) {
            this.createMap(this.query.lon, this.query.lat, this.apartments);
            console.log(this.createMap(this.query.lon, this.query.lat, this.apartments))
            console.log(this.map)
          }
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

    fechRedirectData() {

      /*   console.log("ROUTE refresh", this.$route.query)
        console.log("FORM refresh", this.query) */

      //se nella route esiste una chiave con lo stesso nome di una di quelle nell'array query su cui sto ciclando, rimpiazzo i valori
      Object.keys(this.query).forEach((filter) => {
        /*   console.log(
            Object.keys(this.$route.query).some(key => key === filter),
            "ROUTE:", this.$route.query[filter],
            "FORM", this.query[filter]) */

        if (Object.keys(this.$route.query).some(key => key === filter)) {
          this.query[filter] = this.$route.query[filter]
        }
      });

      this.selectedSuggestion = this.query.querySearchText;
      /*     const query = Object.assign({}, this.$route.query);
          delete query.homeSearchAddress; */

      //a fine ciclo è importante rendere form e route.query uguali in modo che l'URL sia fedele alla ricerca fatta     
      this.$router.replace({ query: this.query }).then(() => {
        /*   console.log(
            "ROUTE .then REPLACE", this.$route.query,
            "FORM after fechRed", this.query) */
        this.api_SEARCH(this.query);
      })



      /*   this.api_SEARCH(this.query); */

    },

    waitForElm(selector) {
      return new Promise(resolve => {
        if (document.querySelector(selector)) {
          return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
          if (document.querySelector(selector)) {
            resolve(document.querySelector(selector));
            observer.disconnect();
          }
        });

        observer.observe(document.body, {
          childList: true,
          subtree: true
        });
      });
    },


  },
  mounted() {
    //asssegno titolo
    titles(this.$route.meta.title);
    //recupero i services per form
    this.fetchServices();
    //recupero i dati del redirect se c'è (modifica url!!)
    this.fechRedirectData();
  },
  watch: {

    apartments: {
      handler(newVal, oldVal) {
        if (newVal) {
          console.log("apartments new", newVal)
          this.waitForElm('#map').then((elm) => {
            console.log('Element is ready');

            this.createMap(this.query.lon, this.query.lat, this.apartments);
            /* console.log(elm.textContent); */
          });
        }
      }
    }
  },

  updated() {

  },
  created() {
  },

};
</script>

<style lang="scss" scoped>
@use '../styles/generic.scss';
@use '../styles/partials/variables' as *;
@use '../styles/partials/mediaQueries.scss' as *;

/* UTILITIES */

.title-cursive {
  font-family: 'Gochi Hand',
    cursive;
  font-size: 40px;
  padding-top: 40px;
  color: $dark_color;

  .title-focus {
    color: saturate($primary_color, 20%);
    font-size: 50px;
  }

  @include media-breakpoint-up(md) {
    font-size: 50px;
    padding-top: 50px;

    .title-focus {
      font-size: 60px;
    }
  }
}

.bg-main-container {
  background: rgb(255, 255, 255);
  background: linear-gradient(0deg, rgba(255, 255, 255, 1) 22%, saturate($secondary_color_light, 10%) 100%);

  .form-container {
    background: rgba(255, 255, 255, 0.16);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(6.3px);
    -webkit-backdrop-filter: blur(6.3px);
    border: 1px solid rgba(255, 255, 255, 0.32);
    z-index: 5000000;
    position: sticky;


  }
}

.service-label.active {
  background-color: lighten($primary_color_light, 10%);
  z-index: 3 !important;
}


.map-main-container {
  /*   background-color: $info_color; */
  margin-bottom: 200px;
  max-width: 1500px;
  margin: auto;

  &>* {
    margin: auto;
  }

  .map-container {
    margin: auto;
    overflow: hidden;
    z-index: 1;
    min-height: 700px;
    position: relative;

    #map {
      width: 100%;
      height: 100%;
      position: relative;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: 0 !important;
      z-index: 2 !important;
    }
  }
}

.cards-container {
  padding-top: 120px;
}

i {
  img {
    width: 25px;
    margin-left: 0.7rem;
  }
}
</style>
