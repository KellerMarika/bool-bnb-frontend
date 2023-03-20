<template>
  <nav class="navbar navbar-expand-md navbar-primary shadow-sm  p-0">
    <div class="container-fluid px-md-5 d-flex align-items-md-end">

      <a class="align-self-start navbar-brand d-flex align-items-center" href="/">
        <div class="logo pt-2 ">

          <img src="/BoolBnB_logo.png" alt="LOGO" class="header nav-logo pb-2 mb-2">
        </div>
      </a>

      <div class="flex-fill w-100 ps-3 pe-2 pe-lg-3  text-end">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
            aria-label="Toggle navigation"><!-- {{ __('Toggle navigation') }} -->
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">

          <!-- Left Side Of Navbar -->
          
        
          <ul class="navbar flex-column flex-md-row  nav me-md-auto align-items-end py-0 fw-semibold">
            <li class="nav-item d-flex flex-column align-items-center">
              <a class="nav-link fs-5  pt-md-4 px-2 "
              :class="this.$route.name=='home'? 'active':''" 
              href="/"> Home</a>
              <div class="link-underline m-3 mb-0"></div>
            </li>
            <!-- <li class="nav-item  d-flex flex-column align-items-center">
              <a class="nav-link fs-5  pt-md-4 px-2"
              :class="this.$route.name=='Apartments.index'? 'active':''" 
                  href="/apartments">
                Apartments</a>
              <div class="link-underline m-3 mb-0"></div>
            </li> -->

            <li class="nav-item  d-flex flex-column align-items-center">
              <a class="nav-link fs-5  pt-md-4 px-2" 
              :class="this.$route.name=='about'? 'active':''"
              href="/about">
                Chi Siamo</a>
              <div class="link-underline m-3 mb-0"></div>
            </li>
            <li class="nav-item  d-flex flex-column align-items-center">
              <a class="nav-link fs-5  pt-md-4 px-2"
              :class="this.$route.name=='contacts'? 'active':''"
              href="/contacts">
                Contatti</a>
              <div class="link-underline m-3 mb-0"></div>
            </li>
          </ul>
          
          <!-- Right Side Of Navbar -->
          <ul class="navbar-nav ml-auto align-items-end">

            <li class="nav-item   d-flex flex-column align-items-center">
              <a class=" fa-solid fa-user-tie nav-link fs-5 pt-md-4 px-2 fs-2"
                  :href="store.backedRootUrl + '/Admin/dashboard'"></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { store } from "../store"
export default {
  name: 'header',
  data() {
    return {
      store,
      navItems: [
        {
        },

      ],
    };
  },
};
</script>

<style scoped lang="scss">
@use "../styles/generic.scss";
@use "../styles/partials/variables.scss";

/***** NAVBAR ******/
nav {
  .nav-logo {
    height: 70px;
  }

  .nav-item {
    a {
      text-decoration: none;
      color: variables.$dark_color;

      &+.link-underline {
        background-color: variables.$primary_color;
        height: 0px;
        width: 0px;
        transition: all .3s;
      }

      &:hover,
      &:active,
      &.active {
        color: saturate(variables.$primary_color, 20%);

        &+.link-underline {
          background-color: saturate(variables.$primary_color, 20%);
          height: 2px;
          width: calc(100% - 1rem);
        }
      }
    }
  }
}
</style>
