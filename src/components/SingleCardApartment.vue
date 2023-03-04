<template>
{{apartment.title}}
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