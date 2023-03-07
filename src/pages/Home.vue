<template>
  <div class="container">
    <h1 class="text-danger">HOME</h1>
    <div class="d-flex justify-content-center my-5 ">

      <div class="position-relative" >
        <input v-model="query"  class="search__input" type="text" placeholder="Search Apartment">
        <button @click="fetchTomTom()" class="my-btn"><i class="fa-solid fa-magnifying-glass"></i></button>
      </div>
    </div>
  </div>
</template>

<script>
import { titles } from '../store';
import axios from 'axios';
export default {
  name: 'Home',
  components: {},
  data() {
    return {
      query: '',
      
      api_key: "key=OwsqVQlIWGAZAkomcYI0rDYG2tDpmRPE",
       baseUrl: "https://api.tomtom.com/search/2/geocode/", // + this.query + '.json?'

      format: '.json?',
      
  }
},
  methods: {
    fetchTomTom() {
// axios.get("https://api.tomtom.com/search/2/geocode/De%20Ruijterkade%20154,%201011%20AC,%20Amsterdam.json?key=lAYuyhutioeCVRvHVSZgBC8wf8CPcO0E").then((resp) => {
axios.get(this.baseUrl +  this.query + this.format + this.api_key)
.then((resp) =>  {
  console.log(resp);
  console.log(resp.data.results[0].address.freeformAddress);
  console.log(resp.data.results[0].position.lat);
  console.log(resp.data.results[0].position.lon);
})
 

},
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

@import url('https://fonts.googleapis.com/css?family=Raleway:400,700,900');

/* Base styling */

.my-btn{
  border-radius: 50%;
  border: none;
  position: absolute;
  background-color: white;
  top: 10px;
  right: 5px;
  
  

}

.search {
    
    &__input {
        width: 100%;
        padding: 12px 24px;

        background-color: transparent;
        transition: transform 250ms ease-in-out;
        font-size: 14px;
        line-height: 18px;
        
        color: #575756;
        background-color: transparent;
/*         background-image: url(http://mihaeltomic.com/codepen/input-search/ic_search_black_24px.svg); */
 
      background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-size: 18px 18px;
        background-position: 95% center;
        border-radius: 50px;
        border: 1px solid #575756;
        transition: all 250ms ease-in-out;
        backface-visibility: hidden;
        transform-style: preserve-3d;
        
        &::placeholder {
            color: color(#575756 a(0.8));
            text-transform: uppercase;
            letter-spacing: 1px;
        }
    }
}



</style>