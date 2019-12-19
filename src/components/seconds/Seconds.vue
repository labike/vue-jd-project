<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-26 20:52:58
 * @LastEditTime: 2019-09-27 09:17:05
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="seconds">
    <div class="seconds-wrap">
      <p class="seconds-wrap-title">秒杀活动</p>
      <count-down :endHours="16"></count-down>
    </div>
    <div class="seconds-content">
      <div class="seconds-content-item" v-for="(item, index) in dataSource" :key="index">
        <img class="seconds-content-item-icon" :src="item.icon" alt="">
        <p class="seconds-content-item-price">&yen;{{item.price | priceValue}}</p>
        <p class="seconds-content-item-old-price">&yen;{{item.oldPrice | priceValue}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import CountDown from '@components/seconds/CountDown.vue'

export default {
  components: {
    CountDown
  },
  props: {
    dataSource: {
      type: Array,
      required: true,
      default: () => {
        return []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@css/style.scss';

  .seconds{
    background-color: #fff;
    border-radius: $radiusSize;
    margin: $marginSize;
    &-wrap{
      display: flex;
      padding: $marginSize;
      &-title{
        font-size: $titleSize;
        display: inline-block;
      }
    }
    &-content{
      padding: $marginSize 0;
      display: flex;
      overflow: hidden;
      overflow-x: scroll;
      &-item{
        padding: 0 px2rem(12);
        text-align: center;
        &-icon{
          width: px2rem(66);
          height: px2rem(66);
        }
        &-price{
          color: $mainColor;
          font-size: $titleSize;
          margin-top: px2rem(4);
        }
        &-old-price{
          color: $hintColor;
          font-size: $infoSize;
          margin-top: $marginSize;
          text-decoration: line-through;
        }
      }
    }
  }
</style>
