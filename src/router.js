import { createRouter, createWebHistory } from "vue-router";

import Home_Pg from "./pages/Home.vue";
import Contacts_Pg from "./pages/Contacts.vue";
import About_Pg from "./pages/About.vue";

/* APPARTIMENTS */
import ApartmentsIndex_Pg from "./pages/apartments/Index.vue";
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
      component: Home_Pg
    },
    {
      path: "/about",
      name: "about",
      component: About_Pg
    },
    {
      path: "/contacts",
      name: "contacts",
      component: Contacts_Pg
    },

    // APARTIMENTS.....................
    //index        
    {
      path: "/apartments",
      name: "Apartments.index",
      component: ApartmentsIndex_Pg,
    },
    //show
    {
      path: "/apartments/:id",
      name: "Apartments.show",
      component: ApartmentsShow_Pg,
    },
    //create
    {
      path: "/apartments/create",
      name: "Apartments.create",
      component: ApartmentsCreate_Pg,
      meta: { requiresAuth: false },
    },
    //edit
    {
      path: "/apartments/:id/edit",
      name: "Apartments.edit",
      component: ApartmentsEdit_Pg,
      meta: { requiresAuth: false },
    },
    // 404 ................................
    {
      // Cattura qualsiasi altra rotta non definita sopra.
      path: "/:catchAll(.*)",
      name: "not-found",
      component: NotFound_Pg,
    },
  ]
});

export { router };