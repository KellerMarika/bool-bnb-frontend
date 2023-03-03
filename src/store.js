
/* STORE:VARIABILI GOLOBALI CHE SERVONO OVUNQUE NEL SITO: */

import { reactive } from "vue";
import axios from 'axios'
export const store = reactive({
  loading: false,
  submitResult: "",
/*   backedRootUrl: 'http://127.0.0.1:8000', */
});


export function titles(pageTitle){
  document.title=pageTitle
};

/**FUNZIONE API CALL
 * 
 * @param {string} backedRootUrl  'http://127.0.0.1:8000'
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
      return resp.data
    });
};
export function api_POST(thisRoutePath, payload) {

  let backedRootUrl = 'http://127.0.0.1:8000';

  let apiUrl = `${backedRootUrl}/api${thisRoutePath}`
  console.log(apiUrl);

  axios.post(`${apiUrl}`, {
    params: payload
  })
  .then((resp) => {
       //in caso di success, salvo una variable e imposto loading a false
       this.submitResult = "success";
       this.loading = false;
       return 
       
     })
     .catch((e) => {
       //controllo che nell'errore ci sia il response.data. 
       // Non è detto che c'è sempre. Dipende dall'errore.
       if (e.response && e.response.data) {
         this.submitResult = e.response.data.message;
       } else {
         this.submitResult = e.message;
       }
       console.log(e);
       this.loading = false;
     });
    }

