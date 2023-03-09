<template>
	<section class="contacts d-flex flex-column">
		<div class="container flex-fill">
			<h1 class="mt-3">Create Apartment</h1>

			<div
				class="alert alert-success"
				v-if="this.store.submitResult === 'success'">
				appartamento creato correttamente!

				<!-- HOME BUTTON -->
				<router-link @click="this.store.submitResult = ''" :to="{name: 'home'}">
					<button>TORNA ALLA HOME</button>
				</router-link>
			</div>

			<div class="alert alert-danger" v-else-if="this.store.submitResult">
				Sembra ci sia stato un errore. Ti invitiamo a riprovare pià
				tardi.<br />
				{{ this.store.submitResult }}
			</div>

			<form
				@submit.prevent="fetchTomTom"
				v-if="this.store.submitResult !== 'success'">
				<div class="mb-3">
					<label for="titleInput" class="form-label">Title</label>
					<input
						type="text"
						class="form-control"
						id="titleInput"
            placeholder="Ex. partment title"
						v-model="form.title" />
				</div>

				<div class="mb-2">
					<label for="streetNumberInput" class="form-label"
						>Street Number</label
					>
					<input
						type="text"
						placeholder="Ex. 46"
						class="form-control"
						id="streetNumberInput"
						v-model="formAddress.streetNumber" />
				</div>

				<div class="mb-2">
					<label for="streetNameInput" class="form-label"
						>Street Name</label
					>
					<input type="text" placeholder="Ex. via generale cascino" class="form-control" id="streetNameInput" v-model="formAddress.streetName" />
				</div>

				<div class="mb-2">
					<label for="postalCodeInput" class="form-label"
						>Postal Code
					</label>
					<input
						type="number"
						placeholder="Ex. 93100"
						class="form-control"
						id="postalCodeInput"
						v-model="formAddress.postalCode" />
				</div>

				<div class="mb-2">
					<label for="countryCodeInput" class="form-label"
						>Country Code</label
					>
					<input
						type="text"
						placeholder="Ex. IT"
						class="form-control text-uppercase" max="2"
						id="countryCodeInput"
						v-model="formAddress.countryCode" />
				</div>

				<div class="mb-2">
					<label for="municipalityInput" class="form-label"
						>Municipality</label
					>
					<input
						type="text"
						placeholder="Ex. roma"
						class="form-control"
						id="municipalityInput"
						v-model="formAddress.municipality" />
				</div>

				<div class="mb-2">
					<label for="cover_imgInput" class="form-label"
						>Apartment Images</label
					>
					<input type="file" class="form-control" id="cover_imgInput" @change="onAttachmentChange" />
				</div>

				<div class="mb-2">
					<label for="descriptionInput" class="form-label">
						Description
						</label>
					<textarea placeholder="Ex. describe your apartment" class="form-control" id="descriptionInput" v-model="form.description" />
				</div>

				<div class="mb-2">
					<label for="rooms_qtyInput" class="form-label">
						Rooms Quantity
					</label>
					<input type="number" placeholder="number of rooms Ex. 5" class="form-control" id="rooms_qtyInput" v-model="form.rooms_qty" />
				</div>

				<div class="mb-2">
					<label for="beds_qtyInput" class="form-label">
						Beds Quantity
						</label>
					<input type="number" placeholder="number of beds Ex. 10" class="form-control" id="beds_qtyInput" v-model="form.beds_qty" />
				</div>

				<div class="mb-2">
					<label for="bathrooms_qtyInput" class="form-label"
						>Bathrooms Quantity</label
					>
					<input
						type="number"
						placeholder="number of bethrooms Ex. 3"
						class="form-control"
						id="bathrooms_qtyInput"
						v-model="form.bathrooms_qty" />
				</div>

				<div class="mb-2">
					<label for="mqInput" class="form-label">Square Meters</label>
					<input
						type="number"
						placeholder="square meters of the apartment Ex. 75"
						class="form-control"
						id="mqInput"
						v-model="form.mq" />
				</div>

				<div class="mb-2">
					<label for="daily_priceInput" class="form-label"
						>Daily Price</label
					>
					<input
						type="number"
						step=".01"
						placeholder="daily price of the apartment Ex. 180"
						class="form-control"
						id="daily_priceInput"
						v-model="form.daily_price" />
				</div>

				<!--  {{ --visible --}} -->
				<div class="input-container pb-2 col-12 col-sm-4 col-md-2 ps-3">
					<div class="form-check form-switch p-0">
						<label class="form-check-label" for="visible">visible</label>
						<div class="form-check form-switch pt-2">
							<input type="hidden" value="1" />
							<input
								class="form-check-input"
								true-value="1"
								false-value="0"
								v-model="form.visible"
								type="checkbox"
								role="switch"
								id="visible" />
						</div>
					</div>
				</div>

				<!--    {{ --services --}} -->

				<div class="input-container pb-2 col-12">
					<label class="form-label text-uppercase">Services:</label> <br />
					<div
						class="form-check form-check-inline"
						v-for="(service, i) in services">
						<input
							type="checkbox"
							class="form-check-input"
							:value="service.id"
							id="service_{{i}}"
							v-model="form.services" />

						<label class="form-check form-check-inline" for="service_{{i}}" >{{ service.name }}
							<i>
								<img :src="'../../../public/services-icons/' + service.icon " alt="" />
							</i>
							</label>
					</div>
				</div>
				<div class="d-flex justify-content-center gap-3">
					<button class="btn btn-secondary" typeof="reset" :disabled="loading"> Annulla
					</button>
					<button class="btn btn-success" :disabled="loading">
						<span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
						Invia
					</button>
				</div>
			</form>
		</div>
	</section>
