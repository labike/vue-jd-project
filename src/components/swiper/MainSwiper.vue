<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-25 10:49:01
 * @LastEditTime: 2019-10-14 14:32:17
 * @LastEditors: Please set LastEditors
 -->
<template>
  <swiper :options="swiperOption">
    <swiper-slide v-for="(slide, index) in swiperImgs" :key="index">
      <img class="swiper-slider-img" :style="{height: height}" :src="slide" alt="">
    </swiper-slide>
    <template v-slot:pagination>
      <div class="swiper-pagination"></div>
    </template>
  </swiper>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  props: {
    height: {
      type: String,
      default: 'auto'
    },
    swiperImgs: {
      type: Array,
      required: true,
      default: () => {
        return []
      }
    },
    /**
     * 1. 原点
     * 2. 数字
     */
    paginationType: {
      type: String,
      default: '1'
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  created () {
    this.initPaginationLayout()
  },
  data () {
    return {
      swiperOption: {
        autoplay: true,
        autoHeight: true,
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          buttlesClass: 'custom-buttle-class'
        }
      }
    }
  },
  methods: {
    initPaginationLayout () {
      switch (this.paginationType) {
        case '1':
          this.swiperOption.pagination = {
            el: '.swiper-pagination',
            type: 'bullets',
            buttlesClass: 'custom-buttle-class'
          }
          break
        case '2':
          this.swiperOption.pagination = {
            el: '.swiper-pagination',
            type: 'fraction'
          }
          break
      }
    }
  }
}
</script>

<style lang="scss">
@import '@css/style.scss';

.swiper-slide-img{
  width: 100%;
}
.swiper-pagintaion{
  bottom: px2rem(12);
  .custom-buttle-class{
    box-sizing: border-box;
    width: px2rem(6);
    height: px2rem(6);
    border: 1px solid #fff;
    border-radius: 100%;
    margin: 0 px2rem(4);
    display: inline-block;
    opacity: 1;
  }
  .swiper-pagintaion-buttle-active{
    background-color: #fff;
  }
}
.swiper-pagintaion-fraction{
  left: auto;
  right: 0;
  width: auto;
  font-size: $infoSize;
  background-color: rgba(0, 0, 0, .3);
  padding: px2rem(6) px2rem(18);
  border-top-left-radius: px2rem(16);
  border-bottom-left-radius: px2rem(16);
  bottom: px2rem(32);
  color: #fff;
  .swiper-pagintaion-current{
    font-size: $titleSize;
    font-weight: bold;
  }
}
</style>
