<template >
  <div class="container">
    <form @submit.prevent="">
      <div class="d-flex align-items-center justify-content-around">
        <div class="mb-2">
          <label for="city">Street and City</label>
          <!-- <input type="text" placeholder="Ex. Via generale cascino 14 Roma" class="form-control" id="streetNameInput" v-model="query.address" /> -->
        </div>

        <!-- rooms -->

        <div class="input-container pb-2 col-4 ">
          <label class="form-label" for="min_rooms">min rooms number</label>
          <select
              class="form-control"
              id="min_rooms" name="min_rooms">
            <option v-for="i in 5"
                value="{{ i }}">
              {{ i == 5 ? i + ' +' : i }}

            </option>
          </select>
        </div>

        <!--     {{-- BEDROOMS QTY ------------------------------------------------------------------ --}} -->

        <div class="input-container pb-2 col-4 ">
          <label class="form-label" for="min_beads">min beds number</label>
          <select
              class="form-control"
              id="min_beads" name="min_beads">
            <option v-for="i in 5"
                value="{{ i }}">
              {{ i == 5 ? i + ' +' : i }}

            </option>
          </select>
        </div>

        <div class="mb-2">
          <label for="radiusInput">Radius (km):</label>
          <input type="number" id="radiusInput" v-model="query.radius" min="1" max="100">
        </div>
      </div>

      <div class="input-container pb-2 col-12">

        <label class="form-label text-uppercase">Advanced Services:</label>
        <div class="form-check form-check-inline" v-for="(service, i) in services">
          <input type="checkbox" class="form-check-input" :value="service.id" id="service_{{i}}"
              v-model="query.services" />
          <label class="form-check form-check-inline" for="service_{{i}}">{{ service.name }}
            <i>
              <img :src="'../../public/services-icons/' + service.icon" alt="" />
            </i>
          </label>
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



  <div class="input-container pb-2">
    <label class="form-label d-block">SERVICES:</label>
    <div class="row">

      <div v-for="(service, i) in services"
          class="col d-flex align-items-center @error('services') is-invalid @enderror ">
        <input class="form-check @error('services') is-invalid @enderror" type="checkbox"
            value="{{ service.id }}" id="service_{{ i }}" name="services[]">

        <label
            for="service_{{ $loop->index }}">{{ service.name == 'Aria Condizionata' ? 'Clima' : service.name
            }}
        </label>
        <i> <img :src="'../../public/services-icons/' + service.icon" alt="" /></i>
      </div>

    </div>
  </div>
</template>
<script>
import axios from 'axios';
import { api_POST, store, titles } from '../store';
export default {
  name: 'AdvancedSearch',
  data() {
    return {
      store,
      services: [],
      address: '',

      query: {
        lat: '',
        lon: '',
        radius: 20,
        min_rooms: '',
        min_beds: '',
        services: [],
      }
    }
  },
  methods: {
    /* RECUOERA LISTA SERVIZI DISPONIBILI PER APPARTAMENTO */
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
    /* FORMATTA E INVIA AL BECKEND I DATI  DEL FORM PER LA CREAZIONE DEL NUOVO "APPARTAMENTO" E RELATIVE RELAZIONI */

    onCreateFormSubmit() {
      this.store.loading = true;
      //Assegno form. addres, longitude e latitude attraverso la chiamata axios

      const formData = new FormData();
      formData.append('user_id', this.form.user_id);
      formData.append('title', this.form.title);
      formData.append('address', this.form.address);
      formData.append('latitude', this.form.latitude);
      formData.append('longitude', this.form.longitude);
      formData.append('cover_img', this.form.cover_img);
      formData.append('description', this.form.description);
      formData.append('rooms_qty', this.form.rooms_qty);
      formData.append('beds_qty', this.form.beds_qty);
      formData.append('bathrooms_qty', this.form.bathrooms_qty);
      formData.append('mq', this.form.mq);
      formData.append('daily_price', this.form.daily_price);
      formData.append('visible', this.form.visible);

      for (let i = 0; i < this.form.services.length; i++) {
        formData.append('services[]', this.form.services[i]);
      }

      api_POST(this.$route.meta.apiRoutePath, formData);
    },
    /* RECUPERO COVER IMG DA INPUT FILE ----> QUESTA ANDRA' RIVISTA PER + IMMAGINI */
    onAttachmentChange(event) {
      // reucupero l'array dei file scelti dall'utente
      const chosenFiles = event.target.files;
      console.log(chosenFiles);
      // salvo il file scelto dentro l'oggetto form
      this.form.cover_img = chosenFiles[0];
    },

    fetchTomTom() {
      axios
        .get(this.store.geoApiUrl + this.store.geoApiKey, {
          params: this.formAddress,
        })
        .then((resp) => {
          this.form.address = resp.data.results[0].address.freeformAddress;
          this.form.latitude = resp.data.results[0].position.lat;
          this.form.longitude = resp.data.results[0].position.lon;

          this.onCreateFormSubmit();
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