</template>

<script>
import axios from 'axios';
import {titles} from '../../store';
import {api_POST, store} from '../../store';

export default {
	name: 'Apartments Create',
	components: {},
	data() {
		return {
			store,
			apartments: [],
			services: [],

			formAddress: {
				streetNumber: '',
				streetName: '',
				countryCode: '',
				postalCode: '',
				municipality: '',
			},

			form: {
				user_id: 1,
				title: '',
				address: '',
				latitude: '',
				longitude: '',
				cover_img: '',
				description: '',
				rooms_qty: '',
				beds_qty: '',
				bathrooms_qty: '',
				mq: '',
				daily_price: '',
				visible: 0,
				services: [],
			},
		};
	},
	methods: {
		/* RECUOERA LISTA SERVIZI DISPONIBILI PER APPARTAMENTO */
		fetchServices() {
			let apiUrl = `${this.store.backedRootUrl}/api/services`;

			axios
				.get(`${apiUrl}`)
				.then((resp) => {
					this.store.submitResult = 'success';
					this.store.loading = false;
					this.services = resp.data;
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
		/* FORMATTA E INVIA AL BECKEND I DATI  DEL FORM PER LA CREAZIONE DEL NUOVO "APPARTAMENTO" E RELATIVE RELAZIONI */

		onCreateFormSubmit() {
			this.store.loading = true;
			//Assegno form. addres, longitude e latitude attraverso la chiamata axios

			const formData = new FormData();
			formData.append('user_id', this.form.user_id);
			formData.append('title', this.form.title);
			formData.append('address', this.form.address);
			formData.append('latitude', this.form.latitude);
			formData.append('longitude', this.form.longitude);
			formData.append('cover_img', this.form.cover_img);
			formData.append('description', this.form.description);
			formData.append('rooms_qty', this.form.rooms_qty);
			formData.append('beds_qty', this.form.beds_qty);
			formData.append('bathrooms_qty', this.form.bathrooms_qty);
			formData.append('mq', this.form.mq);
			formData.append('daily_price', this.form.daily_price);
			formData.append('visible', this.form.visible);

			for (let i = 0; i < this.form.services.length; i++) {
				formData.append('services[]', this.form.services[i]);
			}

			api_POST(this.$route.meta.apiRoutePath, formData);
		},
		/* RECUPERO COVER IMG DA INPUT FILE ----> QUESTA ANDRA' RIVISTA PER + IMMAGINI */
		onAttachmentChange(event) {
			// reucupero l'array dei file scelti dall'utente
			const chosenFiles = event.target.files;
			console.log(chosenFiles);
			// salvo il file scelto dentro l'oggetto form
			this.form.cover_img = chosenFiles[0];
		},

		fetchTomTom() {
			axios
				.get(this.store.geoApiUrl + this.store.geoApiKey, {
					params: this.formAddress,
				})
				.then((resp) => {
					this.form.address = resp.data.results[0].address.freeformAddress;
					this.form.latitude = resp.data.results[0].position.lat;
					this.form.longitude = resp.data.results[0].position.lon;

					this.onCreateFormSubmit();
				});
		},
	},
	mounted() {
		titles(this.$route.meta.title);
		this.fetchServices();
	},
	beforeUpdate() {
		//reset submitREsult
		this.store.submitResult = '';
	},
	created() {},
};
</script>

<style lang="scss" scoped>
@use '../../styles/generic.scss';
@use '../../styles/partials/variables' as *;
i {
  img{
    width: 25px;
    margin-left: 0.7rem;
  }
}
</style>
