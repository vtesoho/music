<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input class="box" ref="query" :placeholder="placeholder" v-model="query" />
    <i v-show="query" @click="clear" class="icon-dismiss"></i>
  </div>
</template>
<script type="text/javascript">
  import {debounce} from 'common/js/util'
  export default {
    props: {
      placeholder: {
        type: String,
        default: '搜索歌曲、歌手'
      }
    },
    data () {
      return {
        query: ''
      }
      //数据
    },
    created(){
      this.$watch('query', debounce((newQuery) => {
        this.$emit('query', newQuery)
      }, 200))
      //创建完毕生命周期
    },
    methods:{
      setQuery(query) {
        this.query = query
      },
      clear() {
        this.query = ''
      },
      blur() {
        this.$refs.query.blur()
      }
      //方法
    },
    computed: {
      //计算属性
    },
    components: {
      //加载模块
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .search-box
    display: flex
    align-items: center
    box-sizing: border-box
    width: 100%
    padding: 0 6px
    height: 40px
    background: $color-highlight-background
    border-radius: 6px
    .icon-search
      font-size: 24px
      color: $color-background
    .box
      flex: 1
      margin: 0 5px
      line-height: 18px
      background: $color-highlight-background
      color: $color-text
      font-size: $font-size-medium
      outline: 0
      &::placeholder
        color: $color-text-d
    .icon-dismiss
      font-size: 16px
      color: $color-background
</style>