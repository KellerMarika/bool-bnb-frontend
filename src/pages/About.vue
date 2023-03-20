


<template>
  <TheHeaderVue />
  <h1 class="text-uppercase">about</h1>

  <div class="row row-cols-1 row-cols-md-3 g-4 justify-content-center">
    <div class="col">
      <div class="card">
        <img src="Marika.jpeg" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Marika Keller</h5>
          <a href="https://github.com/KellerMarika" class="card-text">Profilo Github</a>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card">
        <img src="Donnie.jpeg" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Donato Ippolito </h5>
          <a href="https://github.com/donnie00" class="card-text">Profilo Github</a>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card">
        <img src="Luca.jpeg" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Luca Coniglio</h5>
          <a href="https://github.com/LucaConiglio" class="card-text">Profilo Github</a>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card">
        <img src="Fabri.jpeg" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Fabrizio Campari</h5>
          <a  href="https://github.com/FabrizioCmp" class="card-text">Profilo Github</a>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card">
        <img src="Mari.jpeg" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Mehari Pieropan</h5>
          <a href="https://github.com/maripiero23" class="card-text">Profilo Github</a>
        </div>
      </div>
    </div>
  </div>

  <TheFooterVue />
</template>

<script>
import { titles } from '../store';
import { store } from '../store';
import TheHeader from '../components/TheHeader.vue';
import TheFooter from '../components/TheFooter.vue';

export default {
  name: "About",
  components: { TheHeader, TheFooter },
  data() {
    return {
      store,
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
<style lang="scss" scoped>@use "../styles/generic.scss";
@use "../styles/partials/variables" as *;</style>