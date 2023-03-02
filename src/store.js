
/* STORE:VARIABILI GOLOBALI CHE SERVONO OVUNQUE NEL SITO: */

import { reactive } from "vue";
import axios from 'axios'
export const store = reactive({

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

