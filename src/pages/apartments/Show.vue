<template>
  <h1>Apartments Show</h1>

  {{ apartment.title }}


<!--   <router-link v-slot="{ ButtonDelete }" :to="{ name: 'Apartments.index' }">
    <ButtonDelete :is="ButtonDelete" />
  </router-link> -->
  <ButtonDelete @click="onDeleteClick()" />
</template>

<script>
import axios from 'axios';
import { titles } from '../../store';
import { api_DELETE, store } from '../../store';
import ButtonDelete from '../../components/ButtonDelete.vue';

export default {
  name: "Apartments Show",
  components: { ButtonDelete },
  props: {
    /**
         *@param {int} id
         *@param {int} user_id
         *@param {string} title
         *@param {string} address
         *@param {string} latitude
         *@param {string} longitude
         *@param {string} cover_img    
         *@param {string} description
         *@param {int} rooms_qty
         *@param {int} beds_qty
         *@param {int} bathrooms_qty
         *@param {int} mq
         *@param {float} daily_price
         *@param {boolean} visible
         *@param {array} services
         */
    apartment: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      store,
      apartment: {},
    }
  },
  methods: {
    onDeleteClick() {
      api_DELETE(this.$route.meta.apiRouteDeletePath+this.$route.params.id)
    },

    /**FUNZIONE API CALL SHOW (show).........................
     * 
     * @param {string} thisRoutePath  es= 'apartments/create'
     * @param {object} payload es=  {pagination:3}
     */
    api_SHOW(thisRoutePath, payload) {

      let backedRootUrl = 'http://127.0.0.1:8000';

      let apiUrl = `${backedRootUrl}/api${thisRoutePath}`
      axios.get(`${apiUrl}`, {
        params: payload
      })
        .then((resp) => {
          this.store.submitResult = "success";
          this.store.loading = false;

          console.log("APPARTAMENTO", resp.data.data[0])
          return this.apartment = resp.data.data[0]

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
  },
  mounted() {

    titles(this.$route.meta.title + this.$route.params.id);
    this.api_SHOW(this.$route.meta.apiRoutePath, this.$route.params);


  },
  created() {
  }
}
</script>


<style lang="scss" scoped>
@use "../../styles/generic.scss";
@use "../../styles/partials/variables" as *;
</style>