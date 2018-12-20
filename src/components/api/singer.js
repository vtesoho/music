import {commonParams, options} from './config'
import axios from 'axios'
import {getUid} from 'common/js/uid'
import {ERR_OK} from 'components/api/config'

const debug = process.env.NODE_ENV !== 'production'


export function getSingerlist() {
  const url = debug ? 'api/getSingerlist' : 'https//vtesoho.github.io/music/api/getSingerlist'
  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq'
  })
  return axios.get(url, {
    params: data
  }).then((response) => {
    // console.log(response)
    return Promise.resolve(response.data)
  })
}



export function getSingerDetail(singerid) {
  const url = debug ? 'api/getSingerDetail' : 'https//vtesoho.github.io/music/api/getSingerDetail'
  const data = Object.assign({}, commonParams, {
    hostUin:0,
    needNewCode:0,
    platform:'yqq',
    order:'listen',
    begin:0,
    num: 100,
    songstatus:1,
    singermid:singerid
  })
  return axios.get(url, {
    params: data
  }).then((response) => {
    // console.log(response)
    return Promise.resolve(response.data)
  })
}


export function getSongsUrl(songs) {
  const url = debug ? '/api/getPurlUrl' : 'http://ustbhuangyi.com/music/api/getPurlUrl'

  let mids = []
  let types = []

  songs.forEach((song) => {
    mids.push(song.mid)
    types.push(0)
  })

  const urlMid = genUrlMid(mids, types)

  const data = Object.assign({}, commonParams, {
    g_tk: 5381,
    format: 'json',
    platform: 'h5',
    needNewCode: 1,
    uin: 0
  })

  return new Promise((resolve, reject) => {
    let tryTime = 3

    function request() {
      return axios.post(url, {
        comm: data,
        url_mid: urlMid
      }).then((response) => {
        const res = response.data
        if (res.code === ERR_OK) {
          let urlMid = res.url_mid
          if (urlMid && urlMid.code === ERR_OK) {
            const info = urlMid.data.midurlinfo[0]
            if (info && info.purl) {
              resolve(res)
            } else {
              retry()
            }
          } else {
            retry()
          }
        } else {
          retry()
        }
      })
    }

    function retry() {
      if (--tryTime >= 0) {
        request()
      } else {
        // reject(new Error('Can not get the songs url'))
        reject(console.log('Can not get the songs url'))
      }
    }

    request()
  })
}

function genUrlMid(mids, types) {
  const guid = getUid()
  return {
    module: 'vkey.GetVkeyServer',
    method: "CgiGetVkey",
    param: {
      guid,
      songmid: mids,
      songtype: types,
      uin: '0',
      loginflag: 0,
      platform: '23'
    }
  }
}
