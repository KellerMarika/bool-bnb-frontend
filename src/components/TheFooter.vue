<template>
  <footer class=" text-light position-relative">
    <div class="footer-bg-top-img"></div>
    <div class="container overflow-auto">

      <div class="row row-cols-1 row-cols-md-3 mt-5 p-5 overflow-auto">
        <ul class="list-unstyled col py-2">
          <li> <a style="color: white;" href="#">Supporto clienti</a></li>
          <li> <a style="color: white;" href="#">Help center</a></li>
          <li> <a style="color: white;" href="#">Boolbnb center</a></li>
          
        </ul>
        <ul class="list-unstyled col py-2">
          <li> <a style="color: white;" href="#">Newsroom</a></li>
          <li> <a style="color: white;" href="#">Careers</a></li>
          <li> <a style="color: white;" href="#">Lavora con noi</a></li>
        </ul>
        <ul class="list-unstyled col py-2">
          <li> <a style="color: white;" href="#">Partners</a></li>
          <li> <a style="color: white;" href="#">Clienti</a></li>
          <li> <a style="color: white;" href="#">Investitori</a></li>
        </ul>
      </div>

    </div>
  </footer>
</template>

<script>
export default {
  name: 'footer',
  data() {
    return {

    };
  },
};
</script>


<style scoped lang="scss">
@use '../styles/partials/variables.scss' as *;
footer {
  margin-top: 350px;
  min-height: 200px;
  background-color: $secondary_color_dark;

  .footer-bg-top-img {
    position: absolute;
    top: -210px;
    background-image: url('../../public/footer.png');
    background-position:right;
    background-size: cover;
    background-repeat: repeat-x;
    width: 100%;
    height: 210px;
  }

}
</style>