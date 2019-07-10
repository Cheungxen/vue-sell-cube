<template>
  <div class="rating-select" v-if="ratings.length">
    <div class="selector">
      <div class="select-type">
        <span class="txt" :class="{active:selectRatingType===2?true:false}" @click="onSelectType(2)">
          {{selectType.all}}
          <span class="count">{{ratings.length}}</span>
        </span>
        <span class="txt" :class="{active:selectRatingType===0?true:false}" @click="onSelectType(0)">
          {{selectType.positive}}
          <span class="count">{{positiveRatings.length}}</span>
        </span>
        <span class="txt" :class="{active:selectRatingType===1?true:false}" @click="onSelectType(1)">
          {{selectType.negative}}
          <span class="count">{{negativeRatings.length}}</span>
        </span>
      </div>
      <div class="select-content" @click="onToggleContent">
        <span class="icon-check_circle" :class="{active:onlyContent}"></span>
        <span class="txt">只看有内容的评价</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectType: {
      type: Object,
      default () {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    },
    ratings: {
      type: Array
    },
    positiveRatings: {
      type: Array
    },
    negativeRatings: {
      type: Array
    },
    selectRatingType: {
      type: Number
    },
    onlyContent: {
      type: Boolean
    }
  },
  methods: {
    onSelectType (rateType) {
      this.$emit('selectRatingType', rateType)
      console.log('aaa');
    },
    onToggleContent () {
      this.$emit('toggleRatingContent')
    }
  }
}
</script>

<style lang="stylus">
  @import "~assets/stylus/mixin.styl"
  .rating-select
    .selector
      padding 12px 18px
      border-bottom-1px(rgba(7,17,27,0.1))
      .select-type
        padding-bottom 18px
        border-bottom-1px(rgba(7,17,27,0.1))
        .txt
          display inline-block
          padding 8px 12px
          background-color rgba(77,85,93,0.2)
          margin-right 8px
          font-size 12px
          color rgb(77,85,93)
          line-height 16px
          border-radius 1px
          &.active
            background-color rgb(0,160,220)
            color rgb(255,255,255)
          .count
            font-size 8px
            margin-left 2px
      .select-content
        margin-top 12px
        color rgb(147,153,159)
        .icon-check_circle
          font-size 24px
          vertical-align middle
          margin-right 4px
          &.active
            color #00b13a
        .txt
          font-size 12px
          vertical-align middle
</style>
