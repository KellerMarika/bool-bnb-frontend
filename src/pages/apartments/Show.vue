<template>

<!-- <div id="map" class="map"></div>
 -->
	<div id="map" class="map border" style="width: 400px; height: 400px"
  >
  </div>


	<section
		class="px-xxl-5 mx-3 mx-sm-5 mx-lg-5"
		:class="apartment.images && apartment.images.length ? '' : 'd-flex'">
		<div class="container.fluid px-md-3 px-xl-5">
			<!--Apartments Show -->

			<h1 class="mb-4">{{ apartment.title }}</h1>
			<!-- se non ci sono immagini gallery -->
			<div
				v-if="apartment.images && apartment.images.length > 0"
				class="img-container rounded-4 overflow-hidden">
				<div
					class="img-row-left border-success border-5 row row-cols-1 row-cols-lg-2 gap-2">
					<!-- main img -->
					<div class="col h-100 p-0 pb-md-2">
						<img
							class="img-fluid w-100"
							:src="apartment.images[0].image"
							alt="" />
					</div>

					<!--  <div class="col h-100 p-0"> -->
					<div class="row-dx col row row-cols-4 row-cols-lg-2 p-0">
						<div
							v-for="(img, index) in apartment.images"
							v-show="index > 0"
							class="col h-50 p-0 px-md-1 px-lg-3 py-lg-4">
							<img
								class="img-fluid"
								:src="img.image"
								:alt="'image ' + (index + 1)" />
						</div>
					</div>
				</div>
			</div>

			<!-- carica solo la cover -->
			<div
				v-else-if="apartment.cover_img"
				class="img-container rounded-4 overflow-hidden"
				:class="apartment.cover_img ? 'w-50' : 'w-25'">
				<img
					:src="
						apartment.cover_img
							? apartment.cover_img
							: '/placeholder-image.png'
					"
					:alt="apartment.title + '_img_' + apartment.cover_img"
					class="img-fluid w-100" />
			</div>

			<!-- carica placeolder -->
			<div
				v-else
				class="img-container rounded-4 overflow-hidden"
				:class="apartment.cover_img ? 'w-50' : 'w-25'">
				<img
					:src="
						apartment.cover_img
							? apartment.cover_img
							: '/placeholder-image.png'
					"
					:alt="apartment.title + '_img_' + apartment.cover_img"
					class="img-fluid w-100" />
			</div>

			<!-- MESSAGGIO TRISTE -->

			<div class="my-2">
				<i class="h5 me-2 fa-solid fa-map-location-dot"></i>
				{{ apartment.address }}
			</div>
			<hr />
			<div class="d-flex mb-3">
				<div class="mb-2 mx-2">Rooms {{ apartment.rooms_qty }} |</div>

				<div class="mb-2 mx-2">
					<i class="fa-solid fa-bed"></i> {{ apartment.beds_qty }} |
				</div>

				<div class="mb-2 mx-2">
					<i class="fa-solid fa-bath"></i> {{ apartment.bathrooms_qty }} |
				</div>

				<div class="mb-2 mx-2">MQ {{ apartment.mq }} |</div>
				<div class="mx-2">
					<i class="fa-solid fa-euro-sign"></i>
					{{ apartment.daily_price }} night
				</div>
			</div>
			<hr />
			<div class="mb-2 mx-2">
				<p>{{ apartment.description }}</p>
			</div>
			<hr />

			<div class="mb-4 mx-2 col-8">
				<div class="fw-semibold">Cosa troverai:</div>
				<div class="d-flex gap-3">
					<span
						class="d-flex gap-2 my-services"
						v-for="service in apartment.services">
						<img :src="'/public/services-icons/' + service.icon" alt="" />
						{{ service.name }}
					</span>
				</div>
			</div>

			<router-link :to="{name: 'home'}" class="card-group my-4">
				<!-- CARD -->
				<button class="mb-3 btn btn-info ms-2 text-light">
					<i class="fa-solid fa-filter"></i>
					back to home
				</button>
			</router-link>
		</div>
		<div
			v-if="this.submitResult === 'success'"
			class="alert alert-success m-3">
			L'invio è andato a buon fine! Grazie per avermi contattato.
		</div>
		<div v-else-if="this.submitResult" class="alert alert-danger m-3">
			<p>There was a problem with your request:</p>
			<p v-if="!errors">
				{{ this.submitResult }}
			</p>
			<ul v-else v-for="(error, i) in this.errors">
				<li>{{ `${i}: ${error}` }}</li>
			</ul>
		</div>

		<div>
			<h1 class="my-3">Chiedi maggiori info:</h1>
			<!-- <div class="contacts-links">
				<a
					href="mailto:mail.prove@gmail.com?subject=Contatto da portfolio"
					class="link-dark">
					<i class="fa-solid fa-envelope-open fs-2 mx-3"></i>
				</a>
			</div> -->

			<form
				v-if="submitResult !== 'success'"
				@submit.prevent="onMessageFormSubmit">
				<div class="row">
					<div class="col-6">
						<div class="form-floating mb-3">
							<input
								type="text"
								class="form-control"
								v-model="messageFormInput.name"
								placeholder="Enter your fulll name" />
							<label for="floatingInput">Name</label>
							<!-- <div class="invalid-feedback">Please choose a name.</div> -->
						</div>
						<div class="form-floating mb-3">
							<input
								type="email"
								class="form-control"
								v-model="messageFormInput.email"
								placeholder="name@example.com" />
							<label for="floatingPassword">Email address</label>
						</div>
						<div class="form-floating mb-3">
							<input
								type="text"
								class="form-control"
								v-model="messageFormInput.object"
								id="floatingInput"
								placeholder="name@example.com" />
							<label for="floatingInput">Object</label>
						</div>
					</div>
					<div class="col-6">
						<div class="mb-3">
							<textarea
								class="form-control"
								v-model="messageFormInput.message"
								rows="8"
								placeholder="Message"></textarea>
						</div>
					</div>
				</div>
				<button
					type="reset"
					:disabled="loading"
					class="btn btn-secondary me-3">
					Cancel
				</button>
				<button type="submit" :disabled="loading" class="btn btn-success">
					<span
						v-if="loading"
						class="spinner-border spinner-border-sm"
						role="status"
						aria-hidden="true"></span>
					Send
				</button>
			</form>
		</div>
	</section>
