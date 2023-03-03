<template>
  <h1>Apartments Show</h1>


  <!-- <div  v-if="(apartment.title)" class="card">
  {{ apartment.title }} 
</div> -->

  <router-link v-slot="{ ButtonDelete }" :to="{ name: 'Apartments.index' }">
    <ButtonDelete :is="ButtonDelete" />
  </router-link>
  <ButtonDelete @click="onDeleteClick()" />
</template>

<script>
import { titles } from '../../store';
import { api_SHOW, api_DELETE } from '../../store';
import ButtonDelete from '../../components/ButtonDelete.vue';
export default {
  name: "Apartments Show",
  components: { ButtonDelete },
  data() {
    return {
      apartment: {},
    }
  },
  methods: {
    onDeleteClick() {
      api_DELETE(his.$route.meta.apiRouteDeletePath, this.$route.params)
    },

    fetchShowApartment() {
      this.apartment = api_SHOW(this.$route.meta.apiRoutePath, this.$route.params);
    }

  },
  mounted() {
    console.log(this.$route)

    this. fetchShowApartment();

    titles(this.$route.meta.title + this.$route.params.id);
    console.log(this.apartment)

  },
  created() {
  }
}
</script>


<style lang="scss" scoped>
@use "../../styles/generic.scss";
@use "../../styles/partials/variables" as *;
</style>