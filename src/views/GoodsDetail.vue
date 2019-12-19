<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-11 21:39:26
 * @LastEditTime: 2019-10-17 14:15:09
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="goods-detail">
    <navigation-bar :isShowBack="false" :navBarStyle='navBarStyle'>
      <template v-slot:nav-left>
        <div class="goods-detail-nav-left" @click='onBackClick()'>
          <img src="@images/back-2.svg" :style="{opacity: leftImgOpacity}" alt="">
          <img src="@images/back-white.svg" :style="{opacity: navBarSlotOpacity}" alt="">
        </div>
      </template>
      <template v-slot:nav-center>
        <p class="goods-detail-nav-title" :style="{opacity: navBarSlotOpacity}">商品详情</p>
      </template>
    </navigation-bar>
    <div class="goods-detail-content">
      <speed @onScrollChange="onScrollChange">
        <template v-slot:speed-slow>
          <main-swiper paginationType="2" :height="SWIPER_HEIGHT + 'px'" :swiperImgs="goodsDatas.swiperImgs"></main-swiper>
        </template>
        <template>
          <div class="goods-detail-content-desc">
            <div class="goods-detail-content-desc-item">
              <p class="goods-detail-content-desc-item-price">
                &yen;{{goodsDatas.price | priceValue}}
              </p>
              <p class="goods-detail-content-desc-item-name">
                <direct v-if="goodsDatas.isDirect"></direct>
                {{goodsDatas.name}}
              </p>
            </div>
            <div class="goods-detail-content-desc-item">
              <p class="goods-detail-content-desc-item-select">
                已选
                <span class="single-row-text">{{goodsDatas.name}}</span>
              </p>
              <div class="goods-detail-content-desc-item-support">
                <ul class="goods-detail-content-desc-item-support-list">
                  <li v-for="(item, index) in supportList" :key="index" class="goods-detail-content-desc-item-support-list-item">
                    <img src="@images/support.svg" alt="">
                    <span>{{item}}</span>
                  </li>
                </ul>
              </div>
              <div class="goods-detail-content-desc-detail">
                <img v-for="(item, index) in goodsDatas.detailImgs" :key="index" :src="item" alt="">
              </div>
            </div>
          </div>
        </template>
      </speed>
    </div>
    <div class="goods-detail-buy" :class="{'iphonex-bottom' : $store.state.isIphoneX}">
      <div class="goods-detail-buy-add" @click="onBuyClick">
        立即购买
      </div>
      <div class="goods-detail-buy-now" @click="onAddGoodsClick">
        加入购物车
      </div>
    </div>
  </div>
</template>

<script>
import NavigationBar from '@components/common/NavigationBar'
import MainSwiper from '@components/swiper/MainSwiper'
import Direct from '@components/goods/Direct'
import Speed from '@components/common/Speed'

export default {
  name: 'goodsDetail',
  components: {
    NavigationBar,
    MainSwiper,
    Direct,
    Speed
  },
  data () {
    return {
      SWIPER_HEIGHT: 364,
      ANCHOR_SCROLL_TOP: 310,
      scrollTopVal: 0,
      // navBarStyle: {
      //   backgroundColor: '',
      //   position: 'fixed'
      // },
      goodsDatas: {},
      supportList: [
        '可配送海外',
        '京东发货&售后',
        '精准达',
        '211限时达',
        '可自提',
        '不可使用优惠券'
      ]
    }
  },
  methods: {
    onBackClick () {
      this.$router.go(-1)
    },
    onScrollChange (scrollVal) {
      this.scrollTopVal = scrollVal
    },
    loadGoodsData () {
      this.$http.get('/goodsDetail', {
        params: {
          goodsId: this.$route.query.goodsId
        }
      }).then(data => {
        this.goodsDatas = data.goodsData
      })
    },
    onBuyClick () {
      this.$router.push({
        name: 'buy',
        params: {
          routerType: 'push'
        },
        query: {
          goodsId: this.goodsDatas.id
        }
      })
    },
    onAddGoodsClick () {
      this.$store.commit('addShoppingData', this.goodsDatas)
      alert('添加成功')
      this.$router.push({
        name: 'mainPage',
        params: {
          routerType: 'push',
          componentIndex: 1,
          clearTask: true
        }
      })
    }
  },
  created () {
    // 刷新浏览器的时候$router的params会被重置导致goodsData是undefined
    // 在url中添加商品标记goodsId, 通过goodsId获取对应的商品数据
    // this.goodsDatas = this.$router.params.goods
    this.loadGoodsData()
  },
  computed: {
    /**
     * 默认状态下左侧返回按钮透明度
     * 逐渐隐藏 1 - opacity
     */
    leftImgOpacity () {
      return 1 - this.scrollTopVal / this.ANCHOR_SCROLL_TOP
    },
    navBarStyle () {
      return {
        backgroundColor: 'rgba(216, 30, 6, " + this.navBarSlotOpacity + ")',
        position: 'fixed',
        top: 0
      }
    },
    navBarSlotOpacity () {
      return 1 - this.leftImgOpacity
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@css/style.scss';

  .goods-detail{
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    &-nav-left{
      width: 100%;
      display: flex;
      position: relative;
      img{
        position: absolute;
        align-self: center;
      }
    }
    &-nav-title{
      width: 100%;
      height: 100%;
      font-size: $titleSize;
      font-weight: bold;
      text-align: center;
      color: #fff;
    }
    &-content{
      overflow: hidden;
      height: 100%;
      &-desc{
        width: 100%;
        background-color: $bgColor;
        box-shadow: 0 0 px2rem(16) 0 rgba(0, 0, 0, .2);
        &-item{
          background-color: #fff;
          padding: $marginSize;
          margin-bottom: $marginSize;
          &-price{
            font-size: px2rem(20);
            color: $mainColor;
            font-weight: 500;
          }
          &-name{
            margin-top: $marginSize;
            font-size: $titleSize;
            font-weight: 500;
            line-height: px2rem(20);
          }
          &-select{
            font-size: $infoSize;
            color: $hintColor;
            height: px2rem(44);
            display: flex;
            align-items: center;
            border-bottom: 1px solid $lineColor;
            span{
              color: $textColor;
              font-size: $titleSize;
              font-weight: bold;
              margin-left: px2rem(4);
            }
          }
          &-support{
            margin-top: $marginSize;
            &-list{
              display: flex;
              flex-wrap: wrap;
              &-item{
                display: flex;
                align-items: center;
                padding: px2rem(6) 0;
                margin-right: $marginSize;
                img{
                  width: px2rem(12);
                  margin-right: px2rem(4);
                }
                span{
                  font-size: $minInfoSize;
                  color: $hintColor;
                }
              }
            }
          }
        }
        &-detail{
          img {
            width: 100%;
          }
        }
      }
    }
    &-buy{
      background-color: #fff;
      border-top: 1px solid $lineColor;
      height: px2rem(46);
      line-height: px2rem(46);
      text-align: right;
      div{
        display: inline-block;
        width: px2rem(100);
        text-align: center;
        font-size: $infoSize;
        color: #fff;
      }
      &-add{
        background-color: $mainColor;
      }
      &-now{
        background-color: darkgoldenrod;
      }
    }
  }
</style>
