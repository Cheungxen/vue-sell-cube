<template>
  <div v-show="switcher" class="fooddetail">
    <cube-scroll ref="scroll">
      <div class="close" @click="close">
        <span class="icon-arrow_lift"></span>
      </div>
      <div class="foodheader">
        <div class="img-header">
          <img :src="food.image">
        </div>
        <div class="header-msg">
          <h1 class="title">{{food.name}}</h1>
          <p class="sub">
            <span>月售{{food.sellCount}}份</span>
            <span>好评率{{food.rating}}%</span>
          </p>
          <p class="price">
            <span class="pr">￥{{food.price}}</span>
            <del v-if="food.oldPrice" class="old-price">
              ￥{{food.oldPrice}}
            </del>
          </p>
          <div class="button-container">
            <div class="add-shopcart" v-if="!food.count">
              加入购物车
            </div>
            <cartcontrol v-else :food="food"/>
          </div>
        </div>
      </div>
      <div class="fooddesc">
        <h1 class="title">商品介绍</h1>
        <p class="text">{{food.info}}</p>
      </div>
      <div class="foodratings" v-if="food.ratings">
        <h1 class="title">商品评价</h1>
        <ratingselect
          ref="ratingselect"
          :select-type="selectType"
          :selectRatingType="selectRatingType"
          :onlyContent="onlyContent"
          :ratings="food.ratings"
          :positiveRatings="positiveRatings"
          :negativeRatings="negativeRatings"
          @selectRatingType="onselectRatingType"
          @toggleRatingContent="ontoggleRatingContent"/>
        <div class="ratings">
          <ul>
            <li class="rating" v-for="(item, idx) in filteredRatings" :key="idx">
              <div class="msg">
                <span class="time">{{item.rateTime}}</span>
                <span class="username">{{item.username}}</span>
                <img width="12px" height="12px" :src="item.avatar" class="avatar">
              </div>
              <div class="content">
                <span :class="item.rateType===1?'icon-thumb_down':'icon-thumb_up'"></span>
                <span class="txt">{{item.text}}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </cube-scroll>
  </div>
</template>

<script>
import cartcontrol from '../cartcontrol/cartcontrol'
import ratingselect from '../ratingselect/ratingselect'

const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2

export default {
  props: {
    switcher: {
      type: Boolean
    },
    food: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      selectType: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      },
      selectRatingType: ALL,
      onlyContent: false,
      ratings: this.food.ratings
    }
  },
  computed: {
    positiveRatings: function () {
      return this.food.ratings.filter(item => {
        return item.rateType === POSITIVE
      })
    },
    negativeRatings: function () {
      return this.food.ratings.filter(item => {
        return item.rateType === NEGATIVE
      })
    },
    filteredRatings: function () {
      if (!this.onlyContent) {
        if (this.selectRatingType === ALL) {
          return this.food.ratings
        } else if (this.selectRatingType === POSITIVE) {
          return this.positiveRatings
        } else {
          return this.negativeRatings
        }
      } else {
        if (this.selectRatingType === ALL) {
          return this.food.ratings.filter(item => item.text !== '')
        } else if (this.selectRatingType === POSITIVE) {
          return this.positiveRatings.filter(item => item.text !== '')
        } else {
          return this.negativeRatings.filter(item => item.text !== '')
        }
      }
    }
  },
  components: {
    cartcontrol,
    ratingselect
  },
  methods: {
    close () {
      this.$emit('close')
    },
    onselectRatingType (val) {
      this.selectRatingType = val
    },
    ontoggleRatingContent () {
      this.onlyContent = !this.onlyContent
    }
  }
}
</script>

<style lang="stylus">
  @import "~assets/stylus/mixin.styl"
  .fooddetail
    position fixed
    top 0
    left 0
    bottom 48px
    width 100%
    background-color #f3f5f7
    z-index 50
    overflow hidden
    .close
      position absolute
      top 18px
      left 18px
      width 16px
      height 16px
      font-size 16px
      z-index 100
      color #ccc
    .foodheader
      // border-bottom 1px solid rgba(7,17,27,0.1)
      border-bottom-1px(rgba(7,17,27,0.1))
      background-color #fff
      margin-bottom 16px
      .img-header
        position relative
        width 100%
        height 0
        padding-top 100%
        img
          position absolute
          left 0
          top 0
          width 100%
          height 100%
      .header-msg
        padding 18px
        position relative
        .title
          font-size 14px
          font-weight 700
          color rgb(7,17,27)
          line-height 14px
          margin-bottom 8px
        .sub
          font-size 10px
          color rgb(147,153,159)
          line-height 10px
          margin-bottom 18px
          span
            margin-right 12px
        .button-container
          position absolute
          right 18px
          bottom 18px
          text-align center
          .add-shopcart
            width 74px
            height 24px
            font-size 10px
            color rgb(255,255,255)
            line-height 24px
            background-color rgb(0,160,220)
            border-radius: 12px
    .fooddesc
      background-color #fff
      border-top-1px(rgba(7,17,27,0.1))
      border-bottom-1px(rgba(7,17,27,0.1))
      padding 18px
      margin-bottom 16px
      .title
        font-size 14px
        font-weight 700
        color rgb(7,17,27)
        line-height 14px
        margin-bottom 6px
      .text
        font-size 12px
        font-weight 200
        color rgb(77,85,93)
        line-height 24px
    .foodratings
      border-top-1px(rgba(7,17,27,0.1))
      // border-bottom-1px(rgba(7,17,27,0.1))
      // FIXME:删除此处bottom
      margin-bottom 16px
      background-color #fff
      .title
        display inline-block
        font-size 14px
        font-weight 700
        color rgb(7,17,27)
        line-height 14px
        margin-bottom 6px
        margin-top 18px
        padding-left 18px
      .ratings
        .rating
          padding 16px 0
          margin 0 18px
          .msg
            display flex
            font-size 10px
            color rgb(147,153,159)
            line-height 12px
            margin-bottom 6px
            .time
              flex 1
            .username
              margin-right 6px
            .avatar
              display inline-block
              border-radius 6px
          .content
            font-size 12px
            .icon-thumb_down
              line-height 24px
              color rgb(147,153,159)
              vertical-align middle
              margin-right 4px
            .icon-thumb_up
              line-height 24px
              color rgb(147,153,159)
              vertical-align middle
              margin-right 4px
            .txt
              line-height 16px
              color(7,17,27)

</style>
