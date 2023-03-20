<template>
  <div class="container">
    <div class="row mt-5 flex-column flex-md-row">
      <div class="col-4 m-auto">
        <h1 class="text-uppercase">CONTATTI</h1>
      </div>
      <div class="col-8 m-auto">
        <p class="fs-6 text-center fs-md-5 "> Per richieste generiche da parte della stampa o dei media constattare <b>contact.press@boolbnb.com</b> </p>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-4  d-none d-md-block">
        <img src="contact_img2.webp" alt="" class="img-fluid rounded-4">
      </div>
      <div class="col-8 m-auto">
        <div class="row h-100">
          <div class="col-8  m-auto">
            <ul class="ms-3 list-unstyled d-flex flex-column align-items-center  py-2">
              <h2>Europa</h2>
              <li class="mt-3">Richieste generiche Europa: <b>press-euro@boolbnb.com</b></li>
              <li class="mt-3">Richieste Inghilterra: <b>press-eng@boolbnb.com</b></li>
              <li class="mt-3">Richieste Germania: <b>press-Ger@boolbnb.com</b> </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-8 m-auto ">
        <div class="row h-100">
          <div class="col-8  m-auto">
            <ul  class="ms-3 list-unstyled d-flex flex-column align-items-center py-2">
              <h2>Asia</h2>
              <li class="mt-3">Richieste generiche Asia: <b>press-asia@boolbnb.com</b></li>
              <li class="mt-3">Richieste Cina: <b>press-cina@boolbnb.com</b></li>
              <li class="mt-3">Richieste India: <b>press-Indiar@boolbnb.com</b> </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-4 d-none d-md-block">
        <img src="contact_img1.webp" alt="" class="img-fluid rounded-4">
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-4 d-none d-md-block">
        <img src="contact_img3.webp" alt="" class="img-fluid rounded-4">
      </div>
      <div class="col-8 m-auto ">
        <div class="row h-100">
          <div class="col-8  m-auto">
            <ul  class="ms-3 list-unstyled d-flex flex-column align-items-center  py-2 ">
              <h2>America</h2>
              <li class="mt-3">Richieste generiche America: <b>press-Am@boolbnb.com</b></li>
              <li class="mt-3">Richieste USA: <b>press-usa@boolbnb.com</b></li>
              <li class="mt-3">Richieste Messico: <b>press-mex@boolbnb.com</b> </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { titles } from '../store';
export default {
  components: {},
  data() {
    return {

    }
  },
  methods: {

  },
  mounted() {
    titles(this.$route.meta.title);
  },
  created() {
  }
}
</script>
<style lang="scss" scoped>
@use "../styles/generic.scss";
@use "../styles/partials/variables" as *;
</style>