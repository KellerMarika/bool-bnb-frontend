import { createRouter, createWebHistory } from "vue-router";

import Home_Pg from "./pages/Home.vue";
import Contacts_Pg from "./pages/Contacts.vue";
import About_Pg from "./pages/About.vue";

/* APPARTIMENTS */
import ApartmentsIndex_Pg from "./pages/apartments/Index.vue";
import AdvancedSearch from "./pages/AdvancedSearch.vue";
import ApartmentsCreate_Pg from "./pages/apartments/Create.vue";
import ApartmentsShow_Pg from "./pages/apartments/Show.vue";
import ApartmentsEdit_Pg from "./pages/apartments/Edit.vue";


/* rotta 404 */
import NotFound_Pg from "./pages/NotFound.vue";


const router = createRouter({
  // Serve ad indicare come gestire l'url al cambio pagina
  history: createWebHistory(),
  routes: [

    // BASIC PAGES........
    {
      path: "/",
      name: "home",
      props: true,
      component: Home_Pg,
      meta: { title: "HOME", apiRoutePath: "/apartments" },
    },
    {
      path: "/advancedSearch",
      name: "AdvancedSearch",
      component: AdvancedSearch,
      meta: { title: "ADVANCED SEARCH",  /* apiRoutePath:"/admin/apartments", */  apiRouteIndexPath: "/apartments" ,apiRouteSearchPath: "/search"},
    },
    {
      path: "/about",
      name: "about",
      component: About_Pg,
      meta: { title: "ABOUT" },
    },
    {
      path: "/contacts",
      name: "contacts",
      component: Contacts_Pg,
      meta: { title: "CONTACTS" },
    },

    // APARTIMENTS.....................
    //index        
    {
      path: "/apartments",
      name: "Apartments.index",
      props: true,
      component: ApartmentsIndex_Pg,
      meta: { title: "GALLERY APARTMENTS", apiRoutePath: "/apartments" },
    },
    //show
    {
      path: "/apartments/:id",
      name: "Apartments.show",
      component: ApartmentsShow_Pg,
      meta: { title: "APARTMENT: #", apiRoutePath: "/apartments/", apiRouteDeletePath: "/admin/apartments/" },
    },
    //create
    /* {
      path: "/apartments/create",
      name: "Apartments.create",
      component: ApartmentsCreate_Pg,
      meta: { title:"CREATE NEW APARTNENT", apiRoutePath:"/admin/apartments"},
    },
    //edit
    {
      path: "/apartments/:id/edit",
      name: "Apartments.edit",
      component: ApartmentsEdit_Pg,
      meta: { title:"EDIT APARTMENT: #", apiShowRoutePath:"/apartments/",apiUpdateRoutePath:"/admin/apartments/"}
    }, */
    // 404 ................................
    {
      // Cattura qualsiasi altra rotta non definita sopra.
      path: "/:catchAll(.*)",
      name: "not-found",
      component: NotFound_Pg,
      meta: { title: "PAGE NOT FOUND" }
    },
  ]
});

export { router };