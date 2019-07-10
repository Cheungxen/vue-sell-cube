<template>
  <span class="support-icon" :class="'type-'+supportType"></span>
</template>

<script>
export default {
  props: {
    supportType: {
      type: Number
    }
  }
}
</script>

<style lang="stylus">
  @import '~assets/stylus/mixin.styl'

  .support-icon
    display inline-block
    height 16px
    width 16px
    background-repeat no-repeat
    background-size contain
    // vertical-align middle

    &.type-0
      bg-image('decrease_3')

    &.type-1
      bg-image('discount_3')

    &.type-2
      bg-image('special_3')

    &.type-3
      bg-image('invoice_3')

    &.type-4
      bg-image('guarantee_3')
</style>
