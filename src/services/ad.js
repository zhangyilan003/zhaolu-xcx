import wepy from 'wepy'
import request from './request';
const apiKey = 'pYxMCUg892879d0ee2c93f15f507977bfa2b87d6eb1c5da';
export function getDogsList(params) {
  return request({
    url: 'https://api.apishop.net/common/dogFamily/queryDogListByKeyword',
    data: Object.assign({ apiKey }, params),
    method: 'POST',
    // header: {
    //   'X-APP-VER': '6.2.16',
    // },
  })
}



export function commonReq (options = {}) {
  const {url, baseUrl = '', data = {}, method = 'post', contentType = {'content-type': 'application/json'}} = options
  console.log('2333', url)
  return wepy.request({
    ...options,
    url: baseUrl + url,
    data,
    method,
    header: {
      ...contentType
    }
  })
}
