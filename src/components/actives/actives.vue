<template>
  <div class="actives">
    <dl>
      <dd v-for="(item, idx) in seller.supports" :key="idx" class="item">
        <support-icon :support-type="item.type"/>
        <span class="txt">{{item.description}}</span>
      </dd>
    </dl>
  </div>
</template>

<script>
import supportIcon from '../supporticon/supporticon'

export default {
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    supportIcon
  }
}
</script>

<style lang="stylus">
  .actives
    .item
      display flex
      align-items center
      padding 16px 12px
      border-bottom 1px solid rgba(7,17,27,0.1)
      font-size 0
      .support-icon
        margin-right 6px
      .txt
        font-size 12px
        font-weight 200
        color rgb(7,17,27)
        line-height 16px
      &:last-child
        border-bottom none
        padding 16px 12px 0 12px
</style>
