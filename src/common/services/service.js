import * as fetch from '../utils/fetch'

export const getSomeMes = (id, query={}, token = '') => {
  return fetch.get('/static/v1/provident-fund/employees/' + id + '/provident-fund', query, {} , token)
}