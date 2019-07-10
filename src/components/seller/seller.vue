<template>
  <div class="page-seller">
    <cube-scroll ref="scroll" >
      <div class="overview">
        <div class="top">
          <h1 class="title">粥品香坊（大运村）</h1>
          <div class="sell-count">
            <star :size="36" :score="4" />
            <span class="count">(661)</span>
            <span class="count">月售690单</span>
          </div>
        </div>
        <ul class="bottom">
          <li>
            <span class="txt">起送价</span><br/>20<small>元</small>
          </li>
          <li>
            <span class="txt">商家配送</span><br/>
            4<small>元</small>
          </li>
          <li>
            <span class="txt">平均配送时间</span><br/>
            39<small>分钟</small>
          </li>
        </ul>
        <div class="favorite" @click="like()">
          <span class="icon-favorite" :class="{'active': isFavorite === true? true : false}"></span><br/>
          {{isFavoriteTxt}}
        </div>
      </div>
      <div class="separator"></div>
      <div class="bulletin">
        <h1 class="bulletin-title">
          公告活动
        </h1>
        <p class="bulletin-info">
          粥品香坊其烹饪粥料的秘方源于中国千年古法，在融和现代制作工艺，由世界烹饪大师屈浩先生领衔研发。坚守纯天然、0添加的良心品质深得消费者青睐，发展至今成为粥类的引领品牌。是2008年奥运会和2013年园博会指定餐饮服务商。
        </p>
        <div class="bulletin-active">
          <actives :seller="seller"/>
        </div>
      </div>
      <div class="separator"></div>
      <div class="pics">
        <h1 class="pics-title">商家实景</h1>
        <cube-scroll
          ref="scroll"
          direction="horizontal"
          class="pics-list-wrap"
        >
          <div class="pics-list">
            <img class="pic-item" v-for="(item, idx) in seller.pics" :key="idx" :src="item" height="90px" width="120px">
          </div>
        </cube-scroll>
      </div>
      <div class="separator"></div>
      <dl class="infos">
        <dt class="infos-title">商家信息</dt>
        <dd class="infos-item" v-for="(item, idx) in seller.infos" :key="idx">{{item}}</dd>
      </dl>
    </cube-scroll>
  </div>
</template>

<script>
import Star from '../star/star'
import Actives from '../actives/actives'
import { formatURL, setLocal, getLocal } from 'src/common/stor/stor.js'
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      isFavorite: getLocal(this.seller.id)
    }
  },
  computed: {
    isFavoriteTxt () {
      return this.isFavorite === true ? '已收藏' : '收藏'
    }
  },
  components: {
    Star,
    Actives
  },
  methods: {
    like () {
      this.isFavorite = !this.isFavorite
      setLocal(this.seller.id, this.isFavorite)
    }
  }
}
</script>

<style lang="stylus">
  .page-seller
    position absolute
    top 177px
    bottom 0px
    width 100%
    overflow hidden
    .overview
      position relative
      padding 18px
      border-bottom 1px solid rgba(7,17,27,0.1)
      .top
        .title
          font-size     14px
          color         rgb(7,17,27)
          line-height   14px
          margin-bottom 8px
          font-weight bold
        .sell-count
          padding-bottom  18px
          border-bottom   1px solid rgba(7,17,27,0.1)
          .count
            margin      0 8px
            font-size   10px
            color       rgb(77,85,93)
            line-height 18px
      .bottom
        padding-top 18px
        display     flex
        li
          text-align    center
          flex          1
          font-size     24px
          font-weight   200
          color         rgb(7,17,27)
          line-height   24px
          border-right  1px solid rgba(7,17,27,0.1)
          &:last-child
            border-right none
          .txt
            display inline-block
            font-size 10px
            color rgb(147,153,159)
            line-height 10px
            margin-bottom 4px
          small
            font-size 10px
      .favorite
        position absolute;  top 18px;   right 18px
        font-size 10px; color rgb(77,85,93); line-height 10px
        text-align center; width 40px
        .icon-favorite
          font-size 24px;   line-height 24px;  color rgb(147,163,159)
          margin-bottom 4px
          display inline-block
          &.active
            color rgb(240,20,20)
    .separator
      height 16px
      background-color #f3f5f7
    .bulletin
      border-top 1px solid rgba(7,17,27,0.1)
      border-bottom 1px solid rgba(7,17,27,0.1)
      padding 18px
      .bulletin-title
        font-size     14px
        color         rgb(7,17,27)
        line-height   14px
        margin-bottom 8px
        font-weight bold
      .bulletin-info
        padding 0 12px 16px 12px
        font-size 12px
        font-weight 200
        color rgb(240,20,20)
        line-height 24px
        border-bottom 1px solid rgba(7,17,27,0.1)
    .infos
      padding 18px
      .infos-title
        padding-bottom 12px
        font-size 14px
        color rgb(7,17,27)
        line-height 14px
        border-bottom 1px solid rgba(7,17,27,0.1)
        font-weight bold
      .infos-item
        padding 12px 16px
        font-size 12px
        color rgb(7,17,27)
        line-height 16px
        border-bottom 1px solid rgba(7,17,27,0.1)
        &:last-child
          border-bottom none
    .pics
      padding 18px
      display flex
      flex-flow column
      .pics-title
        padding-bottom 12px
        font-size 14px
        color rgb(7,17,27)
        line-height 14px
        font-weight bold
      // .pics-list-wrap
      //   .cube-scroll-content
      //     display inline-block
      //     .pics-list
      //       white-space nowrap
      //       // display flex
      //       .pic-item
      //         margin-right 6px
      //         display inline-block
      //         height 90px
      //         width 120px
      .pics-list-wrap
        display flex
        .cube-scroll-content
          .pics-list
            // white-space nowrap
            display flex
            .pic-item
              // display inline-block
              margin-right 6px
              height 90px
              width 120px
  </style>
