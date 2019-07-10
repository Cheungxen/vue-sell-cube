<template>
  <div id="app">
    <v-header :seller="seller"/>
    <v-tab/>
    <keep-alive>
      <router-view :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" :seller="seller"/>
    </keep-alive>
  </div>
</template>

<script>
import VHeader from './components/v-header/v-header'
import VTab from './components/v-tab/v-tab'
import axios from 'axios'
import { formatURL } from 'src/common/stor/stor.js'
import { format } from 'path';
export default {
  components: {
    VHeader,
    VTab
  },
  data () {
    return {
      seller: {
        id: formatURL().id
      }
    }
  },
  created () {
    axios.get('/api/seller', {
      params: {
        id: this.seller.id
      }
    }).then((res) => {
      const { status, data: { errno, data } } = res
      if (status === 200 && errno === 0) {
        this.seller = Object.assign({}, this.seller, data)
      }
    })
  }
}
</script>

<style lang="stylus">
</style>
