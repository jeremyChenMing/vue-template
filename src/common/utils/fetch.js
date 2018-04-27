import 'es6-promise'
import fetch from 'isomorphic-fetch'
import qs from 'qs'
import _ from 'underscore'

let rootState = {}

const requestTimeOut = 1000 * 600

// export const syncStateToFetch = (app, initialState) => {
//   rootState = app._store.getState()
//   if (_.isEmpty(rootState)) {
//     rootState = initialState
//   }
// }

const checkStatus = (response) => {
  switch (response.status) {
    case 200:
      return response
    case 409:
      return response
    case 400:
      return response
    case 401:
      // window.location.href = '/'
      break
    case 302:
      return response
    default:
      return response
  }
}

const parseJSON = (response) => {
  return response.json().then(json => {
    return json
  }).catch(err => {
    console.log(err)
    return Promise.reject({ // eslint-disable-line
      code: -1,
      msg: err + ''
    })
  })
}

const completeHeader = (header) => {
  const state = (rootState || {}).user || {}

  const {token} = state

  const result = {
    ...header,
    ...{
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : ''
    }
  }

  if (!token) delete result.Authorization

  return result
}

export const getUrl = (url, query) => {
  return _.isEmpty(query) ? url : `${url}?${qs.stringify(query)}`
}

export const get = (url, query = {}, options = {}, token) => {
  const defaultOpt = {
    method: 'GET',
    timeout: requestTimeOut,
    headers: {...options}
  }

  defaultOpt.headers = completeHeader(defaultOpt.headers)
  if (token) {
    defaultOpt.headers['Authorization'] = token
  }
  console.log(defaultOpt, '------')
  return fetch(getUrl(url, query), defaultOpt).then(checkStatus).then(parseJSON)
}

export const post = (url, query = {}, data = {}, options = {}) => {
  const defaultOpt = {
    method: 'POST',
    timeout: requestTimeOut,
    body: JSON.stringify(data),
    headers: {...options}
  }

  defaultOpt.headers = completeHeader(defaultOpt.headers)

  return fetch(getUrl(url, query), defaultOpt).then(checkStatus).then(parseJSON)
}

export const put = (url, query = {}, data = {}, options = {}) => {
  const defaultOpt = {
    method: 'PUT',
    timeout: requestTimeOut,
    body: JSON.stringify(data),
    headers: {...options}
  }

  defaultOpt.headers = completeHeader(defaultOpt.headers)

  return fetch(getUrl(url, query), defaultOpt).then(checkStatus).then(parseJSON)
}

export const del = (url, query = {}, data = {}, options = {}) => {
  const defaultOpt = {
    method: 'DELETE',
    headers: {...options},
    timeout: requestTimeOut,
    body: JSON.stringify(data)
  }

  defaultOpt.headers = completeHeader(defaultOpt.headers)

  return fetch(getUrl(url, query), defaultOpt).then(checkStatus).then(parseJSON)
}

export const patch = (url, query = {}, data = {}, options = {}) => {
  const defaultOpt = {
    method: 'PATCH',
    timeout: requestTimeOut,
    body: JSON.stringify(data),
    headers: {...options}
  }

  defaultOpt.headers = completeHeader(defaultOpt.headers)

  return fetch(getUrl(url, query), defaultOpt).then(checkStatus).then(parseJSON)
}

export const postFormData = (url, query = {}, data = {}, options = {}) => {
  const formData = new window.FormData()

  for (let i in data) {
    formData.append(i, data[i])
  }

  const defaultOpt = {
    method: 'POST',
    timeout: requestTimeOut,
    body: formData,
    headers: {...options}
  }

  defaultOpt.headers = completeHeader(defaultOpt.headers)

  delete defaultOpt.headers['Content-Type']
  return fetch(getUrl(url, query), defaultOpt).then(checkStatus).then(parseJSON)
}

export const putFormData = (url, query = {}, data = {}, options = {}) => {
  const formData = new window.FormData()

  for (let i in data) {
    formData.append(i, data[i])
  }

  const defaultOpt = {
    method: 'PUT',
    timeout: requestTimeOut,
    body: formData,
    headers: {...options}
  }

  defaultOpt.headers = completeHeader(defaultOpt.headers)

  delete defaultOpt.headers['Content-Type']

  return fetch(getUrl(url, query), defaultOpt).then(checkStatus).then(parseJSON)
}

export const patchFormData = (url, query = {}, data = {}, options = {}) => {
  const formData = new window.FormData()

  for (let i in data) {
    formData.append(i, data[i])
  }

  const defaultOpt = {
    method: 'PATCH',
    timeout: requestTimeOut,
    body: formData,
    headers: {...options}
  }

  defaultOpt.headers = completeHeader(defaultOpt.headers)

  delete defaultOpt.headers['Content-Type']

  return fetch(getUrl(url, query), defaultOpt).then(checkStatus).then(parseJSON)
}
