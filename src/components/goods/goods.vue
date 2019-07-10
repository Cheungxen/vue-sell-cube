<template>
  <!-- FIXME: 在不同分辨率下显示有问题 -->
  <div class="goods">
    <div class="goods-wrapper">
      <cube-scroll-nav
      :side="true"
      :data="goods"
      v-if="goods.length"
      >
        <cube-scroll-nav-panel
          v-for="item in goods"
          :key="item.name"
          :label="item.name"
          :title="item.name"
        >
          <dl>
            <dd v-for="(item, idx) in item.foods" :key="idx" class="food-item" @click="selectedFood(item)">
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
                <cartcontrol @drop="ondrop" :food="item"/>
              </div>
            </dd>
          </dl>
        </cube-scroll-nav-panel>
      </cube-scroll-nav>
    </div>
    <shopcart ref="shopcart" :deliveryPrice="deliveryPrice" :minPrice="minPrice" :selected="selected"/>
    <fooddetail ref="fooddetail" :food="selectedFoodItem" :switcher="foodDetailSwitcher" @close="onClose"/>
  </div>
</template>

<script>
import axios from 'axios'
import shopcart from '../shopcart/shopcart'
import cartcontrol from '../cartcontrol/cartcontrol'
import fooddetail from '../fooddetail/fooddetail'

export default {
  components: {
    shopcart,
    cartcontrol,
    fooddetail
  },
  props: {
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
    selected () {
      let selected = []
      this.goods.forEach(good => {
        good.foods.forEach(food => {
          if (food.count) {
            selected.push({
              food: food,
              foodname: food.name,
              count: food.count,
              price: food.price
            })
          }
        })
      })
      return selected
    }
  },
  methods: {
    ondrop (event) {
      this.$refs.shopcart.ballsBound(event.target)
    },
    selectedFood (food) {
      this.foodDetailSwitcher = true
      this.selectedFoodItem = food
    },
    onClose () {
      this.foodDetailSwitcher = !this.foodDetailSwitcher
    }
  },
  data () {
    return {
      goods: [],
      classMap: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
      selectedFoodItem: {},
      foodDetailSwitcher: false
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

<style lang="stylus" scoped>
  @import "~assets/stylus/mixin.styl"
  .goods
    .goods-wrapper
      position absolute
      width 100%
      top 176px
      bottom 48px
      display flex
      >>>.cube-scroll-nav
        width 100%
      >>>.cube-scroll-nav-bar-items
        font-size 12px
        color rgb(77, 85, 93)
        line-height 14px
        background-color #f2f5f7
        width 80px
        .cube-scroll-nav-bar-item_active
          background-color #fff
      >>>.cube-scroll-nav-panels
        // flex 1
        // overflow scroll
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
            flex 1
            position relative
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
            .cart-control
              position absolute
              // width 70px
              height 24px
              right 0
              bottom 0
      >>>.cube-scroll-nav-panel-title
          font-size 12px
          color rgb(147, 153, 159)
          height 26px
          line-height 26px
          background-color #f3f5f7
          border-left 2px solid #d9dde1
          padding-left 18px
</style>
