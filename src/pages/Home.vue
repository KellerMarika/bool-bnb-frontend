<template>
	<div class="container-fluid px-5">
		<div class="d-flex justify-content-center my-5 align-items-center">
			<div class="position-relative">
				<input v-model="query" class="search__input" type="text" @input="getSuggestions"
					placeholder="Search Apartment" />

				<ul class="list-group list-group-flush" v-if="suggestions && suggestions.length > 0">
					<li class="list-unstyled list-group-item-action list-group-item" v-for="suggestion in suggestions"
						:key="suggestion.id" @click="selectSuggestion(suggestion)">
						{{ suggestion.address.freeformAddress + ' ' + suggestion.address.country }}
					</li>
				</ul>
				<button @click="fetchTomTom()" class="my-btn">
					<i class="fa-solid fa-magnifying-glass"></i>
				</button>
			</div>


			<!-- LINK ALLO SHOW -->
			<router-link
				:to="{ name: 'AdvancedSearch' }"
				class="card-group my-4">
				<button class="ms-4 rounded-5 btn-outline-dark btn px-3 py-2">
					<i class="fa-solid fa-filter"></i>
					advanced filters</button>
			</router-link>
		</div>
		<input type="text" v-model="query" class="w-100">
		<div class="card-container px-sm-2 px-xl-5">
			<h2 class="my-3">{{ querySearch ? querySearch : 'Thinked for You:' }}</h2>
			<small v-if="apartments && apartments.length">({{ apartments.length }})risultati trovati</small>
			<div class="row g-4">

				<!-- LINK ALLO SHOW -->
				<router-link
					v-for="apartment in apartments"
					:to="{ name: 'Apartments.show', params: { id: apartment.id } }"
					v-slot="{ singleCard }"
					class="col-xl-2 col-lg-3 col-md-4 col-sm-6 card-group my-4">
					<!-- CARD -->
					<SingleCardApartment :is="singleCard" :apartment="apartment">
					</SingleCardApartment>
				</router-link>
				<!-- pagination down -->
			</div>
		</div>
	</div>
</template>

<script>
import { titles } from '../store';
import axios from 'axios';
import { store } from '../store';
import SingleCardApartment from '../components/SingleCardApartment.vue';

export default {
	name: 'Home',
	components: { SingleCardApartment },
	data() {
		return {
			store,
			query: '',
			suggestions: null,
			//selectedSuggestion: null,
			/* 	coordinates: {
					lat: '',
					lon: '',
				}, */
			dataToRedirect: {
				selectedSuggestion: null,
				lat: '',
				lon: '',
			},
			pagination: null,
			apartments: null,

			api_key: '.json?storeResult=false&limit=5&countrySet=IT&view=Unified&key=OwsqVQlIWGAZAkomcYI0rDYG2tDpmRPE',
			baseUrl: 'https://api.tomtom.com/search/2/geocode/', // + this.query + '.json?'
			//url: 'https://api.tomtom.com/search/2/geocode/roma.json?storeResult=false&limit=5&countrySet=IT&view=Unified&key=',

			querySearch: '',
		};
	},
	methods: {

		/* questa funzione deve reindirizzarmi in un'altra pagina passando un oggetto,  */
		Redirect(tomtomResult) {

			this.$router.push({ name: "Apartments.index", query: { ...tomtomResult } });
		},

		// nuova funzione------------------------------------------------------------

		getSuggestions() {
			if (this.query.length > 0) {
				axios.get(`https://api.tomtom.com/search/2/geocode/${this.query}.json?storeResult=false&limit=5&countrySet=IT&view=Unified&key=OwsqVQlIWGAZAkomcYI0rDYG2tDpmRPE`)
					.then((resp) => {
						/* 	console.log(resp.data.results); */
						this.suggestions = resp.data.results;
						console.log(this.suggestions);
					})
					.catch((error) => {
						console.log(error);
					});
			} else {
				this.suggestions = [];

			}
		},

		selectSuggestion(suggestion) {
			//mi è piaciuto sopra e ho aggiunto anche a db il coutry
			this.query = (suggestion.address.freeformAddress + ', ' + suggestion.address.country);
/* 			this.dataToRedirect.selectedSuggestion = this.query; */
			this.dataToRedirect={...suggestion.position, homeSearchAddress:this.query};
			console.log('QUELLO CHE PASSO NELLA STRINGA TOMTOM', this.dataToRedirect);
			this.suggestions = [];
		},


		/**FUNZIONE API CALL GET (index).........................
			*
			* @param {string} thisRoutePath  es= 'apartments/create'
			* @param {object} payload es=  {pagination:3}
			*/

		api_GET(thisRoutePath, payload) {
			let apiUrl = `${this.store.backedRootUrl}/api${thisRoutePath}`;
			console.log('URL', apiUrl);

			axios
				.get(`${apiUrl}`, {
					params: payload,
				})
				.then((resp) => {
					this.store.submitResult = 'success';
					this.store.loading = false;

					/*      console.log("GET", resp.data) */
					this.apartments = { ...resp.data.data };
					this.pagination = { ...this.omitKey(resp.data, 'data') };
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

		/* FUNZIONE ESCLUDI CHIAVE DA OGGETTO (per pagination) */
		/** omit({ a: 1, b: 2, c: 3 }, 'c')  // {a: 1, b: 2}
			*
			* @param {object} obj
			* @param {string} omitKey
			*/

		omitKey(obj, omitKey) {
			return Object.keys(obj).reduce((result, key) => {
				if (key !== omitKey) {
					result[key] = obj[key];
				}
				return result;
			}, {});
		},

		/* CHIAMATA A GEOCODE TOM TOM RECUPERA LAT LONG E ADDRESS DA STRINGA */
		fetchTomTom() {
			if (this.selectSuggestion) {
				// axios.get("https://api.tomtom.com/search/2/geocode/De%20Ruijterkade%20154,%201011%20AC,%20Amsterdam.json?key=lAYuyhutioeCVRvHVSZgBC8wf8CPcO0E").then((resp) => {
				axios.get(this.baseUrl + encodeURIComponent(this.selectedSuggestion) + this.api_key).then((resp) => {
					console.log('LOG TOM TOM RESP', resp);

					if (resp.data.results.length) {
						this.querySearch = resp.data.results[0].address.freeformAddress;
						this.coordinates.lat = resp.data.results[0].position.lat;
						this.coordinates.lon = resp.data.results[0].position.lon;

						console.log('LOG COORDINATES E QUERY', this.coordinates + this.querySearch);

						// this.api_GET('/search', this.coordinates);
						axios
							.get('http://127.0.0.1:8000/api/search', {
								params: this.coordinates,
							})
							.then((resp) => {
								this.apartments = resp.data.data;
							});
					} else {
						return alert(
							'Ricerca non valida, inserisci un indirizzo valido!'
						);
					}
				});
			};
		},
	},
	mounted() {
		titles(this.$route.meta.title);
		this.api_GET(this.$route.meta.apiRoutePath);
	},
	created() { },
};
</script>
<style lang="scss" scoped>
@use '../styles/generic.scss';
@use '../styles/partials/variables' as *;

@import url('https://fonts.googleapis.com/css?family=Raleway:400,700,900');

/* Base styling */

.my-btn {
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
