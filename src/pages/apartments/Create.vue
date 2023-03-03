<template>
  <h1>Apartments Create</h1>
  <form @submit.prevent="onFormSubmit">

    <button @click="onFormSubmit">bottone magico</button>
  </form>
</template>

<script>
import { titles } from '../../store';
import { router } from "./../../router"
import { api_POST, store } from '../../store';

export default {
  name: "Apartments Create",
  components: {},
  data() {
    return {

      store,
      form: {
        user_id: 1,
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

    onFormSubmit() {
      this.loading = true;
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



    getTitle(to) {

      router.beforeEach((to, from, next) => {
        console.log(to)
        // Get the page title from the route meta data that we have defined
        // See further down below for how we setup this data
        const title = to.meta.title
        // If the route has a title, set it as the page title of the document/page
        if (title) {
          Document.title = title
        }
        next()
      })
    }

  },
  mounted() {
    titles(this.$route.meta.title);
    this.onFormSubmit()

  },
  created() {
  }
}
</script>


<style lang="scss" scoped>
@use "../../styles/generic.scss";
@use "../../styles/partials/variables" as *;
</style>