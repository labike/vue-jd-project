<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-27 22:01:39
 * @LastEditTime: 2019-10-17 20:59:19
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div :style="navBarStyle" class="nav-bar z-index-max" :class="[{'iphonex-top' : $store.state.isIphoneX}, {'bottom-line' : pageName}]">
    <div class="left" @click="$emit('onLeftClick')">
      <img v-if="isShowBack" src="@images/back.svg" alt="">
      <slot name="nav-left"></slot>
    </div>
    <div class="center">
      <span v-if="pageName" class="page-title">{{pageName}}</span>
      <slot name="nav-center"></slot>
    </div>
    <div class="right">
      <slot name="nav-right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pageName: {
      type: String,
      require: true,
      default: ''
    },
    isShowBack: {
      type: Boolean,
      default: true
    },
    navBarStyle: {
      type: Object,
      default () {
        return {
          backgroundColor: '#fff'
        }
      }
    }
  }
}
</script>

<style lang="scss">
  @import '@css/style.scss';

  .nav-bar{
    width: 100%;
    height: px2rem(44);
    line-height: px2rem(44);
    display: flex;
    justify-content: space-between;
    // 适配手机statusBar
    padding-top: $statusBarHeight;
    .left, .right{
      display: flex;
      height: 100%;
      width: px2rem(26);
      padding: 0 $marginSize;
      img{
        width: 100%;
        align-self: center;
      }
    }
    .center{
      flex-grow: 1;
      display: flex;
      height: 100%;
      .page-title{
        font-size: $titleSize;
        align-self: center;
        margin: 0 auto;
      }
    }
  }
  .bottom-line{
    border-bottom: 1px solid $lineColor;
  }
</style>