</template>

<script>
import tt from '@tomtom-international/web-sdk-maps';
import axios from 'axios';
import {titles} from '../../store';
import {api_DELETE, store} from '../../store';
import ButtonDelete from '../../components/ButtonDelete.vue';

export default {
	name: 'Apartments Show',
	components: {ButtonDelete},
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
			type: Object,
		},
	},
	data() {
		return {
			store,
			apartment: {},
			loading: false,
			submitResult: '',
			errors: [],
			messageFormInput: {
				name: '',
				email: '',
				object: '',
				message: '',
			},
		};
	},
	methods: {
		onDeleteClick() {
			api_DELETE(
				this.$route.meta.apiRouteDeletePath + this.$route.params.id
			);
		},

/* MAP :::::::::::::::::::::::::::::::::::::::::::*/


 createMap(lon,lat){
		// mappa 
	this.map = tt.map({
        key: 'lAYuyhutioeCVRvHVSZgBC8wf8CPcO0E',
        container: 'map',
								center:[lon,lat],
								zoom:10,
    });



console.log()
},


		/**FUNZIONE API CALL SHOW (show).........................
		 *
		 * @param {string} thisRoutePath  es= 'apartments/create'
		 * @param {object} payload es=  {pagination:3}
		 */
		api_SHOW(thisRoutePath, payload) {
			let apiUrl = `${this.store.backedRootUrl}/api${thisRoutePath}${this.$route.params.id}`;
			axios
				.get(`${apiUrl}`, {
					params: payload,
				})
				.then((resp) => {
					if (resp.data === 'error') {
						this.$router.push('http://localhost:5173/error');
					}
					this.store.submitResult = 'success';
					this.store.loading = false;

					console.log('APPARTAMENTO', resp.data);
					this.apartment = resp.data;
					console.log(resp.data);

					/* MAPPA */
					this.createMap(this.apartment.longitude,this.apartment.latitude)
				
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
		onMessageFormSubmit() {
			this.loading = true;

			const formData = new FormData();
			formData.append('apartment_id', this.$route.params.id);
			formData.append('sender', this.messageFormInput.name);
			formData.append('email', this.messageFormInput.email);
			formData.append('subject', this.messageFormInput.object);
			formData.append('message', this.messageFormInput.message);

			console.log(this.messageFormInput);

			axios
				.post(store.backedRootUrl + '/api/messages', formData)
				.then((resp) => {
					this.submitResult = 'success';
					this.loading = false;
				})
				.catch((error) => {
					this.loading = false;

					if (error.response && error.response.data) {
						this.submitResult = error.response.data.message;
						var errorsArray = error.response.data.errors;
						this.errors = errorsArray;
						console.log(this.errors);
					} else {
						this.submitResult = error.message;
					}
				});
		},
	},
	mounted() {
		titles(this.$route.meta.title + this.$route.params.id);
		this.api_SHOW(this.$route.meta.apiRoutePath, this.$route.params);
	},
	created() {},
};
</script>

<style lang="scss" scoped>
@use '../../styles/generic.scss';
@use '../../styles/partials/variables' as *;
@import 'bootstrap/scss/_functions';
@import 'bootstrap/scss/_variables';
@import 'bootstrap/scss/mixins/_breakpoints';

.img-container {
	height: 1/3vh;

	.img-row-left img {
		@include media-breakpoint-up(lg) {
			transform: scaleY(120%) translateY(8%);
		}

		@include media-breakpoint-up(xl) {
			transform: scaleY(120%) translateY(5%);
		}
	}

	.row-dx {
		transform: scaleY(115%) scaleX(102%) translate(10px);
		position: relative;
		top: 0;
		left: 0;
	}
}

.my-services {
	img {
		width: 20px;
	}
}
</style>
