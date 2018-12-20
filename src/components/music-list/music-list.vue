<template>
  <div class="music-list" ref="musiclist">
    <div class="back" @click="back">
      <i class=" icon-back"></i>
    </div>
    <h1 class="title" v-html="title" ref="title"></h1>
    <div class="bg-image" ref="bgImage" :style="bgstyle">
      <div class="filter" ref="filter"></div>
      <div class="play-wrapper">
        <div class="play" v-show="songs.length>0"  @click="random" ref="randomPlaybtn">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <div class="scroll-wrapper" ref="scrollWrapper">
      <cube-scroll @scroll="scroll"
                      :scroll-events="['scroll']" :options="scrollOptions" ref="scroll" class="list">
        <div class="song-list-wrapper">
          <Songlist :songs="songs" @select="selectItem" :rank="rank"></Songlist>
        </div>
      </cube-scroll>
      <div class="loading-container" v-show="!songs.length">
        <loading></loading>
      </div>
    </div>
  </div>
</template>

<script>
  import Songlist from 'components/song-list/song-list'
  import { prefixStyle } from 'common/js/dom'
  import Loading from 'components/loading/loading'
  import {mapActions} from 'vuex'
  import {getLyric} from 'components/api/song'
  import {playlistMixin} from 'common/js/mixin'
  const transform = prefixStyle('transform')
  const backdrop = prefixStyle('backdrop-filter')



  export default {
    mixins: [playlistMixin],
    props: {
      bgImage: {
        type: String,
        default: ''
      },
      songs: {
        type: Array,
        default: ''
      },
      title: {
        type: String,
        default: ''
      },
      rank: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scrollY: 0,
        imageHeight: ''
      }
    },
    created(){
      // console.log(this.songs)
      
      this.scrollOptions = {
        probeType: 3
      }
    },
    methods:{
      handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        
        // this.$refs.scroll.$el.style.height = `${ls_height}px`
        if (playlist.length > 0) {
          this.$refs.scroll.$el.style.bottom = '60px'
          this.$refs.scroll.$el.style.height = '344px'
        }
        this.$refs.scroll.refresh()
      },
      scroll(e) {
        this.scrollY = e.y
      },
      back() {
        this.$router.back()
      },
      selectItem(item,index) {
        this.selectPlay({
          list: this.songs,
          index
        })
      },
      random() {
        this.randomPlay({
          list: this.songs
        })
      },
      ...mapActions([
        'selectPlay',
        'randomPlay'
      ])
    },
    watch: {
      scrollY (newY) {
        // console.log(this.$refs.layer)
        // console.log(this.minTranslateY)
        let translateY = Math.max(this.minTranslateY, newY)
        let zIndex = 0
        let scale = 1
        let blur = 0
        // console.log(translateY)
        this.$refs.layer.style[transform] = `translate3d(0,${translateY}px,0)`
        // console.log(newY)
        // console.log(this.translateY)
        const percent = Math.abs(newY / this.imageHeight)
        if (newY > 0) {
          scale = 1 + percent
          zIndex = 10
        }else{
          blur = Math.min(20*percent, 20)

        }
        this.$refs.filter.style[backdrop] = `blur(${blur}px)`

        if (newY < translateY ) {
          zIndex = 10
          this.$refs.bgImage.style.paddingTop = 0
          this.$refs.bgImage.style.height = `${this.titleHeight}px`
          this.$refs.randomPlaybtn.style.display = 'none'
        }else {
          this.$refs.bgImage.style.paddingTop = '70%'
          this.$refs.bgImage.style.height = 0
          this.$refs.randomPlaybtn.style.display =  'block'
        }
        this.$refs.bgImage.style.zIndex = zIndex
        // console.log(scale)
        this.$refs.bgImage.style[transform] = `scale(${scale})`
      }
    },
    mounted() {
      this.imageHeight = this.$refs.bgImage.clientHeight
      this.$refs.scroll.$el.style.top = `${this.imageHeight}px`
      this.titleHeight = this.$refs.title.clientHeight
      this.minTranslateY = -this.imageHeight + this.titleHeight

      let ls_height = this.$refs.musiclist.clientHeight - this.imageHeight
      // console.log(this.$refs.scroll)
      this.$refs.scroll.$el.style.height = `${ls_height}px`
      // console.log(document.createElement('div').style)
      // console.log(this.songs)
    },
    computed:{
      bgstyle() {
        return `background-image:url(${this.bgImage})`
      }
    },
    components: {
      Songlist,
      Loading
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      .play-wrapper
        position: absolute
        bottom: 20px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100px
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .scroll-wrapper
      position: absolute
      top: 0
      bottom: 0
      width: 100%
      // background: $color-background
      .cube-scroll-wrapper
        overflow: visible
      .song-list-wrapper
        padding: 20px 30px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
