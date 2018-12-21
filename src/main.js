import 'amfe-flexible'
import Vue from 'vue'
import {
  /* eslint-disable no-unused-vars */
  Style,
  Slide,
  Scroll,
  IndexList
} from 'cube-ui'
import App from './App'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'

import 'common/stylus/index.styl'


require('./assets/vconsole.js')



Vue.use(IndexList)
Vue.use(Slide)
Vue.use(Scroll)
Vue.use(VueLazyload)
Vue.config.productionTip = false

console.log("s")
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  store
})
