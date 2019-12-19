<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-14 20:40:49
 * @LastEditTime: 2019-10-18 15:38:18
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="buy-page">
    <navigation-bar pageName="立即购买" @onLeftClick="onBackClick"></navigation-bar>
    <div class="buy-page-content">
      <div class="buy-page-content-goods">
        <img class="buy-page-content-goods-img" :src="goodsData.img" alt="">
        <div class="buy-page-content-goods-dec">
          <p class="buy-page-content-goods-desc-name">{{goodsData.name}}</p>
          <p class="buy-page-content-goods-desc-price">&yen;{{goodsData.price | priceValue}}</p>
        </div>
      </div>
      <ul class="buy-page-content-list">
        <li class="buy-page-content-list-item" v-for="(item, index) in paymentDatas" :key="index" @click="onPaymentItemClick(item)">
          <img class="buy-page-content-list-item-icon" :src="item.icon" alt="">
          <div class="buy-page-content-list-item-desc">
            <p class="buy-page-content-list-item-desc-name">
              {{item.name}}
            </p>
            <p class="buy-page-content-list-item-desc-desc">
              {{item.desc}}
            </p>
          </div>
          <img class="buy-page-content-list-item-check" :src="getCheckIcon(selectPayment.id === item.id)" alt="">
        </li>
      </ul>
    </div>
    <div class="pay page-commit" @click="onPayClick">
      立即购买
    </div>
  </div>
</template>

<script>
import NavigationBar from '@components/common/NavigationBar'

export default {
  name: 'buy',
  components: {
    NavigationBar
  },
  data () {
    return {
      goodsData: {},
      paymentDatas: [
        {
          id: '1',
          name: '支付宝支付',
          desc: '数亿用户都在用, 安全可信托',
          icon: require('@images/alipay.svg')
        },
        {
          id: '2',
          name: '微信支付',
          desc: '亿万用户选择, 更快更安全',
          icon: require('@images/wechat.png')
        }
      ],
      selectPayment: {}
    }
  },
  created () {
    this.selectPayment = this.paymentDatas[0]
    this.loadGoodsData()
  },
  methods: {
    loadGoodsData () {
      this.$http.get('/goodsDetail', {
        params: {
          goodsId: this.$route.query.goodsId
        }
      }).then(data => {
        this.goodsData = data.goodsData
      })
    },
    // loadGoodsData () {
    //   this.$http.get('/goodsDetail', {
    //     params: {
    //       goodsId: this.$router.query.goodsId
    //     }
    //   }).then(data => {
    //     this.goodsData = data.goodsData
    //   })
    // },
    onBackClick () {
      this.$router.go(-1)
    },
    onPaymentItemClick (item) {
      this.selectPayment = item
    },
    getCheckIcon (isCheck) {
      return isCheck ? require('@images/check.svg') : require('@images/no-check.svg')
    },
    onPayClick () {
      if (this.selectPayment.id === 1) {
        this.aliPay()
      } else if (this.selectPayment.id === '2') {
        this.wxPay()
      }
    },
    aliPay () {
      if (window.androidJSBridge) {
        window.androidJSBridge.aliPay(JSON.stringify(this.goodsData))
      }
    },
    wxPay () {
      if (window.androidJSBridge) {
        window.androidJSBridge.wxPay(JSON.stringify(this.goodsData))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@css/style.scss';

  .buy-page{
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: $bgColor;
    &-content{
      overflow: hidden;
      height: 100%;
      &-goods{
        background-color: #fff;
        padding: $marginSize;
        display: flex;
        border-bottom: 1px solid $lineColor;
        border-top: 1px solid $lineColor;
        margin-top: $marginSize;
        &-img{
          width: px2rem(100);
          width: px2rem(100);
        }
        &-desc{
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 0 $marginSize;
          &-name{
            font-size: $infoSize;
            line-height: px2rem(18);
          }
          &-price{
            font-size: $titleSize;
            color: $mainColor;
            font-weight: 500;
          }
        }
      }
      &-list{
        margin-top: $marginSize;
        &-item{
          display: flex;
          background-color: #fff;
          border-bottom: 1px solid $lineColor;
          padding: $marginSize;
          align-items: center;
          &-icon{
            height: px2rem(30);
          }
          &-desc{
            margin-left: px2rem(12);
            flex-grow: 1;
            &-name{
              font-size: $infoSize;
            }
            &-desc{
              font-size: $minInfoSize;
              margin-top: px2rem(6);
              color: $hintColor;
            }
            &-check{
              width: px2rem(16);
              height: px2rem(16);
            }
          }
        }
      }
    }
    .pay{
      position: absolute;
      bottom: px2rem(52);
    }
  }
</style>
