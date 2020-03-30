import axios from 'axios';
import { CONSTANTS } from '../constants';

export const APICall = (url, type, data, token = null, noStringify = false, downloadFile = false) => {
  let baseURL = CONSTANTS.BASE_API_URL;
  let API_URL = `${baseURL}${url}`;
  let bodyData;
  let service;
  bodyData = noStringify ? JSON.stringify(data) : data;
  let config;

  if (downloadFile) {
    config = {
      'headers': {
        "Authorization": `Bearer ${token}`
      },
      responseType: 'arraybuffer'
    }
  }
  else if (token) {
    config = {
      'headers': {
        "Content-type": "Application/json",
        "Authorization": `Bearer ${token}`
      }
    }
  } else {
    config = {
      'headers': { "Content-type": "Application/json" }
    }
  }

  if (type.toLowerCase() === 'get') {
    service = axios.get(API_URL, config);
    return service.then(function () {
      return service;
    }).catch(function () {
      return service;
    });
  } else {
    service = axios.post(API_URL, bodyData, config);
    return service.then(function () {
      return service;
    }).catch(function () {
      return service;
    });
  }

}



