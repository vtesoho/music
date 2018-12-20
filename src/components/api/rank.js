import {commonParams, options} from './config'
import axios from 'axios'

const debug = process.env.NODE_ENV !== 'production'

export function getTopList () {
  const url = debug ? '/api/getTopList' : 'http://ustbhuangyi.com/music/api/getTopList'
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    // console.log(res)
    return Promise.resolve(res.data)
  })
}

export function getMusicList (topid) {
  const url = debug ? '/api/getMusicList' : 'http://ustbhuangyi.com/music/api/getMusicList'
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    needNewCode: 1,
    page: 'detail',
    type: 'top',
    tpl: 3,
    topid
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    // console.log(res)
    return Promise.resolve(res.data)
  })
}

export function getTopList_test () {
  getTopList().then((res) => {

    console.log(res)
    // res = res.replace(/<\/?.+?>/g,""); 
    // res = res.replace(/[\r\n]/g, ""); 
    // console.log(typeof res)
    // if (typeof res === "string") {
    //   // var reg = /^\w+\((.+)\}\)$/
    //   var reg = /^\w+\(({.+})\)$/
    //   const mathes = res.match(reg)
    //   console.log(mathes[1])
    //   console.log(JSON.parse(mathes[1]))
    //   // if (mathes) {
    //     const ret = JSON.parse(mathes[1])
    //   }
    //   console.log(ret)

  })
  // console.log(ret)
  if (typeof ret === "string") {
    // var reg = /^\w+\(({.+})\)$/
    // var reg = /^\w+\((.+)\}\)$/
    const mathes = ret.match(reg)
    console.log(mathes) 
    // console.log(JSON.parse(mathes[1]))
    if (mathes) {
      // console.log(JSON.parse(mathes[1]))
      // const res = JSON.parse(mathes[1])
    }
    // console.log(res)
  }

}