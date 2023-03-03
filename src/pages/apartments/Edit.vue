<template>
 <h1>Apartments Edit</h1>
</template>

<script>
import { titles } from '../../store';
import { api_PUT, store } from '../../store';

export default {
 name: "Apartments Edit",
 components: {},
 data() {
  return {
    store,
    user_id: 1,
    form: {
    title: "Buco Hobbit",
    address: "Hobbiville, Contea",
    latitude: "14.56121",
    longitude: "22.33456",
    cover_img: "",
    description: "Non era un buco brutto, sporco, umido, pieno di vermi e di trasudo fetido, e neanche un buco arido, spoglio, sabbioso, con dentro niente per sedersi o da mangiare: era un buco hobbit, cioè comodissimo.",
    rooms_qty: 5,
    beds_qty: 2,
    bathrooms_qty: 1,
    mq: 85,
    daily_price: 200.44,
    visible: 1,
   },
  }
 },
 methods: {
  onEditFormSubmit() {
   this.store.loading = true;
   // chiamata axios ad una rotta del server alla quale inviamo i dati del form
   // siccome dobbiamo inviare un file, occorre convertire l'oggetto form in un oggetto FormData
   const formData = new FormData();
   formData.append("user_id", this.user_id);
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

   api_PUT(this.$route.meta.apiRoutePath+this.$route.params.id, formData)
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
  titles(this.$route.meta.title + this.$route.params.id);
  this.onEditFormSubmit();
 }
}
</script>


<style lang="scss" scoped>
@use "../../styles/generic.scss";
@use "../../styles/partials/variables" as *;
</style>