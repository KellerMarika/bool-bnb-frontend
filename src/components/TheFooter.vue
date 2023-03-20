<template>
  <footer class=" text-light position-relative">
    <div class="footer-bg-top-img"></div>
    <div class="container overflow-auto">

      <div class="row row-cols-1 row-cols-md-3 mt-5 p-5 overflow-auto">
        <ul class="col py-2">
          <li>link</li>
          <li>link</li>
          <li>link</li>
        </ul>
        <ul class="col py-2">
          <li>link</li>
          <li>link</li>
          <li>link</li>
        </ul>
        <ul class="col py-2">
          <li>link</li>
          <li>link</li>
          <li>link</li>
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