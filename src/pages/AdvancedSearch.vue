<template >
  <div class="container">
    <form @submit.prevent="">
      <div class="mb-2">
        <label for="city">Street and City</label>
        <input type="text" placeholder="Ex. Via generale cascino 14 Roma" class="form-control" id="streetNameInput" v-model="formAddress.streetName" />
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
        <label for="radiusInput">Raggio di ricerca (km):</label>
        <input type="number" id="radiusInput"  value="20" min="1" max="100">
      </div>
      
      <div class="input-container pb-2 col-12">
					<label class="form-label text-uppercase">Advanced Services:</label> <br />
					<div class="form-check form-check-inline" v-for="(service, i) in services">
						<input type="checkbox" class="form-check-input" :value="service.id" id="service_{{i}}" v-model="form.services" />
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
</template>
<script>
import axios from 'axios';
import {titles} from '../store';
import {store} from '../store';
export default {
  data() {
    return {

    }
  },
}
</script>
<style lang="">
  
</style>