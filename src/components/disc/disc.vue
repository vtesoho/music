<template>
    <transition name="slide">
      <music-list :title="title" :bgImage="bgImage" :songs="songs"></music-list>
    </transition>
</template>
<script type="text/javascript">
  import MusicList from 'components/music-list/music-list'
  import {mapGetters} from 'vuex'
  import {getSongList} from 'api/recommend'
  import {ERR_OK} from 'api/config'
  import {creatSong,processSongsUrl} from 'common/js/song'
  export default {
    data() {
      return {
        songs: []
      }
    },
    computed: {
      title() {
        return this.disc.dissname
      },
      bgImage() {
        return this.disc.imgurl
      },
      ...mapGetters([
        'disc'
      ])
    },
    created() {
      this._getSongList()
    },
    methods: {
      _getSongList() {
        if (!this.disc.dissid) {
          this.$router.push('/recommend')
          return
        }
        getSongList(this.disc.dissid).then((res) => {
          if (res.code === ERR_OK) {
            // this.songs = this._normalizeSongs(res.cdlist[0].songlist)
            processSongsUrl(this._normalizeSongs(res.cdlist[0].songlist)).then((songs) => {
              this.songs = songs
              // console.log(this.songs)
            })
          }
        })
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((musicData) => {
          if (musicData.songid && musicData.albumid) {
            ret.push(creatSong(musicData))
          }
        })
        // console.log(ret)
        return ret
      }
    },
    components: {
      MusicList
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
