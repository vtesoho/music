<template>
  <div class="suggest">
    <cube-scroll ref="suggest" 
      :data="result" 
      :options="scrollOptions"
      @pulling-up="onPullingUp"
      :scroll-events="['before-scroll-start']"
      @before-scroll-start="scrollStartTest"
      
    >
      <ul class="suggest-list">
        <li class="suggest-item" @click="selectItem(item)" v-for="item in result">
          <div class="icon">
            <i :class="getIconCls(item)"></i>
          </div>
          <div class="name">
            <span class="down" @click.stop="downItem(item)">下载</span>
            <p class="text" v-html="getDisplayName(item)">
              
            </p>

          </div>
        </li>
      </ul>

    </cube-scroll>
    <div v-show="!hasMore" class="no-result-wrapper">
      <!-- 抱歉，暂无搜索结果 -->
      <no-result title="抱歉，暂无搜索结果"></no-result>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {search} from 'api/search'
  import {ERR_OK} from 'api/config'
  import {creatSong,processSongsUrl} from 'common/js/song'
  import Singer from 'common/js/singer'
  import {mapMutations,mapActions} from 'vuex'
  import NoResult from 'components/no-result/no-result'
  const perpage = 20
  const TYPE_SINGER = 'singer'
  export default {
    props: {
      query: {
        type: String,
        default: ''
      },
      showSinger: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        page: 1,
        result: [],
        hasMore: true,
        scrollOptions: {
          pullUpLoad: {
            threshold: 0,
            txt: ''
          }
        }
      }
    },
    methods: {
      downItem(item) {
        console.log(item)
        const link = document.createElement('a');
        link.href = item.url;
        link.download = item.name;
        link.click();
      },
      scrollStartTest() {
        
      },
      onPullingUp() {
        if (!this.hasMore) {
          this.$refs.suggest.forceUpdate()
          return
        }
        this.page++
        search(this.query, this.page, this.showSinger, perpage).then((res) => {
          if (res.code === ERR_OK) {
            // console.log(res)
            this._genResult(res.data, true)
            // this._checkMore(res.data)
          }else{
            this.$refs.suggest.forceUpdate()
          }
        }).catch(() => {
          this.$refs.suggest.forceUpdate()
        })
        
      },
      search() {
        this.page = 1
        this.hasMore = true
        this.$refs.suggest.scrollTo(0, 0)
        search(this.query, this.page, this.showSinger, perpage).then((res) => {
          if (res.code === ERR_OK) {
            this._genResult(res.data)
          }
        })
      },
      getIconCls(item) {
        if (item.type === TYPE_SINGER) {
          return 'icon-mine'
        }else{
          return 'icon-music'
        }
      },
      getDisplayName(item) {
        // console.log(item)
        if (item.type === TYPE_SINGER) {
          return item.singername
        }else {
          return `${item.name}-${item.singer}`
        }
      },
      selectItem(item) {
        if (item.type === TYPE_SINGER) {
          const singer = new Singer({
            id: item.singermid,
            name: item.singername
          })
          this.$router.push({
            path: `/search/${singer.id}`
          })
          this.setSinger(singer)
        }else{
          this.insertSong(item)
        }
        this.$emit('select')
      },
      refresh() {
        this.$refs.suggest.refresh()
      },
      _normalizeSongs(list) {
        // console.log(singer)
        let ret = []
        list.forEach((musicData) => {
          if (musicData.songid && musicData.albumid) {
            ret.push(creatSong(musicData))  
          }
        })
        // console.log(ret)
        return ret
      },
      _genResult(data, more = false) {
        let ret = []
        if (data.zhida && data.zhida.singerid) {
          ret.push({...data.zhida, ...{type: TYPE_SINGER}})
        }
        // console.log(data)
        if (data.song.totalnum != 0) {
          processSongsUrl(this._normalizeSongs(data.song.list)).then((res) => {
            // console.log(res)
            // console.log(this.result)
            if (more === true) {
              this.result = this.result.concat(res)
            }else{
              ret = ret.concat(res)
              this.result = ret
            }
            
          })
        }else{
          this.hasMore = false
        }

        // return this.result
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      }),
      ...mapActions([
        'insertSong'
      ])
    },
    components: {
      NoResult
    },
    watch: {
      query() {
        this.search()
        
      }
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    position: relative
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
        .down
          float:right
    .no-result-wrapper
      position: absolute
      top: 50%
      z-index: 10
      width: 100%
      transform: translateY(-50%)
</style>
