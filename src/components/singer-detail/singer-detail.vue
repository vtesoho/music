<template>
  <transition name="slide">
    <div class="singer-detail">
      <music-list 
        :songs="songs"
        :title="title" 
        :bgImage="bgImage"
      ></music-list>
    </div>
  </transition>
</template>
<script type="text/javascript">
  import MusicList from 'components/music-list/music-list'
  import {mapGetters} from 'vuex'
  import {getSingerDetail} from 'components/api/singer'
  import {ERR_OK} from 'components/api/config'
  import {creatSong,processSongsUrl} from 'common/js/song'
  export default {
    data() {
      return {
        songs: []
      }
    },
    computed: {
      title() {
        return this.singer.name
      },
      bgImage() {
        return this.singer.avatar
      },
      ...mapGetters([
        'singer'
      ])
    },
    created() {
      this._getDetail()
      // console.log(this.singer)
    },
    methods: {
      _getDetail() {
        if (!this.singer.id) {
          this.$router.push('/singer')
          return
        }
        getSingerDetail(this.singer.id).then((res) => {
          if (res.code === ERR_OK) {
            processSongsUrl(this._normalizeSongs(res.data.list)).then((songs) => {
              this.songs = songs
              // console.log(this.songs)
            })
            // this.songs = this._normalizeSongs(res.data.list)
            
          }
        })
      },
      _normalizeSongs(list) {
        let ret = []
        // console.log(list)
        list.forEach((item) => {
          let {musicData} = item
          if (musicData.songid && musicData.albummid) {
            ret.push(creatSong(musicData))
          }
        })
        return ret
      }
    },
    components: {
      MusicList
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .singer-detail
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background

  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>