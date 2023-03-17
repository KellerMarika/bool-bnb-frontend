<template>
	<div class="card text-dark border-0">
		<div class="card text-dark border-0">
			<div class="sponsorized-frame rounded-4"
				:class="getSponsorizedFrame().isActive ? 'bg-primary' : ''">
				<img class="card-img-top mb-2 card-img rounded-4"
					:src="fetchImage(apartment.cover_img, apartment.images)"
					alt=""
					@mouseover="startSlideShow"
					@mouseleave="stopSlideShow" />
			</div>
		</div>

		<!-- 	<h2>{{getSponsorizedFrame().isActive }}</h2>
 <small>{{getSponsorizedFrame().expiration_date }}</small>  -->
		<span class="mt-1 fw-semibold">{{ apartment.title }}</span>

		<div v-if="apartment.description && apartment.description.length > 70">
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
import {store} from '../store';

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

		fromDateToMillisecond(data) {
			return new Date(data).getTime();
		},
		/* SUBSCRIPTION */
		getSponsorizedFrame() {
			let duration = 0;
			let currentDate = new Date().getTime();

			//devo ritornare subInfos
			let subInfos = {
				isActive: false,
				expiration_date: null,
			};

			//se è stato sponsorizzato almeno una volta
			if (
				this.apartment.subscriptions &&
				this.apartment.subscriptions.length > 0
			) {
				/* console.log("ALL apartment sub", this.apartment.subscriptions) */

				//se ha solo una sponsorizzazione:
				if (this.apartment.subscriptions.length === 1) {
					//data di scadenza della sub espressa in millisecondi
					duration = new Date(
						this.apartment.subscriptions[0].expiration_date
					).getTime();
					/* 	console.log("	duration > currentDate", duration > currentDate) */

					if (duration > currentDate) {
						/* 		console.log("durata maggiore") */
						(subInfos.isActive = true),
							(subInfos.expiration_date = new Date(duration));
						/* 	console.log(subInfos) */
						return subInfos;
					} else {
						return subInfos;
					}
				} else {
					//SE HA PIU' DI UNA SPONSORIZZAZIONE FACCIO UN CICLO AL CONTRARIO DALLA PRIMA ALLA PENULTIMA (sennò mi da errore quandoindex===0 e creco nella ricorsiva la prev con index-1)
					//prendo in esame l'array dalla più recente
					for (
						let index = this.apartment.subscriptions.length - 1;
						index >= 0;
						index--
					) {
						const subscription = this.apartment.subscriptions[index];

						/* 	console.log(subscription)
							console.log("created", subscription.pivot.created_at)
							console.log("expedit", subscription.pivot.expiration_date) */

						//se sto guardando la sub più recente
						if (index === this.apartment.subscriptions.length - 1) {
							/* 							console.log("primo giro"); */

							let startSubscription = this.fromDateToMillisecond(
								subscription.pivot.created_at
							);
							let endSubscription = this.fromDateToMillisecond(
								subscription.pivot.expiration_date
							);

							/*recupero la differenza tra inizio e fine validità della subscription. a questo dato andrò a sommare eventuali altri intervalli di tempo e una data di creazione da confrontare in fine con la data attuale per capire se l'appartamento risulta ancora sponsorizzato o no!*/
							duration = endSubscription - startSubscription;
							/* 	console.log("durata base inizio", duration); */

							/* RICORSIVA */

							/* 		console.log("RETURN",recursiveControl(index, this.apartment,duration)) */
							duration = recursiveControl(
								index,
								this.apartment,
								duration
							); //ritorna la durata da confrontare con la data attuale.
							/* 				console.log("DURATION RECURSIVE", duration);
							console.log("OGGI", currentDate) */

							/* 							console.log("	duration > currentDate", duration > currentDate) */

							if (duration > currentDate) {
								(subInfos.isActive = true),
									(subInfos.expiration_date = new Date(duration));
								/* 			console.log(subInfos) */
								return subInfos;
							}
							/* 				console.log(subInfos) */
							return subInfos;
						}

						/* FUNZIONE RICORSIVA CHE CONTOLLA SE LA SUB CHE SI PRENDE IN ESAME E' STATA ATTIVATA MENTRE NON ERA ANCORA SCADUTA LA PRECEDENTE, RICORSIVAMENTE. RITORNA LA SOMMA DELL'AMMONTARE DI TEMPO RESIDUO ACCUMULATO DA TUTTE LE SUB FATTE CONTEMPORANEAMENTE + LA DATA DI CREAZIONE MENO RECENTE(cioè dell'ultima esaminata) */
						function recursiveControl(index, apartment, duration) {
							//se non è l'ultimo elemento(il ciclo è al contrario (length-1))
							/* if (index !== 0) { */
							/* 		console.log('sto ricorrendo!');
							console.log("index", index); */
							//recupero current e prev sub
							const currentSubscription = apartment.subscriptions[index];
							const prevSubscription =
								apartment.subscriptions[index - 1];
							/* 			console.log("CURRENT", currentSubscription);
													console.log("PREV", prevSubscription);*/

							//recupero data creazione di current e data di fine di prev
							const currentStartDate = new Date(
								currentSubscription.pivot.created_at
							).getTime();
							const prevEndDate = new Date(
								prevSubscription.pivot.expiration_date
							).getTime();

							/* 		console.log("CuStart", currentStartDate, currentSubscription.pivot.created_at);
							console.log("PrevEnd", prevEndDate, prevSubscription.pivot.expiration_date); */
							/* 	console.log(currentStartDate < prevEndDate); */ //data più piccola c'è meno tempo dentro

							//SE la sub che sto esaminando inizia prima della fine della precedente
							if (currentStartDate < prevEndDate) {
								/* 								console.log('è cumulativo'); */
								/* 								console.log("differenza", prevEndDate - currentStartDate); */
								duration += prevEndDate - currentStartDate;
								/* 						console.log("duration + duration", duration); */
								/* reinvoco la funzione */

								//controllo sull'index da passare in ricorsiva
								if (index - 1 > 0) {
									/* 			console.log("controllo se è il penultimo elemento index:", index, "parte ricorsiva, duration", duration) */
									return recursiveControl(
										index - 1,
										apartment,
										duration
									);
								} else {
									//se il successivo è l'ultimo ma il corrente è stato fatto allinterno del successivo

									let lastSubCeationDate = new Date(
										prevSubscription.pivot.created_at
									).getTime();
									/* 		console.log("last created",lastSubCeationDate)*/
									duration += lastSubCeationDate;
									/* 	console.log("index:", index, "duration + current=", duration) */
									return duration;
								}
							} else {
								//fine giro
								/* 					console.log(currentStartDate) */
								duration += currentStartDate;
								/* console.log('fine giro: duration + created', duration) */
								return duration;
							}
						}
						/* ********************************************************************************************** */
					}
				}
			} else {
				/* 		console.log(subInfos) */
				return subInfos;
			}
		},

		// recura immagine corretta
		fetchImage(apartmentCoverImg, apartmentImages) {
			if (apartmentCoverImg !== null) {
				return this.store.backedRootUrl + '/storage/' + apartmentCoverImg;
			} else if (apartmentImages && apartmentImages.length) {
				/* 				console.log(apartmentImages[this.currentImageIndex].image); */
				return apartmentImages[this.currentImageIndex].image;
			} else {
				let defaultImg = '/placeholder-image.png';
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
		this.getSponsorizedFrame();
		/* 	console.log("APARTMENT",this.apartment) */
	},
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
