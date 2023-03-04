<template>
  <h1>Apartments Create</h1>

  <section class="contacts d-flex flex-column ">
    <div class="container flex-fill">
      <h1 class="mt-3">Create Apartment</h1>

      <div class="alert alert-success" v-if="submitResult === 'success'">
        Messaggio inviato correttamente. Ti risponderemo il prima possibile
      </div>

      <div class="alert alert-danger" v-else-if="submitResult">
        Sembra ci sia stato un errore. Ti invitiamo a riprovare pià tardi.<br />
        {{ submitResult }}
      </div>

      <form @submit.prevent="onCreateFormSubmit" v-if="submitResult !== 'success'">
        <div class="mb-3">
          <label for="titleInput" class="form-label">Title</label>
          <input type="text" class="form-control" id="titleInput" v-model="form.title" />
        </div>

        <div class="mb-2">
          <label for="streetNumberInput" class="form-label">Street Number</label>
          <input type="text" placeholder="Ex. 46" class="form-control" id="streetNumberInput"
              v-model="formAddress.streetNumber" />
        </div>

        <div class="mb-2">
          <label for="streetNameInput" class="form-label">Street Name</label>
          <input type="text" placeholder="Ex. via generale cascino" class="form-control" id="streetNameInput"
              v-model="formAddress.streetName" />
        </div>

        <div class="mb-2">
          <label for="postalCodeInput" class="form-label">Postal Code </label>
          <input type="number" placeholder="Ex. 93100" class="form-control" id="postalCodeInput"
              v-model="formAddress.postalCode" />
        </div>

        <div class="mb-2">
          <label for="countryCodeInput" class="form-label">Country Code</label>
          <input type="text" placeholder="Ex. IT" class="form-control" id="countryCodeInput"
              v-model="formAddress.countryCode" />
        </div>

        <div class="mb-2">
          <label for="municipalityInput" class="form-label">Municipality</label>
          <input type="text" placeholder="Ex. roma" class="form-control" id="municipalityInput"
              v-model="formAddress.municipality" />
        </div>


        <div class="mb-2">
          <label for="cover_imgInput" class="form-label">Apartment Images</label>
          <input type="file" class="form-control" id="cover_imgInput" @change="onAttachmentChange" />
        </div>

        <div class="mb-2">
          <label for="descriptionInput" class="form-label">Description</label>
          <textarea placeholder="Ex. describe your apartment" class="form-control" id="descriptionInput"
              v-model="form.description" />
        </div>

        <div class="mb-2">
          <label for="rooms_qtyInput" class="form-label">Rooms Quantity</label>
          <input type="number" placeholder="number of rooms Ex. 5" class="form-control" id="rooms_qtyInput"
              v-model="form.rooms_qty" />
        </div>

        <div class="mb-2">
          <label for="beds_qtyInput" class="form-label">Beds Quantity</label>
          <input type="number" placeholder="number of beds Ex. 10" class="form-control" id="beds_qtyInput"
              v-model="form.beds_qty" />
        </div>

        <div class="mb-2">
          <label for="bathrooms_qtyInput" class="form-label">Bathrooms Quantity</label>
          <input type="number" placeholder="number of bethrooms Ex. 3" class="form-control" id="bathrooms_qtyInput"
              v-model="form.bathrooms_qty" />
        </div>

        <div class="mb-2">
          <label for="mqInput" class="form-label">Square Meters</label>
          <input type="number" placeholder="square meters of the apartment Ex. 75" class="form-control" id="mqInput"
              v-model="form.mq" />
        </div>

        <div class="mb-2">
          <label for="daily_priceInput" class="form-label">Daily Price</label>
          <input type="number" step="0.01" placeholder="daily price of the apartment Ex. 180" class="form-control"
              id="daily_priceInput" v-model="form.daily_price" />
        </div>

        <!--*** da aggiungere checkbox per visible  ***-->
        <!-- 
        <div class="mb-2">
          <label for="visibleInput" class="form-label">Visible</label>

          <input type="checkbox" placeholder="visible" class="form-control" id="visibleInput" v-model="form.visible" />
        </div> -->
        <!-- ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: -->



        <!--  {{ --visible --}} -->
        <div class="input-container pb-2 col-12  col-sm-4 col-md-2 ps-3">
          <div class="form-check form-switch p-0">

            <label class="form-check-label" for="visible">visible</label>
            <div class="form-check form-switch pt-2">

              <!--    {{ --2 imput per raccogliere true o false subito-- }} -->
              <input type="hidden" value="0">
              <input
                  class="form-check-input"
                  value="1" v-model="form.visible" type="checkbox" role="switch" id="visible">
            </div>
          </div>
        </div>


        <!--    {{ --services --}} -->

        <div class="input-container pb-2 col-12 ">
          <label class="form-label text-uppercase">Tecnologie:</label> <br>
          <div class="form-check form-check-inline" v-for=" tecnology, i in tecnologies">
            <input type="checkbox"
                class="form-check-input"
                :value="tecnology.id"

                id="tecnology_{{i}}"
                v-model="createForm.tecnologies">

            <label class="form-check form-check-inline"
                for="tecnology_{{i}}">{{ tecnology.name }}</label>
          </div>

        </div>

        <!-- ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: -->

        <!-- //**************************************************** */ -->
        <div class="d-flex justify-content-center gap-3">
          <button class="btn btn-secondary" typeof="reset" :disabled="loading">
            Annulla
          </button>
          <button class="btn btn-success" :disabled="loading">
            <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Invia
          </button>
        </div>
      </form>

      <!-- <a href="mailto:pippo@gmail.com?subject=testo di prova&body=messaggio predefinito">email</a>
      <a href="tel:3333333333">telefono</a> -->
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import { titles } from '../../store';
import { api_POST, store } from '../../store';

