<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-25 09:50:39
 * @LastEditTime: 2019-10-08 14:18:15
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="home" @scroll="onScrollChange" ref="home">
    <navigation-bar :isShowBack="false" :navBarStyle="navBarStyle">
      <template v-slot:nav-left>
        <img :src="navBarCurrentSlotStyle.leftIcon" alt="">
      </template>
      <template v-slot:nav-center>
        <!-- <p style="font-size: 32px;"> -->
          <search :bgColor="navBarCurrentSlotStyle.search.bgColor" :hintColor="navBarCurrentSlotStyle.search.hintColor" :icon="navBarCurrentSlotStyle.search.icon"
          ></search>
        <!-- </p> -->
      </template>
      <template v-slot:nav-right>
        <img :src="navBarCurrentSlotStyle.rightIcon" alt="">
      </template>
    </navigation-bar>
    <div class="home-content">
      <main-swiper :swiperImgs="swiperData.map(item => item.icon)" :height="swiperHeight"></main-swiper>
      <activity>
        <div class="activity-content">
          <img v-for="(item, index) in activityContent" :src="item.icon" alt="" :key="index">
        </div>
      </activity>
      <mode-options></mode-options>
      <seconds :dataSource="secondDatas"></seconds>
      <activity>
        <div class="activity-buy">
          <img src="@images/pinGouJie.gif" alt="">
        </div>
      </activity>
      <goods layoutType="3" :isScroll="false"></goods>
    </div>
  </div>
</template>

<script>
import MainSwiper from '@components/swiper/MainSwiper.vue'
import Activity from '@components/common/Activity.vue'
import ModeOptions from '@components/common/ModeOptions.vue'
import Seconds from '@components/seconds/Seconds.vue'
import Goods from '@components/goods/Goods.vue'
import NavigationBar from '@components/common/NavigationBar.vue'
import Search from '@components/common/Search.vue'

export default {
  components: {
    MainSwiper,
    Activity,
    ModeOptions,
    Seconds,
    Goods,
    NavigationBar,
    Search
  },
  created () {
    this.navBarCurrentSlotStyle = this.navBarSlotStyle.normal
    this.initData()
  },
  activated () {
    this.$refs.home.scrollTop = this.scrollTopValue
  },
  data () {
    return {
      swiperData: [],
      swiperHeight: this.$store.state.isIphoneX ? '228px' : '184px',
      activityContent: [],
      secondDatas: [],
      navBarSlotStyle: {
        normal: {
          leftIcon: require('@images/more-white.svg'),
          search: {
            bgColor: '#fff',
            hintColor: '#999',
            icon: require('@images/search.svg')
          },
          rightIcon: require('@images/message-white.svg')
        },
        highlight: {
          leftIcon: require('@images/more.svg'),
          search: {
            bgColor: '#d7d7d7',
            hintColor: '#fff',
            icon: require('@images/search-white.svg')
          },
          rightIcon: require('@images/message.svg')
        }
      },
      navBarCurrentSlotStyle: {},
      navBarStyle: {
        position: 'fixed',
        backgroundColor: ''
      },
      // 记录页面滚动值
      scrollTopValue: -1,
      // 锚点值
      ANCHOR_SCROLL_TOP: 160
    }
  },
  methods: {
    initData () {
      this.$http.all([
        this.$http.get('/swiper'),
        this.$http.get('/activitys'),
        this.$http.get('/seconds')
      ]).then(this.$http.spread((swiperData, activityContent, secondDatas) => {
        this.swiperData = swiperData.list
        this.activityContent = activityContent.list
        this.secondDatas = secondDatas.list
      }))
      // this.$http.get('/swiper').then(data => {
      //     this.swiperData = data.list
      // }).catch(err => {
      //   console.log(err)
      // })

      // this.$http.get('/activitys').then(data => {
      //   console.log(data.list)
      //   this.activityContent = data.list
      // }).catch(err => {
      //   console.log(err)
      // })
    },
    onScrollChange ($event) {
      // 滚动的距离/ 锚点值 = navbar背景透明度
      // opacity>=1当前滚动的距离超过了锚点值, navBar插槽样式为高亮
      this.scrollTopValue = $event.target.scrollTop
      let opacity = this.scrollTopValue / this.ANCHOR_SCROLL_TOP
      if (opacity >= 1) {
        this.navBarCurrentSlotStyle = this.navBarSlotStyle.highlight
      } else {
        this.navBarCurrentSlotStyle = this.navBarSlotStyle.normal
      }
      this.navBarSlotStyle.backgroundColor = 'rgba(255, 255, 255, " + opacity +")'
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@css/style.scss';

  .home{
    width: 100%;
    height: 100%;
    font-size: 32px;
    background-color: $bgColor;
    overflow: hidden;
    overflow-y: auto;
    &-content{
      height: 100%;
      .activity-content{
        margin-top: -8px;
        border-top-left-radius: pax2rem(8);
        border-top-right-radius: pax2rem(8);
        img{
          display: inline-block;
          width: 33.3%;
        }
      }
      .activity-buy{
        background-color: #fff;
        margin-top: $marginSize;
        img{
          width: 100%;
        }
      }
    }
  }
</style>
