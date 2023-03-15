<template>
	<div class="card text-dark border-0">
		<div class="card text-dark border-0">
			<div class="sponsorized-frame rounded-4"
				:class="apartment.subscriptions.length ? 'bg-primary' : 'bg-info'">
				<img class="card-img-top mb-2 card-img rounded-4"
					:src="fetchImage(apartment.cover_img, apartment.images)"
					alt=""
					@mouseover="startSlideShow"
					@mouseleave="stopSlideShow" />
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
		//
		getSponsorizedFrame() {

/* ciclo reverse */
this.apartment.subscriptions.forEach((element, index) => { console.log(element, index) })
/* 
			if (this.apartment.subscriptions.length) {
			//	 console.log("SUB",this.apartment.subscriptions[this.apartment.subscriptions.length-1].created_at) 
				//DATA CREAZIONE DELL'ULTIMA SUBSCRIPTION
				this.apartment.subscriptions.forEach(subscription => {
				//	 	subscription.pivot.expiration_date 
					let expiration_date = new Date(subscription.pivot.expiration_date).getTime()
					if (new Date().getTime() < expiration_date){
						return  "subsctiption_"+subscription.pivot.subscription_id 
						}
});
			}
			let today = new Date();
			console.log(today)
			console.log(today.getTime())
 */

			/* console.log (this.apartment.created_at)
			console.log (new Date(this.apartment.created_at))
			
			console.log (new Date(this.apartment.created_at).getTime()) */
		},



		// recura immagine corretta 
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

		startSlideShow() {
			this.slideShow = setInterval(() => {
				this.currentImageIndex++;
				if (this.currentImageIndex >= this.apartment.images.length) {
					this.currentImageIndex = 0;
				}
			}, 1500);
		},
		stopSlideShow() {
			this.currentImageIndex = 0;
			clearInterval(this.slideShow);

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
		this.getSponsorizedFrame()
	}
};
</script>

<style lang="scss" scoped>
.sponsorized-frame {
	padding: 10px;
	padding-bottom: 6px;

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
