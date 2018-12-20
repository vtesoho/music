import Vue from 'vue'
import HelloWorld from '@/components/recommend/recommend'

describe('recommend.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(HelloWorld)
    const vm = new Constructor().$mount()
  })
})
