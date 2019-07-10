<template>
  <div class="com-star">
    <span v-for="(item, idx) in starTypes" :key="idx" :class="[item, 'size-'+size]" class="star-item"></span>
  </div>
</template>

<script>
export default {
  props: {
    score: {
      type: Number,
      default: 0
    },
    size: {
      type: Number
    }
  },
  computed: {
    starTypes () {
      const LENGTH = 5
      let result = []
      let value = (Math.floor(this.score * 2)) / 2
      let hasDecimal = value % 1 === 0
      let int = Math.floor(value)

      for (let i = 0; i < int; i++) {
        result.push('on')
      }
      if (!hasDecimal) {
        result.push('half')
      }
      while (result.length < LENGTH) {
        result.push('off')
      }
      return result
    }
  }
}
</script>

<style lang="stylus">
  .com-star
    display inline-block
    .star-item.size-36
      display inline-block
      width 15px
      height 15px
      background-size 15px 15px
      vertical-align middle
      margin-right 3px
      &:last-child
        margin-right 0
      &.on
        background-image url(./star36_on@2x.png)
      &.half
        background-image url(./star36_half@2x.png)
      &.off
        background-image url(./star36_off@2x.png)
    .star-item.size-24
      display inline-block
      width 10px
      height 10px
      background-size 10px 10px
      vertical-align middle
      margin-right 3px
      &:last-child
        margin-right 0
      &.on
        background-image url(./star24_on@2x.png)
      &.half
        background-image url(./star24_half@2x.png)
      &.off
        background-image url(./star24_off@2x.png)
    .star-item.size-48
      display inline-block
      width 20px
      height 20px
      background-size 20px 20px
      vertical-align middle
      margin-right 3px
      &:last-child
        margin-right 0
      &.on
        background-image url(./star48_on@2x.png)
      &.half
        background-image url(./star48_half@2x.png)
      &.off
        background-image url(./star48_off@2x.png)
</style>
