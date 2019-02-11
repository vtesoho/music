## vue 练手项目

项目体验地址

[https://www.lanrenkeji.win/music](https://www.lanrenkeji.win/music)

技术栈
```
mvvm框架：      Vue.js （版本2.x）
状态管理：       Vuex
前端路由：       Vue Router
UI框架 ：       cube-ui
样式预处理：     stylus
服务端通讯：     axios
移动端滚动库：   better-scroll
构建工具：       webpack 2.0
源码：          es6
环境配置:       node 8+ npm 5+
```


API接口全部是QQ音乐抓取真实地址，跨域问题采用nginx服务器转发方式解决。

生产环境必须运行prod.server.js文件

```
node prod.server.js
```

