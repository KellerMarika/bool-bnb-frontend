<template>
  <div class="container">
    <!--Apartments Show -->

    <h1 class="mb-4">{{ apartment.title }}</h1>
    <div v-if="apartment.images" class="row ">
      <div class="col-xl-6 col-lg-6 col-md-4 col-sm-12 col-6 mb-2 ">
        <img class="img-fluid mb-2 card-img container-cards-left "
          :src="apartment.images[0].image"
          alt="" />
      </div>
      <div class="col-6">
        <div class="row">
          <div v-for="(img, index) in apartment.images"  key="index" v-bind:class="(index ===0) ? ' ' : 'col-xl-6 col-lg-6 col-md-5 col-sm-6 ' ">
            
            <img v-if="index > 0" :class="(index === 2) ? 'container-cards-top-right' : '' | (index === 4) ? 'container-cards-bottom-right' : ''  "  
             class="img-fluid mb-2 card-img "
              :src="img.image"
              :alt="'image ' + (index + 1)" />
            
          </div>


        </div>
      </div>

    </div>

    <div v-else class="col-8 m-auto">

      <img class="img-fluid mb-2 card-img"
          :src="apartment.cover_img"
          alt="" />

    </div>
    <!-- <div class="col-6 container-cards">
          <img class="img-fluid container-cards-left mb-2 card-img  "
            :src="this.apartment.images[0].image"
            alt="" />
        </div>
        <div class="col-6">
          <div v-for="(img, i) in apartment.images" class="row">
            <div  class="col-6 mb-2"><img class="img-fluid mb-2 card-img "
                :src="img.image"
                alt="" /></div>
          </div>
        </div> -->




    <div class="my-2">
      <i class="h5 me-2 fa-solid fa-map-location-dot"></i> {{ apartment.address }}
    </div>
    <hr>
    <div class="d-flex mb-3">

      <div class="mb-2 mx-2">
        Rooms {{ apartment.rooms_qty }} |
      </div>

      <div class="mb-2 mx-2">
        <i class="fa-solid fa-bed"></i> {{ apartment.beds_qty }} |
      </div>

      <div class="mb-2 mx-2">
        <i class="fa-solid fa-bath"></i> {{ apartment.bathrooms_qty }} |
      </div>

      <div class="mb-2 mx-2">
        MQ {{ apartment.mq }} |
      </div>
      <div class="mx-2">
        <i class="fa-solid fa-euro-sign"></i> {{ apartment.daily_price }} night
      </div>
      
    </div>
    <hr>
    <div class="mb-2 mx-2">
      <p>{{ apartment.description }}</p>
    </div>







    <!--   <router-link v-slot="{ ButtonDelete }" :to="{ name: 'Apartments.index' }">
    <ButtonDelete :is="ButtonDelete" />
  </router-link> -->
    <ButtonDelete @click="onDeleteClick()" />

    <a href="http://localhost:5173/apartments" class="btn btn-info ms-2 text-light">RETURN TO INDEX</a>

  </div>
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
      api_DELETE(this.$route.meta.apiRouteDeletePath + this.$route.params.id)
    },

    /**FUNZIONE API CALL SHOW (show).........................
     * 
     * @param {string} thisRoutePath  es= 'apartments/create'
     * @param {object} payload es=  {pagination:3}
     */
    api_SHOW(thisRoutePath, payload) {


      let apiUrl = `${this.store.backedRootUrl}/api${thisRoutePath}${this.$route.params.id}`
      axios.get(`${apiUrl}`, {
        params: payload
      })
        .then((resp) => {
          this.store.submitResult = "success";
          this.store.loading = false;

          console.log("APPARTAMENTO", resp.data)
          this.apartment = resp.data
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



.col-6 {

  .container-cards-left {
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;

  }

  .container-cards-top-right {
    border-top-right-radius: 20px;


  }

  .container-cards-bottom-right {

    border-bottom-right-radius: 20px;

  }

}
</style>