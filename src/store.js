
/* STORE:VARIABILI GOLOBALI CHE SERVONO OVUNQUE NEL SITO: */

import { reactive } from "vue";
import axios from 'axios'
export const store = reactive({
  backedRootUrl : 'http://127.0.0.1:8000',
  loading: false,
  submitResult: "",
  apartmentsList: null,
  apartmentsPagination: null
  /*   backedRootUrl: 'http://127.0.0.1:8000', */
});

/* FUNZIONE ASSEGNA TITOLO A PAGINA */
export function titles(pageTitle) {
  document.title = pageTitle
};

/* FUNZIONE ESCLUDI CHIAVE DA OGGETTO (per pagination) */
/** omit({ a: 1, b: 2, c: 3 }, 'c')  // {a: 1, b: 2}
 * 
 * @param {object} obj 
 * @param {string} omitKey 
 */
export function omitKey(obj, omitKey) {
  return Object.keys(obj).reduce((result, key) => {
    if (key !== omitKey) {
      result[key] = obj[key];
    }
    return result;
  }, {});
};

/**FUNZIONE API CALL GET (index).........................
 * 
 * @param {string} thisRoutePath  es= 'apartments/create'
 * @param {object} payload es=  {pagination:3}
 */
export function api_GET(thisRoutePath, List, payload) {

  let apiUrl = `${store.backedRootUrl}/api${thisRoutePath}`
  console.log("SHOW", apiUrl);

  return axios.get(`${apiUrl}`, {
    params: payload
  })
    .then((resp) => {
      store.submitResult = "success";
      store.loading = false;

      console.log("GET", resp.data)
      store.apartmentsList = { ...resp.data.data }
      store.apartmentsPagination = { ...omitKey(resp.data, "data") }
      /*       if (store.list) {
              console.log("ambacabanane")
              list = { ...store.list }
            } */
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

  let apiUrl = `${store.backedRootUrl}/api${thisRoutePath}`
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
export function api_DELETE(thisRoutePath, payload) {

  let apiUrl = `${store.backedRootUrl}/api${thisRoutePath}`
  console.log(apiUrl);

  axios.delete(`${apiUrl}`, {
    params: payload
  })
    .then((resp) => {
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
};
