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

 },
 mounted() {
  titles(this.$route.meta.title + this.$route.params.id);
 }
}
</script>


<style lang="scss" scoped>
@use "../../styles/generic.scss";
@use "../../styles/partials/variables" as *;
</style>