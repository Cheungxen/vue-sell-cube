<template>
  <div class="shop-cart-wrapper">
    <div class="content-left">
      <div class="shop-cart-icon-wrapper">
        <div class="shop-cart-icon" :class="{active: totalCount>0}">
          <span v-if="totalCount>0" :class="{'selected-count':totalCount>0}">{{totalCount}}</span>
          <i class="icon-shopping_cart"></i>
        </div>
      </div>
      <div class="price" :class="{active: totalPrice>0}">￥{{totalPrice}}</div>
      <div class="delivery-price">另需配送费￥{{deliveryPrice}}元</div>
    </div>
    <div class="content-right">
      <div class="check" :class="{active: totalPrice >= minPrice}">
        {{payDesc}}
      </div>
    </div>
    <div class="balls-wapper">
      <div v-for="(item, idx) in balls" :key="idx">
        <transition
          @before-enter="beforeEnter"
          @enter="enter"
          @after-enter="afterEnter"
        >
          <div class="ball" v-if="item.show">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
    </div>
    <!-- <cartlist :selected="selected" /> -->
  </div>
</template>

<script>
const BALLS_LENGTH = 10
function createBalls () {
  let arr = []
  for (let i = 0; i < BALLS_LENGTH; i++) {
    arr.push ({ show: false })
  }
  return arr
}

import cartlist from '../cartlist/cartlist'

export default {
  components: {
    cartlist
  },
  data () {
    return {
      balls: createBalls(),
      dropBalls: []
    }
  },
  props: {
    selected: {
      type: Array,
      default () {
        return []
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  computed: {
    totalCount: function () {
      let count = 0
      this.selected.forEach (item => {
        count += item.count
      })
      return count
    },
    totalPrice: function () {
      let total = 0
      this.selected.forEach (item => {
        total += item.price * item.count
      } )
      return total
    },
    payDesc: function () {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`
      } else if (this.totalPrice < this.minPrice) {
        return `还差￥${this.minPrice - this.totalPrice}元起送`
      } else {
        return '去结算'
      }
    }
  },
  methods: {
    ballsBound (el) {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.el = el
          this.dropBalls.push(ball)
          return
        }
      }
    },
    beforeEnter (el) {
      const ball = this.dropBalls[this.dropBalls.length - 1]
      const rect = ball.el.getBoundingClientRect()
      const x = rect.left - 32
      const y = -(window.innerHeight - rect.top - 22)
      el.style.display = ''
      el.style.transform = el.style.webkitTransform = `translate3d(0, ${y}px, 0)`
      const inner = el.getElementsByClassName('inner-hook')[0]
      inner.style.transform = inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`
    },
    enter (el, done) {
      // TODO: 这里为什么需要重绘使得动画生效
      this._reflow = document.body.offsetHeight
      el.style.transform = el.style.webkitTransform = `translate3d(0, 0, 0)`
      const inner = el.getElementsByClassName('inner-hook')[0]
      inner.style.transform = inner.style.webkitTransform = `translate3d(0, 0, 0)`
      el.addEventListener('transitionend', done)
    },
    afterEnter (el) {
      let ball = this.dropBalls.shift()
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
    }
  }
}
</script>

<style lang="stylus">
 .shop-cart-wrapper
    position fixed
    z-index 100
    bottom 0
    left 0
    width 100%
    display flex
    background-color #141d27
    height 48px
    .content-left
      flex 1
      display flex
      .shop-cart-icon-wrapper
        margin 0 12px
        position relative
        top -10px
        width 56px
        height 56px
        border-radius 50%
        background-color #141d27
        box-sizing border-box
        padding 6px
      .shop-cart-icon
        background-color #2b343c
        border-radius 50%
        width 44px
        height 44px
        color rgba(255,255,255,0.4)
        text-align center
        &.active
          background-color #00a0dc
          color #fff
        .selected-count
          position absolute
          top 0
          right 0
          width 24px
          height 16px
          font-size 9px
          font-weight 700
          line-height 16px
          color #ffffff
          background-color red
          border-radius 16px
        .icon-shopping_cart
          font-size 24px
          line-height 44px
      .price
        align-self center
        font-size 16px
        color rgba(255,255,255,0.4)
        line-height 24px
        font-weight 700
        padding-right 12px
        border-right 1px solid rgba(255,255,255,0.1)
        &.active
          color #fff
      .delivery-price
        font-size 12px
        color rgba(255,255,255,0.4)
        line-height 24px
        align-self center
        padding 0 12px
    .content-right
      flex 0 0 105px
      .check
        background-color #2b333b
        line-height 48px
        font-size 12px
        height 48px
        font-weight 700
        text-align center
        align-self center
        color rgba(255,255,255,0.4)
        &.active
          background-color #00b43c
          color #fff
    .balls-wapper
      .ball
        position fixed
        left 32px
        bottom 22px
        z-index 200
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
        .inner
          width 16px
          height 16px
          border-radius 50%
          background-color #00a0dc
          transition: all 0.4s linear
</style>
