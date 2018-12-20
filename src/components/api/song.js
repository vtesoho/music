import {commonParams} from './config'
import axios from 'axios'
import {ERR_OK} from 'components/api/config'


export function getLyric(mid) {
  const url = '/api/lyric'
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