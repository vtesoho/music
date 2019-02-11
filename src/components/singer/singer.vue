<template>
  <!-- 
  <div @touchmove.prevent="singeratouchMove">

    <div style="width:100px;float:left;" @touchmove.prevent="singerltouchMove">sss</div>
    <div style="width:100px;float:right;" @touchmove.prevent="singerrtouchMove">sss</div> -->
  <div class="singer" ref="singer" @touchmove.prevent="singertouchMove">
    <cube-index-list :data="singerlist" ref="list">
      <cube-index-list-group v-for="(group, index) in singerlist" :key="index" :group="group" class="list-group">
        <cube-index-list-item v-for="(item, index) in group.items" :key="index" :item="item" 
          @select="selectItem" class=" list-group-item">
          <img class="avatar" v-lazy="item.avatar">
          <span class="name">{{item.name}}</span>
        </cube-index-list-item>
      </cube-index-list-group>
    </cube-index-list>
    <router-view></router-view>
  </div>
</template>

<script>
import {getSingerlist} from 'components/api/singer'
import {ERR_OK} from 'components/api/config'
import {mapMutations} from 'vuex'
import {playlistMixin} from 'common/js/mixin'
const hot_text = '热门'
const hot_length = 10
export default {
  mixins: [playlistMixin],
  data () {
    return {
      singerlist: []
    }
  },
  created(){
    this._getSingerlist()
  },
  methods: {
    singerltouchMove(e) {
      console.log("left")
    },
    singerrtouchMove(e) {
      console.log("right")
    },
    singeratouchMove(e) {
      console.log('a')
    },
    handlePlaylist(playlist) {
      // console.log(playlist)
      const bottom = this.playlist.length > 0 ? '60px' : ''
      this.$refs.singer.style.bottom = bottom
      this.$refs.list.refresh()
      // this.$refs.scroll.refresh()
    },
    _getSingerlist() {
      getSingerlist().then((response) => {
        if (response.code === ERR_OK) {
          this.singerlist = this.normalizeSinger(response.data.list)
          // console.log(this.singerlist)
        }
      })
    },
    selectItem(singer) {
      // console.log(singer)
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      this.setSinger(singer)
    },
    normalizeSinger(list) {
      let map = {
        hot: {
          name: hot_text,
          items: []
        }
      }
      for (let i = 0; i < list.length; i++) {
        if (i < hot_length) {
          map.hot.items.push({
            id: list[i].Fsinger_mid,
            name: list[i].Fsinger_name,
            avatar: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${list[i].Fsinger_mid}.jpg?max_age=2592000`
          })
        }
        let key = list[i].Findex
        if (!map[key]) {
          map[key] = {
            name: key,
            items: []
          }
        }
        map[key].items.push({
          id: list[i].Fsinger_mid,
          name: list[i].Fsinger_name,
          avatar: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${list[i].Fsinger_mid}.jpg?max_age=2592000`
        })
      }
      // 为了得到有序列表，我们需要处理 map
      let ret = []
      let hot = []
      for (let key in map) {
        let val = map[key]
        if (val.name.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.name === hot_text) {
          hot.push(val)
        }
      }
      ret.sort((a, b) => {
        return a.name.charCodeAt(0) - b.name.charCodeAt(0)
      })
      return hot.concat(ret)
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  }

}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
    .cube-index-list-anchor
      padding: 8px 0 8px 20px
      background:#333
    .list-group
      padding-bottom: 30px
      background:#222
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        background: $color-background
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
</style>
