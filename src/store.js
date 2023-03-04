
/* STORE:VARIABILI GOLOBALI CHE SERVONO OVUNQUE NEL SITO: */

import { reactive } from "vue";
import axios from 'axios'
export const store = reactive({
  loading: false,
  submitResult: "",
  apartmentsList: null,
  apartmentsPagination: null
  /*   backedRootUrl: 'http://127.0.0.1:8000', */
});


export function titles(pageTitle) {
  document.title = pageTitle
};

/**FUNZIONE API CALL GET (index).........................
 * 
 * @param {string} thisRoutePath  es= 'apartments/create'
 * @param {object} payload es=  {pagination:3}
 */
export function api_GET(thisRoutePath,List, payload) {

  let backedRootUrl = 'http://127.0.0.1:8000';

  let apiUrl = `${backedRootUrl}/api${thisRoutePath}`
  console.log("SHOW", apiUrl);

 return axios.get(`${apiUrl}`, {
    params: payload
  })
    .then((resp) => {
      store.submitResult = "success";
      store.loading = false;

      console.log("SHOW", resp.data)
      store.apartmentsList = { ...resp.data.data }
      store.apartmentsPagination = { ...resp.data}
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







/**FUNZIONE API CALL BOH (index).........................
 * 
 * @param {string} thisRoutePath  es= 'apartments/create'
 * @param {object} payload es=  {pagination:3}
 */
export async function api_BOH(thisRoutePath, list, payload) {

  let backedRootUrl = 'http://127.0.0.1:8000';

  let apiUrl = `${backedRootUrl}/api${thisRoutePath}`
  console.log("API CALL", apiUrl);

  list = await axios.get(`${apiUrl}`, {
    params: payload
  })
    .then((resp) => {
      store.submitResult = "success";
      store.loading = false;


      return resp.data
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




/**FUNZIONE API CALL SHOW (show).........................
 * 
 * @param {string} thisRoutePath  es= 'apartments/create'
 * @param {object} payload es=  {pagination:3}
 */
export function api_SHOW(thisRoutePath, payload) {

  let backedRootUrl = 'http://127.0.0.1:8000';

  let apiUrl = `${backedRootUrl}/api${thisRoutePath}`
  console.log("SHOW", apiUrl);

  axios.get(`${apiUrl}`, {
    params: payload
  })
    .then((resp) => {
      store.submitResult = "success";
      store.loading = false;

      console.log("SHOW", resp.data.data[0])
      return resp.data.data[0]
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
/**FUNZIONE API CALL DELETE ().........................
 * 
 * @param {string} thisRoutePath  es= 'apartments/create'
 * @param {object} payload es=  {pagination:3}
 */
export function api_DELETE(thisRoutePath, payload) {

  let backedRootUrl = 'http://127.0.0.1:8000';

  let apiUrl = `${backedRootUrl}/api${thisRoutePath}`
  console.log(apiUrl);

  axios.delete(`${apiUrl}`, {
    params: payload
  })
    .then((resp) => {
      store.submitResult = "success";
      store.loading = false;

      console.log("DELETE", resp.data)
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
