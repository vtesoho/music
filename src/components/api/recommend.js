import {commonParams, options, server_url} from './config'
import axios from 'axios'

const debug = process.env.NODE_ENV !== 'production'

export function getRecommend () {
  const url = debug ? '/api/getRecommend' : server_url + 'api/getRecommend'
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function getSinger() {

}

export function getDiscList() {
  const url = debug ? '/api/getDiscList' : server_url + 'api/getDiscList'
  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}


export function getSongList (disstid) {
  
  const url = debug ? '/api/getCdInfo' : server_url + 'api/getCdInfo'
  const data = Object.assign({}, commonParams, {
    disstid: disstid,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    g_tk: 174222230
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}