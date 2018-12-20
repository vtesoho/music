<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import MHeader from 'components/m-header/m-header'
import Player from 'components/player/player'
import Tab from 'components/tab/tab'

export default {
  name: 'app',
  components: {
    MHeader,
    Tab,
    Player
  }
}
</script>

<style></style>
