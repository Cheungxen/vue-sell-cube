<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" alt="">
      </div>
      <div class="content">
        <div class="title">
          <i class="brand"></i>
          <span class="name">粥品香坊（大运村）</span>
        </div>
        <div class="description">
          蜂鸟专送/38分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <i :class="supporticon"></i>
          <span class="support-detail">
            在线支付满28减5，满50减10
          </span>
        </div>
      </div>
      <div class="support-count" @click="showDetail">
        <span class="count">5个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-icon"></span>
      <span class="bulletin-text">
        粥品香坊其烹饪粥料的秘方源于中国千年古法，再融和现代制作工艺制作而成
      </span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="">
    </div>
    <div class="detail" v-if="isShowDetail">
      <div class="main">
        <div class="title">
          <h1 class="name">{{seller.name}}</h1>
        </div>
        <!-- TODO: 评分组件 -->
      </div>
      <div class="close" @click="hideDetail">
        <i class="icon-close"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    seller: { type: Object, default () { return {} } }
  },
  data () {
    return {
      isShowDetail: false
    }
  },
  computed: {
    supporticon: function () {
      const classMap = ['decrease', 'discount', 'guaranee', 'invoice', 'special']
      return `support-icon-${classMap[this.seller.supports[0].type]}`
    }
  },
  methods: {
    showDetail: function () {
      this.isShowDetail = true
    },
    hideDetail: function () {
      this.isShowDetail = false
    }
  }
}
</script>

<style lang="stylus">
  @import "~assets/stylus/mixin"

  .header
    position relative
    color #ffffff
    overflow hidden
    .content-wrapper
      padding: 24px 12px 18px 24px
      display: flex
      position relative
      .avatar
        img
          width: 64px
          height: 64px
          margin-right 18px
          border-radius 2px
      .content
        .title
          display flex
          vertical-align top
          margin-bottom 8px
          .brand
            width 30px
            height 18px
            // background-color #ccc
            // display inline-block
            bg-image('./img/brand')
            // background-image url('./img/brand@2x.png')
            background-size 30px 18px
            background-repeat no-repeat
            margin-right 6px
            border-radius 2px
          .name
            font-size 16px
            font-weight bold
            line-height 16px
        .description
          font-size 14px
          font-weight 200
          line-height 12px
          margin-bottom 10px
        .support
          display flex
          vertical-align top
          .support-icon-decrease
            display inline-block
            width 12px
            height 12px
            // background-color #ccc
            margin-right 4px
            bg-image('./img/decrease_1')
            background-size 12px 12px
            background-repeat no-repeat
          .support-icon-discount
            display inline-block
            width 12px
            height 12px
            // background-color #ccc
            margin-right 4px
            bg-image('./img/discount_1')
            background-size 12px 12px
            background-repeat no-repeat
            background-size 12px 12px
          .support-detail
            font-size 12px
            font-weight 200
            line-height 12px
      .support-count
        display flex
        align-items center
        position absolute
        right 12px
        bottom 14px
        height 24px
        padding 0px 8px
        border-radius 14px
        font-size 10px
        font-weight 200
        line-height 12px
        background-color rgba(0, 0, 0, 0.2)
        .icon-keyboard_arrow_right
          margin-left 2px
    .bulletin-wrapper
      // position relative
      display flex
      align-items center
      padding 0 12px
      height 28px
      background-color rgba(7, 17, 27, 0.2)
      .bulletin-icon
        width 22px
        height 12px
        flex: 0 0 22px
        border-redius 2px
        // background-color #cccccc
        bg-image('./img/bulletin')
        // background-image url('./img/bulletin@2x.png')
        background-size 22px 12px
        background-repeat: no-repeat
        margin-right 4px
      .bulletin-text
        flex: 1 1 auto
        overflow hidden
        text-overflow ellipsis
        white-space:nowrap
        font-size 10px
        color #ffffff
        font-weight 200
        line-height 28px
      .icon-keyboard_arrow_right
        flex 0 0 10px
        // position absolute
        // right 12px
    .background
      img
        position absolute
        width 100%
        height 100%
        top 0
        left 0
        z-index -1
        filter blur(10px)
    .detail
      position fixed
      top 0
      left 0
      z-index 100
      height 100%
      width 100%
      background-color rgba(7, 17, 27, 0.8)
      display flex
      flex-flow column
      .main
        flex 1
        overflow scroll
      .close
        font-size 32px
        color rgba(255, 255, 255, 0.5)
        margin 0 auto 32px auto
        // text-align center
        // padding-bottom 32px
</style>
