<template>
	<div class="card text-dark border-0">
		<div class="card text-dark border-0">
      <img class="card-img-top mb-2 card-img rounded-4" :src="fetchImage(apartment.cover_img, apartment.images)" alt="" />
      <div class="carousel-controls position-absolute top-50 translate-middle-y">
        <button class="carousel-control-prev " >
          <i @click.stop="prevImage" :class="{ 'disabled': currentImageIndex === 0 }" class="fa-solid fa-circle-chevron-left"></i>
        </button>
        <button class="carousel-control-next" >
          <i @click.stop="nextImage" :class="{ 'disabled': currentImageIndex === apartment.images.length - 1 }" class="fa-solid fa-circle-chevron-right"></i>
        </button>
      </div>
    </div>
  
		
		<span class="mt-1 fw-semibold">{{ apartment.title }}</span>

		<div v-if="apartment.description.length > 70">
			<div class="px-1 mt-0 card-text opacity-50">
				{{ apartment.description.substring(0, 50) + '...' }}
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
import { store} from '../store';

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
			*@param {array} images => ''nullable|array',
			*/
		apartment: {
			required: true,
			type: Object,
		},
	},
	data() {
		return {
			store,
			currentImageIndex: 0,
		};
	},
	methods: {
		fetchImage(apartmentCoverImg, apartmentImages) {
      if (apartmentCoverImg !== null) {
        return this.store.backedRootUrl + "/storage/" + apartmentCoverImg;
      } else if (apartmentImages && apartmentImages.length) {
				console.log(apartmentImages[this.currentImageIndex].image);
        return apartmentImages[this.currentImageIndex].image;
      } else {
        let defaultImg = "/placeholder-image.png";
        return defaultImg;
      }
    },
    nextImage() {
      if (this.currentImageIndex < this.apartment.images.length - 1) {
        this.currentImageIndex++;
      }
    },
    prevImage() {
      if (this.currentImageIndex > 0) {
        this.currentImageIndex--;
      }
    },
  },
/* FUNZIONE FETCH COVER IMG  */
	// 	fetchImage(apartmentCoverImg, apartmentImages) {

	// 		if (apartmentCoverImg !== null) {
	// 			return this.store.backedRootUrl+"/storage/"+apartmentCoverImg
	// 		} else if (apartmentImages && apartmentImages.length) {
	// 			return apartmentImages[0].image
	// 		} else {
	// 			let defaultImg = '/placeholder-image.png'
	// 			return defaultImg
	// 		}
	// 	}
	// },

	
	mounted() {
 }
};
</script>

<style lang="scss" scoped>

.carousel-controls {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.carousel-control-prev,
.carousel-control-next {
  background: transparent;
  border: 1px whitesmoke;
  font-size: 24px;
  font-weight: bold;
  color: #000;
  cursor: pointer;
	padding: 0.5rem;
}

.carousel-control-prev:disabled,
.carousel-control-next:disabled {
  color: #ccc;
  cursor: default;
}

.card-text-truncate {
	overflow: hidden;
	text-overflow: ellipsis;
	max-width: 100%;
	display: block;
}
.card-text-truncate-40 {
	max-width: calc(50ch + 2px);
}
img {
	aspect-ratio: 1 / 1;
	box-shadow: 3px 5px 4px black;
}


</style>
