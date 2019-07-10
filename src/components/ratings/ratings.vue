<template>
  <div class="page-ratings">
    <cube-scroll
      ref="scroll"
    >
      <div class="overview">
        <div class="score-wrapper">
          <span class="score">3.9</span>
          <span class="title">综合评价</span>
          <span class="describe">高于周边商家69.2%</span>
        </div>
        <ul class="star-wrapper">
          <li class="rate-item">
            <span class="txt">服务态度</span>
            <star :size="36" :score="3.2"/>
            <span class="score">3.2</span>
          </li>
          <li class="rate-item">
            <span class="txt">服务态度</span>
            <star :size="36" :score="4.5"/>
            <span class="score">4.5</span>
          </li>
          <li class="rate-item">
            <span class="txt">送达时间</span>
            <span class="time">44分钟</span>
          </li>
        </ul>
      </div>
      <div class="separator"></div>
      <div class="seller-ratings" v-if="ratings.length">
        <rating-select
          ref="ratingselect"
          :selectRatingType="selectRatingType"
          :onlyContent="onlyContent"
          :ratings="ratings"
          :positiveRatings="positiveRatings"
          :negativeRatings="negativeRatings"
          @selectRatingType="onselectRatingType"
          @toggleRatingContent="ontoggleRatingContent"
        />
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
import Star from '../star/star'
import axios from 'axios'
import ratingSelect from '../ratingselect/ratingselect'
import ratingMixin from 'src/common/mixins/ratings.js'
export default {
  mixins: [ratingMixin],
  data () {
    return {
      ratings: {
        type: Array,
        default () {
          return []
        }
      }
    }
  },
  components: {
    Star,
    ratingSelect
  },
  created () {
    axios.get('/api/ratings').then((result) => {
      const { status, data: { errno, data } } = result
      if (status === 200 && errno === 0) {
        this.ratings = data
      }
    })
  }
}
</script>

<style lang="stylus">
@import "~assets/stylus/mixin.styl"
  .page-ratings
    position absolute
    overflow hidden
    top 174px
    bottom 0
    width 100%
    .overview
      padding 18px 0
      display flex
      border-bottom-1px(rgba(7,17,27,0.1))
      .score-wrapper
        display flex
        flex-flow column
        align-items center
        border-right 1px solid rgba(7,17,27,0.1)
        // TODO:此处如何兼容自动缩放
        width 138px
        .score
          display inline-block
          font-size 24px
          color rgb(255,153,0)
          line-height 28px
          margin-bottom 6px
        .title
          font-size 12px
          color rgb(7,17,27)
          line-height 12px
          margin-bottom 8px
        .describe
          font-size 10px
          color rgb(147,153,159)
          line-height 10px
          margin-bottom 6px
      .star-wrapper
        padding 0 24px
        font-size 12px
        color rgb(7,17,27)
        line-height 18px
        .rate-item
          margin-bottom 8px
          &:last-child
            margin-bottom 0
          .time
            color rgb(147,153,159)
          .txt
            margin-right 12px
          .score
            font-size 12px
            color rgb(255, 153, 0)
            line-height 18px
            margin-left 12px
            vertical-align middle
    .separator
      height 16px
      background-color #f3f5f7
      // border-bottom-1px(rgba(7,17,27,0.1))
    .seller-ratings
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
