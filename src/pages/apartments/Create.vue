<template>
  <h1>Apartments Create</h1>
</template>

<script>
import { titles } from '../../store';
import { router } from "./../../router"
import { api_POST, store} from '../../store';

import axios from 'axios';
export default {
  name: "Apartments Create",
  components: {},
  data() {
    return {

      store,

      apartments: [],

      
      
      form: {
        user_id:"",
        title: "",
        address: "",
        latitude: "",
        longitude: "",
        cover_img: "",
        description: "",
        rooms_qty: "",
        beds_qty: "",
        bathrooms_qty: "",
        mq: "",
        daily_price: "",
        visible: "",
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

      api_POST(this.$route.meta.apiPrefix + this.$route.fullPath, formData)
      // post(url, dati) - i dati devono essere un oggetto js.
      // api_POST(this.$route.meta.apiPrefix+this.$route.fullPath, formData)
      // axios.post("http://127.0.0.1:8000/api/admin/apartments", formData)
      // .then((resp) => {
      //     // in caso di success, salvo una variable e imposto loading a false
      //     this.submitResult = "success";
      //     this.loading = false;
      //   })
      //   .catch((e) => {
      //     // controllo che nell'errore ci sia il response.data. 
      //     // Non è detto che c'è sempre. Dipende dall'errore.
      //     if (e.response && e.response.data) {
      //       this.submitResult = e.response.data.message;
      //     } else {
      //       this.submitResult = e.message;
      //     }
      //     console.log(e);
      //     this.loading = false;
      //   });
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
  
  },
  created() {
  }
}
</script>


<style lang="scss" scoped>
@use "../../styles/generic.scss";
@use "../../styles/partials/variables" as *;
</style>