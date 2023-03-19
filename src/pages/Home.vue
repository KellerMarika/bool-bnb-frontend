<template>
	<div class="container-fluid px-5">
		<div class="d-flex justify-content-center my-5 align-items-center">
			<div class="position-relative">
				<input v-model="querySearchText" class="search__input" type="text" @input="getSuggestions"
					placeholder="Cerca Appartamento" />

				<ul class="list-group list-group-flush" v-if="suggestions && suggestions.length > 0">
					<li class="list-unstyled list-group-item-action list-group-item" v-for="suggestion in suggestions"
						:key="suggestion.id" @click="selectSuggestion(suggestion)">
						{{ suggestion.address.freeformAddress + ' ' + suggestion.address.country }}
					</li>
				</ul>
				<button class="my-btn">
					<i class="fa-solid fa-magnifying-glass"></i>
				</button>
			</div>
		</div>
	</div>

	<div class="card-container px-sm-2 px-xl-5 bg-bunner  pt-4">

		<!-- non dovrebbe servire perchè avviene il redirect -->
		<h2 class="my-3 text-center">{{ querySearch ? querySearch : 'Pensati per Te' }}</h2>
		<small v-if="apartments && apartments.length">({{ apartments.length }})risultati trovati</small>
		<div class="row row-cols-sm-2 row-cols-md-3 row-cols-xl-4 row-cols-xxl-5 g-4 px-md-5">

			<!-- LINK ALLO SHOW -->
			<router-link
				v-for="apartment in apartments"
				:to="{ name: 'Apartments.show', params: { id: apartment.id } }"
				v-slot="{ singleCard }"
				class="card-group my-4">
				<!-- CARD -->
				<SingleCardApartment :is="singleCard" :apartment="apartment">
				</SingleCardApartment>
			</router-link>
			<!-- pagination down -->
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
			querySearchText: '',
			suggestions: null,


			dataToRedirect: {
				selectedSuggestion: null,
				lat: '',
				lon: '',

			},
			pagination: null,
			apartments: null,

			api_key: '.json?storeResult=false&limit=5&countrySet=IT&view=Unified&key=OwsqVQlIWGAZAkomcYI0rDYG2tDpmRPE',
			baseUrl: 'https://api.tomtom.com/search/2/geocode/',

			// non dovrebbe servire perchè avviene il redirect 
			querySearch: '',
		};
	},
	methods: {

		// AUTOCOMPLETE ------------------------------------------------------------
		getSuggestions() {
			if (this.querySearchText.length > 0) {
				axios.get(`https://api.tomtom.com/search/2/geocode/${this.querySearchText}.json?storeResult=false&limit=5&countrySet=IT&view=Unified&key=OwsqVQlIWGAZAkomcYI0rDYG2tDpmRPE`)
					.then((resp) => {
						/* 	console.log(resp.data.results); */
						this.suggestions = resp.data.results;
						/* 						console.log(this.suggestions); */
					})
					.catch((error) => {
						console.log(error);
					});
			} else {
				this.suggestions = [];
			}
		},
		/* SELECT ADDRESS FROM AUTOCOMPELTE */
		selectSuggestion(suggestion) {
			//mi è piaciuto sopra e ho aggiunto anche a db il coutry
			this.querySearchText = (suggestion.address.freeformAddress + ', ' + suggestion.address.country);
			/* 			this.dataToRedirect.selectedSuggestion = this.querySearchText; */
			this.dataToRedirect = { ...suggestion.position, homeSearchAddress: this.querySearchText };
			/* 	console.log('QUELLO CHE PASSO IN ADVANCED SEARCH E SU CUI FACCIO LA CALL TOMTOM', this.dataToRedirect); */

			//reset list sparisce dropdown!
			this.suggestions = [];

			//REDIRECT
			/* 	this.$router.push({ name: "AdvancedSearch", query: { ...this.dataToRedirect } }); */
			this.$router.push({ name: "AdvancedSearch", query: this.dataToRedirect });
		},

		/**FUNZIONE API CALL GET (index).........................
			*
			* @param {string} thisRoutePath  es= 'apartments/create'
			* @param {object} payload es=  {pagination:3}
			*/

		api_GET(thisRoutePath, payload) {
			let apiUrl = `${this.store.backedRootUrl}/api${thisRoutePath}`;
			/* 			console.log('URL', apiUrl); */
			axios
				.get(`${apiUrl}`, {
					params: payload,
				})
				.then((resp) => {
					//this.store.submitResult = 'success';
					//this.store.loading = false;

					/*      console.log("GET", resp.data) */
					this.apartments = { ...resp.data.data };
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
		/* 	console.log(this.$router.getRoutes()[2]) */
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
		padding: 12px 28px;

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
			letter-spacing: 1px;
		}
	}
}
</style>
