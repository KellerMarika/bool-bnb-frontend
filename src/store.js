
/* STORE:VARIABILI GOLOBALI CHE SERVONO OVUNQUE NEL SITO: */

import { reactive } from "vue";
import axios from 'axios'
export const store = reactive({
  backedRootUrl: 'http://127.0.0.1:8000',

  geoApiKey: "key=OwsqVQlIWGAZAkomcYI0rDYG2tDpmRPE",
  geoApiUrl: "https://api.tomtom.com/search/2/structuredGeocode.json?",


  loading: false,
  submitResult: "",
  apartmentsList: null,
  apartmentsPagination: null,

  /*   backedRootUrl: 'http://127.0.0.1:8000', */
});

/* FUNZIONE ASSEGNA TITOLO A PAGINA */
export function titles(pageTitle) {
  document.title = pageTitle
};

/**FUNZIONE API CALL POST (create->store)....................
 * 
 * @param {string} thisRoutePath  es= 'apartments/create'
 * @param {object} payload es=  {pagination:3}
 */
export function api_POST(thisRoutePath, payload) {

  let apiUrl = `${store.backedRootUrl}/api${thisRoutePath}`
  /*  console.log(apiUrl);
  */
  axios.post(`${apiUrl}`, payload)
    .then((resp) => {
      console.log(resp);
      alert("appartamento creato con successo")
      //in caso di success, salvo una variable e imposto loading a false
      store.submitResult = "success";
      store.loading = false;
      return

    })
    .catch((e) => {
      //controllo che nell'errore ci sia il response.data. 
      // Non è detto che c'è sempre. Dipende dall'errore.
      if (e.response && e.response.data) {
        alert(`errore: ${e.response.data.message}`)
        store.submitResult = e.response.data.message;
      } else {
        store.submitResult = e.message;
      }
      console.log(e);

    });
}


/**FUNZIONE API CALL PUT (edit->update)........................
 * 
 * @param {string} thisRoutePath  es= 'apartments/create'
 * @param {object} payload es=  {pagination:3}
 */
export function api_PUT(thisRoutePath, payload) {

  let apiUrl = `${store.backedRootUrl}/api${thisRoutePath}`
  /*  console.log(apiUrl);
  */
  axios.put(`${apiUrl}`, payload)
    .then((resp) => {
      console.log(resp);

      store.submitResult = "success";
      store.loading = false;
      return

    })
    .catch((e) => {

      if (e.response && e.response.data) {
        store.submitResult = e.response.data.message;
      } else {
        store.submitResult = e.message;
      }
      console.log(e);
    });
}

/**FUNZIONE API CALL DELETE ().........................
 * 
 * @param {string} thisRoutePath  es= 'apartments/create'
 * @param {object} payload es=  {pagination:3}
 */
export function api_DELETE(thisRoutePath) {

  let apiUrl = `${store.backedRootUrl}/api${thisRoutePath}`
  let x = window.confirm("You want to delete the user?");

  if (x) {

    axios.delete(`${apiUrl}`).then((resp) => {
      store.submitResult = "success";
      store.loading = false;
      console.log("DELETE", resp)
    })
      .catch((e) => {

        if (e.response && e.response.data) {
          store.submitResult = e.response.data.message;
        } else {
          store.submitResult = e.message;
        }
        console.log(e);
      });
    alert("Apartment deleted!");
  };
};
