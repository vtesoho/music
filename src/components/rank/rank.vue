<template>
  <div class="rank" ref="rank">
    <cube-scroll ref="toplist" :data="topList" class="toplist" >
      <ul>
        <li class="item" v-for="item in topList" @click="selectItem(item)">
          <div class="icon">
            <img width="100" height="100" v-lazy="item.picUrl" />
          </div>
          <ul class="songlist">
            <li class="song" v-for="(song, index) in item.songList">
              <span>{{index + 1}}</span>
              <span>{{song.songname}} - {{song.singername}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="loading-container" v-show="!topList.length">
        <loading></loading>
      </div>
    </cube-scroll>
    <router-view></router-view>
  </div>
</template>

<script>
  import {getTopList,getTopList_test} from 'api/rank'
  import {ERR_OK} from 'api/config'
  import {playlistMixin} from 'common/js/mixin'
  import Loading from 'components/loading/loading'
  import {mapMutations} from 'vuex'
  export default {
    mixins: [playlistMixin],
    created(){
      this._getTopList()
    },
    data() {
      return {
        topList: []
      }
    },
    methods:{
      selectItem(item) {
        this.$router.push({
          path: `/rank/${item.id}`
        })
        this.setTopList(item)
      },
      handlePlaylist(playlist) {
        // console.log(playlist)
        if (playlist.length > 0) {
          this.$refs.rank.style.bottom = '60px'
          // console.log(111)
          this.$refs.toplist.refresh()
        }
        // this.$refs.scroll.refresh()
      },
      _getTopList() {
        getTopList().then((res) => {
          if (res.code === ERR_OK) {
            // console.log(res)
            this.topList = res.data.topList

          }
          // this.$refs.rank.style.bottom = '60px'
          // // console.log(111)
          // this.$refs.scroll_rank.refresh()
        })
      },
      ...mapMutations({
        setTopList: 'SET_TOP_LIST'
      })
      
    },
    computed: {
      //计算属性
    },
    components: {
      Loading
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .rank
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .toplist
      height: 100%
      overflow: hidden
      .item
        display: flex
        margin: 0 20px
        padding-top: 20px
        height: 100px
        &:last-child
          padding-bottom: 20px
        .icon
          flex: 0 0 100px
          width: 100px
          height: 100px
        .songlist
          flex: 1
          display: flex
          flex-direction: column
          justify-content: center
          padding: 0 20px
          height: 100px
          overflow: hidden
          background: $color-highlight-background
          color: $color-text-d
          font-size: $font-size-small
          .song
            no-wrap()
            line-height: 26px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
