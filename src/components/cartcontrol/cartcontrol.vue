<template>
  <div class="cart-control">
    <transition name="move">
      <div v-if="food.count>0" class="cart-decrease" @click.stop="decreaseCart">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div v-if="food.count>0" class="cart-num">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop="addCart"></div>
  </div>
</template>

<script>
export default {
  props: {
    food: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    addCart (event) {
      if (!this.food.count) {
        this.$set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
      this.$emit('drop', event)
    },
    decreaseCart () {
      this.food.count--
    }
  }
}
</script>

<style lang="stylus">
  .cart-control
    display flex
    align-items center
    color rgb(0, 160 220)
    font-size 24px
    .cart-decrease
      opacity 1
      .inner
        display inline-block
      &.move-enter, &.move-leave-to
        opacity 0
        transform translate3d(24px, 0, 0)
        .inner
          transform rotate(180deg)
      &.move-enter-active, &.move-leave-active
        transition all .4s ease-out
        .inner
          transition all .4s ease-out
    .cart-num
      font-size 10px
      color rgb(147,153,159)
      width 24px
      text-align center
</style>
