<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-28 11:19:30
 * @LastEditTime: 2019-10-08 14:12:40
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="search" :style="{backgroundColor: bgColor}">
    <img class="search-icon" :src="icon" alt="">
    <span class="search-hint" :sltye="{color: hintColor}">你好吗</span>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: require('@images/search.svg')
    },
    hintColor: {
      type: String,
      default: '#999'
    },
    bgColor: {
      type: String,
      default: '#fff'
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@css/style.scss';

  .search{
    background-color: #fff;
    width: 100%;
    margin: px2rem(6);
    border-radius: px2rem(22);
    display: flex;
    align-items: center;
    &-icon{
      margin-left: $marginSize;
      width: px2rem(16);
    }
    &-hint{
      margin-left: $marginSize;
      font-size: $minInfoSize;
      color: $hintColor;
    }
  }
</style>
