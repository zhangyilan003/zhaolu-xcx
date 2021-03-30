import request from './request';

const BASE_URL = 'https://api.apishop.net/common/'

export function commonReq({ url, baseUrl = BASE_URL, data, method = 'post', contentType = { 'content-type': 'application/x-www-form-urlencoded' }, options = {} }) {
  return request({
    url: url.indexOf('http') === -1 ? baseUrl + url : url,
    data,
    method,
    header: {
      ...contentType
    },
    ...options
  })
}

export function apiReq({ url, baseUrl = BASE_URL, data, method = 'post', contentType = { 'content-type': 'application/x-www-form-urlencoded' }, options = {}  }) {
  const newUrl =
  return request({
    url: url.indexOf('http') === -1 ? baseUrl + url : url,
    data,
    method,
    header: {
      ...contentType
    },
    ...options
  })
}
