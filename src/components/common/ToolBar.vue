<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-24 21:38:15
 * @LastEditTime: 2019-09-25 09:48:10
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="tool-bar" :class="{'iphonex-bottom' : $store.state.isIphoneX}">
    <div class="tool-bar-item" @click="changeTab(item, index)" v-for="(item, index) in toolBarData" :key="index">
      <img class="tool-bar-item-img" :src="[index === selectItemIndex ? item.hIcon : item.nIcon]" alt="">
      <p class="tool-bar-item-name" :class="{'tool-bar-item-name-h' : index === selectItemIndex}">{{item.name}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      toolBarData: [
        {
          nIcon: require('@images/home-n.svg'),
          hIcon: require('@images/home-h.svg'),
          name: '首页',
          componentName: 'home'
        },
        {
          nIcon: require('@images/shopping-n.svg'),
          hIcon: require('@images/shopping-h.svg'),
          name: '购物车',
          componentName: 'shopping'
        },
        {
          nIcon: require('@images/my-n.svg'),
          hIcon: require('@images/my-h.svg'),
          name: '我的',
          componentName: 'my'
        }
      ],
      selectItemIndex: 0
    }
  },
  methods: {
    changeTab (item, index) {
      this.selectItemIndex = index
      this.$emit('changeTab', item.componentName)
    },
    /**
     * 指定切换的tab页
     */
    pushFragment (index) {
      this.changeTab(this.toolBarData[index], index)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@css/style.scss';

  .tool-bar{
    width: 100%;
    height: px2rem(46);
    display: flex;
    justify-content: space-around;
    background-color: #fff;
    box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.2);
    border-top: 1px solid $lineColor;
    &-item{
      text-align: center;
      padding: px2rem(4) px2rem(12);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      &-img{
        width: px2rem(22);
        height: px2rem(22);
      }
      &-name{
        font-size: $infoSize;
        margin-top: px2rem(4);
        &-h{
          color: $mainColor;
        }
      }
    }
  }
</style>
