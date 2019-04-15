<template>
  <div class="goods">
    <ul class="menu-wrapper">
      <li v-for="(item, idx) in goods" :key="idx" class="menu-item">
        <span class="text">
          <i v-if="item.type >= 0" :class="'support-icon-'+classMap[item.type]"></i>
          {{item.name}}
        </span>
      </li>
    </ul>
    <div class="goods-wrapper">
      <dl v-for="(item, idx) in goods" :key="idx">
        <dt class="title">{{item.name}}</dt>
        <dd v-for="(item, idx) in item.foods" :key="idx" class="food-item">
          <img width="57" height="57" :src="item.icon" alt="">
          <div class="goods-content">
            <h1 class="name">{{item.name}}</h1>
            <p class="desc">{{item.description}}</p>
            <p class="detail">
              <span class="sell-count">月售{{item.sellCount}}份</span>
              <span class="rate-count">好评率{{item.rating}}%</span>
            </p>
            <p class="goods-price">
              <span class="price">
                <span class="price-pre">￥</span>
                {{item.price}}
              </span>
              <span class="oldPrice" v-if="item.oldprice">
                <span class="price-pre">￥</span>
                {{item.oldPrice}}
              </span>
            </p>
            <!-- <i></i> -->
          </div>
        </dd>
      </dl>
    </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      goods: { type: Object, default () { return {} } },
      classMap: ['decrease', 'discount', 'guarantee', 'invoice', 'special']
    }
  },
  created () {
    axios.get('/api/goods').then((res) => {
      const { status, data: { errno, data } } = res
      if (status === 200 && errno === 0) {
        this.goods = data
      }
    })
  }
}
</script>

<style lang="stylus">
  @import "~assets/stylus/mixin.styl"
  .goods
    position absolute
    width 100%
    top 176px
    bottom 58px
    display flex
    .menu-wrapper
      width 80px
      overflow scroll
      background-color #f3f5f7
      .menu-item
        display flex
        flex-flow column
        justify-content space-around
        line-height 14px
        text-align center
        height 62px
        width 56px
        font-size 12px
        color rgb(77, 85, 93)
        margin 0 auto
        border-bottom-1px(rgba(7, 17, 27, 0.1))
        .support-icon-decrease
          display inline-block
          width 12px
          height 12px
          // background-color #ccc
          // margin-right 4px
          bg-image('./img/decrease_3')
          background-size 12px 12px
          background-repeat no-repeat
        .support-icon-discount
          display inline-block
          width 12px
          height 12px
          // background-color #ccc
          // margin-right 4px
          bg-image('./img/discount_3')
          background-size 12px 12px
          background-repeat no-repeat
        .support-icon-guarantee
          display inline-block
          width 12px
          height 12px
          // background-color #ccc
          // margin-right 4px
          bg-image('./img/guarantee_3')
          background-size 12px 12px
          background-repeat no-repeat
        .support-icon-invoice
          display inline-block
          width 12px
          height 12px
          // background-color #ccc
          // margin-right 4px
          bg-image('./img/invoice_3')
          background-size 12px 12px
          background-repeat no-repeat
        .support-icon-special
          display inline-block
          width 12px
          height 12px
          // background-color #ccc
          // margin-right 4px
          bg-image('./img/special_3')
          background-size 12px 12px
          background-repeat no-repeat
    .goods-wrapper
      flex 1
      overflow scroll
      .title
        font-size 12px
        color rgb(147, 153, 159)
        height 26px
        line-height 26px
        background-color #f3f5f7
        border-left 2px solid #d9dde1
        padding-left 18px
      .food-item
        padding 18px 0
        margin 0 18px
        display flex
        &:last-child
          border-bottom-1px-none()
        border-bottom-1px(rgba(7,17,27,0.1))
        img
          margin-right 10px
        .goods-content
          .name
            font-size 14px
            font-weight bold
            color rgb(7,17,27)
            line-height 14px
            margin-top 2px
          .desc, .detail
            font-size 10px
            color rgb(147,153,159)
            line-height 10px
            margin-top 8px
          .detail
            .sell-count
              margin-right 12px
          .goods-price
            .price
              font-size 14px
              color rgb(240, 20,20)
              line-height 24px
              font-weight bold
              .price-pre
                font-size 10px
                font-weight normal
</style>
