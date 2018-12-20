<template>
  <div class="recommend" ref="recommend">
    <cube-scroll ref="scroll" class="recommend-content">
      <div v-if="items.length" class="slider-wrapper">
        <div class="slider-content">
          <cube-slide ref="slide" :data="items">
            <cube-slide-item v-for="(item, index) in items" :key="index" @click.native="clickHandler(item, index)">
              <a :href="item.url">
                <img :src="item.image" />
              </a>
            </cube-slide-item>
          </cube-slide>
        </div>
      </div>
      <div class="recommend-list">
        <h1 class="list-title">热门歌单推荐</h1>
        <ul v-if="disclist">
          <li v-for="item in disclist" class="item" @click.stop="selectItem(item)">
          <!-- <li @touchstart.stop.prevent="selectItem" v-for="item in disclist" ref="gdtj" class="item"> -->
            <div class="icon">
              <img v-lazy="item.imgurl" />
            </div>
            <div class="text">
              <h2 class="name" v-html="item.creator.name"></h2>
              <p class="desc" v-html="item.dissname"></p>
            </div>
          </li>
        </ul>
      </div>
      <div class="loading-container" v-show="!disclist.length">
        <loading></loading>
      </div>
    </cube-scroll>
    <router-view></router-view>
  </div>
</template>

<script>
  import {getRecommend, getDiscList} from "api/recommend"
  import {ERR_OK} from 'api/config'
  import Loading from 'components/loading/loading'
  import {playlistMixin} from 'common/js/mixin'
  import {mapMutations} from 'vuex'
  export default {
    mixins: [playlistMixin],
    data () {
      return {
        items: [],
        disclist: []
      }
    },
    created(){
      this._getRecommend()
      this._getDisclist()
    },
    methods:{
      handlePlaylist(playlist) {
        // console.log(playlist)
        if (playlist.length > 0) {
          this.$refs.recommend.style.bottom = '60px'
          this.$refs.scroll.refresh()
        }
        // this.$refs.scroll.refresh()
      },
      selectItem(item){
        this.setDisc(item)
        this.$router.push({
          path: `/recommend/${item.dissid}`
        })
      },
      _getRecommend() {
        getRecommend().then((res) => {
          if (res.code === ERR_OK) {
            var new_data = new Array()
            for (var i = 0; i < res.data.slider.length; i++) {
              new_data[i] = {url:res.data.slider[i]['linkUrl'],image:res.data.slider[i]['picUrl']}
            }
            this.items = new_data
          }
        })
      },
      _getDisclist() {
        getDiscList().then((res) => {
          if (res.code === ERR_OK) {
            this.disclist = res.data.list
            // console.log(this.disclist)
          }
        })
      },
      onShortcutTouchStart(e){
        // console.log(e)
        // console.log(this.$refs.gdtj)
      },
      ...mapMutations({
        setDisc: 'SET_DISC'
      })
    },
    components: {
      Loading
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  
  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        height: 0
        padding-top: 40%
        overflow: hidden
        .slider-content
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
            img
              width 100%
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
        
  .cube-slide .slider-content a img
    width:100%
    height:none
</style>