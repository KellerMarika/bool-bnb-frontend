
/* STORE:VARIABILI GOLOBALI CHE SERVONO OVUNQUE NEL SITO: */
import { router } from "./router";
import { reactive } from "vue";

export const store = reactive({

  backedRootUrl: 'http://127.0.0.1:8000',
});

/**FUNZIONE API CALL
 * 
 * @param {string} backedRootUrl  'http://127.0.0.1:8000'
 * @param {string} thisRoutePath  es= 'apartments/create'
 * @param {object} payload es=  {pagination:3}
 */
export function api_GET(thisRoutePath, payload) {

  let apiUrl = `${backedRootUrl}/api${thisRoutePath}`

  console.log(apiUrl)
  axios.get(`${apiUrl}`, {
    params: payload

  })
    .then((resp) => {
      return resp.data
    });
}