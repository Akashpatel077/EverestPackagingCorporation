import axios from 'axios';
// axios.defaults.timeout = 50000;
import store from 'src/store';
import {storeLoader} from 'src/store/actions/authActions';
import api from './api-endpoints';

const post = (url: string, payload: any, headers: any): Promise<any> => {
  return axios.post(url, payload, {
    headers: {
      ...headers,
    },
  });
};

const upload = (url: string, payload: any, headers: any): Promise<any> => {
  console.log('API Header', headers);

  return fetch(url, {
    method: 'POST',
    headers: {
      // Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
    body: payload,
  });
};

const get = (url: string, headers: any) => {
  return axios.get(url, {headers: {...headers}});
};

export const getUserOptions = async (id: any, token: any) => {
  store.dispatch(storeLoader({loader: true}));
  const success = await axios
    .get(api.authentication.existingdatafetch + id, {
      headers: {Authorization: token},
    })
    .then((res: any) => {
      store.dispatch(storeLoader({loader: false}));
      return res.data.Response;
    })
    .catch(err => {
      console.log('error', err);
    });

  console.log('success', success);
  return success;
};

const RequestService = (
  method: 'GET' | 'POST' | 'UPLOAD',
  url: string,
  payload?: any,
  headers?: any,
  loader = true,
) => {
  store.dispatch(storeLoader({loader: loader}));
  return new Promise((resolve, reject) => {
    switch (method) {
      case 'GET': {
        get(url, headers)
          .then(res => {
            resolve(res);
            store.dispatch(storeLoader({loader: false}));
          })
          .catch(e => {
            reject(e);
            console.log('Error', e);

            store.dispatch(storeLoader({loader: false}));
          });
        break;
      }
      case 'POST': {
        post(url, payload, headers)
          .then(res => {
            // console.log('res', res);

            resolve(res);
            store.dispatch(storeLoader({loader: false}));
          })
          .catch(e => {
            reject(e);
            console.log('Error', e);
            store.dispatch(storeLoader({loader: false}));
          });
        break;
      }
      case 'UPLOAD': {
        upload(url, headers, payload)
          .then(res => {
            resolve(res);
            store.dispatch(storeLoader({loader: false}));
          })
          .catch(e => {
            reject(e);
            console.log('Error', e);
            store.dispatch(storeLoader({loader: false}));
          });
        break;
      }
      default: {
        return;
      }
    }
  });
};

export default RequestService;
