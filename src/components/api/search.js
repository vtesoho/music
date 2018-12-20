import {commonParams, options} from './config'
import axios from 'axios'
const debug = process.env.NODE_ENV !== 'production'

export function getHotKey () {
  const url = debug ? '/api/getHotKey' : 'http://ustbhuangyi.com/music/api/getHotKey'
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    needNewCode: 1
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    // console.log(res)
    return Promise.resolve(res.data)
  })
  
}



export function search(query, page, zhida, perpage) {
  const url = debug ? '/api/search' : 'http://ustbhuangyi.com/music/api/search'
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    needNewCode: 1,
    w: query,
    p: page,
    catZhida: zhida ? 1 : 0,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    perpage: perpage,
    n: perpage,
    remoteplace: 'txt.mqq.all',
    uid: 0
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    // console.log(res)
    return Promise.resolve(res.data)
  })
}