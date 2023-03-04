<template>
   {{ apartment.title }}
</template>
<script>

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

<style lang="scss" scoped></style>