<template>
  <div id="app">
    <v-header :seller="seller"/>
    <v-tab/>
    <router-view/>
  </div>
</template>

<script>
import VHeader from './components/v-header/v-header'
import VTab from './components/v-tab/v-tab'
import axios from 'axios'
export default {
  components: {
    VHeader,
    VTab
  },
  data () {
    return {
      seller: { type: Object, default () { return {} } }
    }
  },
  created () {
    axios.get('/api/seller').then((res) => {
      const { status, data: { errno, data } } = res
      if (status === 200 && errno === 0) {
        this.seller = data
      }
    })
  }
}
</script>

<style lang="stylus">
</style>
