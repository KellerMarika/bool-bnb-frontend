
/* STORE:VARIABILI GOLOBALI CHE SERVONO OVUNQUE NEL SITO: */

import { reactive } from "vue";
import axios from 'axios'
export const store = reactive({
  loading: false,
  submitResult: "",
  /*   backedRootUrl: 'http://127.0.0.1:8000', */
});


export function titles(pageTitle) {
  document.title = pageTitle
};

/**FUNZIONE API CALL GET (index, show).........................
 * 
 * @param {string} thisRoutePath  es= 'apartments/create'
 * @param {object} payload es=  {pagination:3}
 */
export function api_GET(thisRoutePath, payload) {

  let backedRootUrl = 'http://127.0.0.1:8000';

  let apiUrl = `${backedRootUrl}/api${thisRoutePath}`
  console.log(apiUrl);

  axios.get(`${apiUrl}`, {
    params: payload
  })
    .then((resp) => {
      store.submitResult = "success";
      store.loading = false;

      console.log(resp.data)
      return resp.data
    })
    .catch((e) => {

      if (e.response && e.response.data) {
        store.submitResult = e.response.data.message;
      } else {
        store.submitResult = e.message;
      }
      console.log(e);
    });
};

/**FUNZIONE API CALL POST (create->store)....................
 * 
 * @param {string} thisRoutePath  es= 'apartments/create'
 * @param {object} payload es=  {pagination:3}
 */
export function api_POST(thisRoutePath, payload) {

  let backedRootUrl = 'http://127.0.0.1:8000';

  let apiUrl = `${backedRootUrl}/api${thisRoutePath}`
  /*  console.log(apiUrl);
  */
  axios.post(`${apiUrl}`, payload)
    .then((resp) => {
      console.log(resp);

      //in caso di success, salvo una variable e imposto loading a false
      store.submitResult = "success";
      store.loading = false;

      return

    })
    .catch((e) => {
      //controllo che nell'errore ci sia il response.data. 
      // Non è detto che c'è sempre. Dipende dall'errore.
      if (e.response && e.response.data) {
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

  let backedRootUrl = 'http://127.0.0.1:8000';

  let apiUrl = `${backedRootUrl}/api${thisRoutePath}`
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

