<template>
	<h5>Title Apartment</h5>
	<div class="mb-2">
		{{ apartment.title }}
	</div>
	<h5>Apartment Description</h5>
	<div class="mb-2">
		{{ apartment.description }}
	</div>
	<img
		:src="this.store.backedRootUrl + '/storage/' + apartment.cover_img"
		alt="" />
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
		 */
		apartment: {
			required: true,
			type: Object,
		},
	},
	data() {
		return {
			store,
		};
	},
	methods: {},
	mounted() {},
};
</script>

<style lang="scss" scoped></style>
