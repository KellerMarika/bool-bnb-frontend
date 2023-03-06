<template>

<div class="card text-dark  border-0" >
   <img class="card-img-top mb-2 card-img rounded-4"
		:src="apartment.images[0].image"
		alt="" />
	<span class="mt-1 fw-semibold">{{ apartment.title }}</span>
	
   <div v-if="apartment.description.length > 70">
	   <div class="px-1 mt-0 card-text opacity-50">
	   	{{ apartment.description.substring(0, 50) + "..." }}
	   </div>
   </div>
   <div v-else>
      <div class="px-1 mt-0 card-text opacity-50">
	   	{{ apartment.description }}
	   </div>
   </div>

	<div class="px-1 mt-0 fw-bolder">
		{{ apartment.daily_price }} € <small class="opacity-50">night</small>
	</div>
	

</div>


		
    
      
        
       
     
   


</template>
<script>
import { store } from '../store';

export default {
   props: {
      /** 
       *@param {int} user_id => required|exists:users,id,
       *@param {string} title => required|string,
       *@param {string} address => required|string,
       *@param {string} latitude => required,
       *@param {string} longitude => required,
       *@param {string} cover_img => file|image,
       *@param {string} description => string|max:1000,
       *@param {int} rooms_qty => required|integer,
       *@param {int} beds_qty => required|integer,
       *@param {int} bathrooms_qty => required|integer,
       *@param {int} mq => integer,
       *@param {float} daily_price => required|decimal:2,
       *@param {bool} visible => nullable|boolean,
       *@param {array} services => 'nullable|array',
       */
      apartment: {
         required: true,
         type: Object
      }
   },
   data() {
      return {
         store
      }
   },
   methods: {
   },
   mounted() {
   }
}
</script>

<style lang="scss" scoped>


.card-text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  display: block;
}

.card-text-truncate-40 {
  max-width: calc(50ch + 2px);
}

img{
   aspect-ratio: 1 / 1;
   
}

</style>
