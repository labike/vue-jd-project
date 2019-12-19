<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-12 22:15:32
 * @LastEditTime: 2019-10-12 22:15:32
 * @LastEditors: your name
 -->
<template>
<!--
  让多层背景以不同的速度移动
  将背景设置为相对布局
  监听组件的滑动
  -->
  <div class="speed" @scroll="onScrollChange">
    <div class="speed-slow" :style="{top: slowTop}">
      <slot name="speed-slow"></slot>
    </div>
    <div class="speed-content z-index-2">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      speedScrollTop: 0,
      SPEED_DIFF: 2
    }
  },
  methods: {
    onScrollChange ($event) {
      this.speedScrollTop = $event.target.scrollTop
      this.$emit('onScrollChange', this.speedScrollTop)
    }
  },
  computed: {
    slowTop () {
      return (this.speedScrollTop - (this.speedScrollTop / this.SPEED_DIFF)) + 'px'
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@css/style.scss';

  .speed{
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow-y: auto;
    &-slow{
      width: 100%;
      position: relative;
    }
    &-content{
      width: 100%;
      position: relative;
    }
  }
</style>
