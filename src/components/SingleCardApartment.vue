<template>
<h5>Title Apartment</h5>
<div class="mb-2">
{{apartment.title}}
</div>
<h5>Apartment Description</h5>
<div class="mb-2">
{{apartment.description}}
</div>

</template>
<script>

export default {
   props: {
      /**  
       */
      apartment: {
         required: true,
         type: Object
      }
   },
   data() {
      return {
      }
   },
   methods: {
   },
   mounted() {
   }
}
</script>

<style lang="scss" scoped>

</style>