export default {
  name: "Apartments Create",
  components: {},
  data() {
    return {

      store,
      services: null,

      formAddress: {
        streetNumber: "",
        streetName: "",
        countryCode: "",
        postalCode: "",
        municipality: "",
      },


      form: {
        user_id: 1,
        title: "",
        address: "via giuseppe di v,7",
        latitude: "14.22245",
        longitude: "14.22245",
        cover_img: "",
        description: "",
        rooms_qty: "",
        beds_qty: "",
        bathrooms_qty: "",
        mq: "",
        daily_price: "",
        visible: 0,
      },
    }
  },
  methods: {

    fetchServices() {

      let apiUrl = `${this.store.backedRootUrl}/api/services`
      console.log("URL", apiUrl);

      axios.get(`${apiUrl}`)
        .then((resp) => {
          console.log(resp)
        /*   this.store.submitResult = "success";
          this.store.loading = false; */

          /*      console.log("GET", resp.data) */
        /*   this.services = resp.data 
 */
        })
       /*  .catch((e) => {

          if (e.response && e.response.data) {
            this.store.submitResult = e.response.data.message;
          } else {
            this.store.submitResult = e.message;
          }
          console.log(e);
        }); */
    },

    onCreateFormSubmit() {
      this.store.loading = true;
      // chiamata axios ad una rotta del server alla quale inviamo i dati del form
      // siccome dobbiamo inviare un file, occorre convertire l'oggetto form in un oggetto FormData
      const formData = new FormData();
      formData.append("user_id", this.form.user_id);
      formData.append("title", this.form.title);
      formData.append("address", this.form.address);
      formData.append("latitude", this.form.latitude);
      formData.append("longitude", this.form.longitude);
      formData.append("cover_img", this.form.cover_img);
      formData.append("description", this.form.description);
      formData.append("rooms_qty", this.form.rooms_qty);
      formData.append("beds_qty", this.form.beds_qty);
      formData.append("bathrooms_qty", this.form.bathrooms_qty);
      formData.append("mq", this.form.mq);
      formData.append("daily_price", this.form.daily_price);
      formData.append("visible", this.form.visible);

      api_POST(this.$route.meta.apiRoutePath, formData)
    },

    onAttachmentChange(event) {
      // reucupero l'array dei file scelti dall'utente
      const chosenFiles = event.target.files
      console.log(chosenFiles);
      // salvo il file scelto dentro l'oggetto form
      this.form.cover_img = chosenFiles[0];
    },

  },
  mounted() {
    titles(this.$route.meta.title);
    this.fetchServices();
  },
  created() {
  }
}
</script>


<style lang="scss" scoped>
@use "../../styles/generic.scss";
@use "../../styles/partials/variables" as *;
</style>