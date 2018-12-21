import {commonParams, server_url} from './config'
import axios from 'axios'
import {ERR_OK} from 'components/api/config'
const debug = process.env.NODE_ENV !== 'production'

export function getLyric(mid) {
  const url = debug ? '/api/lyric' : server_url + 'api/lyric'
  // const url = '/api/lyric'
  const data = Object.assign({}, commonParams, {
    songmid: mid,
    pachetime: +new Date(),
    platform: 'yqq',
    hostUin: 0,
    needNewCode:0,
    g_tk:67732076,
    format: 'json'
  })

  return axios.get(url,{
    params: data
  }).then((res) => {
    // console.log(res)
    return Promise.resolve(res.data)
  })
}