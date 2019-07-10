<template>
  <div class="cartlist-wrapper">
    <div class="wrapper">
      <div class="cartlist-header">
        <span class="text">购物车</span>
        <span class="clear">清空</span>
      </div>
      <cube-scroll class="cartlist" :data="selected">
        <dl>
          <dd v-for="(item, idx) in selected" :key="idx" class="cartlist-item">
            <span class="goodname">{{item.foodname}}</span>
            <span class="price">
              <span class="price-pre">￥</span>
              {{item.price}}
            </span>
            <div class="cartcontrol-wrapper">
              <cartcontrol :food="item.food" />
            </div>
          </dd>
        </dl>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
import cartcontrol from '../cartcontrol/cartcontrol'

export default {
  props: {
    selected: {
      type: Array,
      default(){
        return []
      }
    }
  },
  components: {
    cartcontrol
  }
}
</script>

<style lang="stylus" scoped>
  @import "~assets/stylus/mixin.styl"
  .cartlist-wrapper
    background-color rgba(7,17,27,0.8)
    position fixed
    width 100%
    // height 100%
    top 0
    left 0
    z-index -100
    .wrapper
      position fixed
      bottom 48px
      left 0
      width 100%
      background-color #ffffff
      overflow hidden
      .cartlist-header
        display flex
        justify-content space-between
        background-color #f3f5f7
        border-bottom 1px solid rgba(7,17,27,0.1)
        padding 0 18px
        .text
          font-size 14px
          font-weight 200
          color rgb(7,17,27)
          line-height 40px
        .clear
          font-size 12px
          color rgb(0,160,220)
          line-height 40px
      .cartlist
        max-height 217px
        .cartlist-item
          display flex
          margin 0 18px
          padding 12px 0
          font-size 14px
          line-height 24px
          border-bottom-1px(rgba(7,17,27,0.1))
          .goodname
            flex 1
            margin-right 18px
          .price
            font-weight 700
            color rgb(240,20,20)
            margin-right 12px
            .price-pre
              font-weight normal
              color rgb(240,20,20)
              font-size 10px
</style>
