<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-25 09:50:39
 * @LastEditTime: 2019-10-17 09:47:08
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="shopping">
    <navigation-bar pageName="购物车" isShowBack="false"></navigation-bar>
    <div class="shopping-content">
      <div class="shopping-content-list">
        <div class="shopping-content-list-item" v-for="(item, index) in shoppingDatas" :key="index">
          <img @click="onGoodsCheckClick(item)" class="shopping-content-list-item-check" :src="checkImg(item.isCheck)" alt="">
          <img class="shopping-content-list-item-img" :src="item.img" alt="">
          <div class="shopping-content-list-item-desc">
            <p class="shopping-content-list-item-desc-name text-line-2">
              <direct v-if="item.isDirect"></direct>
              {{item.name}}
            </p>
            <div class="shopping-content-list-item-desc-data">
              <p class="shopping-content-list-item-desc-data-price">
                &yen;{{item.price | priceValue}}
              </p>
              <number-manager :defaultNumber="item.number" @onChangeNumber="onNumberChange(arguments, item, index)"></number-manager>
            </div>
          </div>
        </div>
      </div>
      <div class="shopping-content-total">
          <div class="shopping-content-total-check">
            <img @click="onAllCheckClick" :src="checkImg(totalData.isAll)" alt="">
            <p>全选</p>
          </div>
          <div class="shopping-content-total-price">
            <p class="shopping-content-total-price-total">合计 <span>{{totalData.totalPrice | priceValue}}</span></p>
            <p class="shopping-content-total-price-all">
              总额: <span>&yen;{{totalData.totalPrice | priceValue}}</span>&nbsp;
              立减<span>&yen;0.00</span>
            </p>
          </div>
          <div class="shopping-content-total-commit">
            去结算{{totalData.goodsNumber}}
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import NavigationBar from '@components/common/NavigationBar.vue'
import Direct from '@components/goods/Direct.vue'
import NumberManager from '@components/goods/NumberManager.vue'

export default {
  components: {
    NavigationBar,
    Direct,
    NumberManager
  },
  data () {
    return {
      shoppingDatas: this.$store.state.shoppingDatas,
      totalData: {
        isAll: false,
        totalPrice: 0,
        goodsNumber: 0
      }
    }
  },
  methods: {
    onNumberChange ($arguments, item, index) {
      let number = $arguments[0]
      this.$store.commit('changeShoppingDataNumber', {
        index,
        number
      })
      // 商品数量发生变化并且被选中的时候调用
      if (item.isCheck) {
        this.computeGoodsTotal()
      }
      console.log(item.number)
    },
    onGoodsCheckClick (item) {
      item.isCheck = !item.isCheck
      this.computeGoodsTotal()
    },
    onAllCheckClick () {
      this.totalData.isAll = !this.totalData.isAll
      this.shoppingDatas.map(item => {
        item.isCheck = this.totalData.isAll
      })
      this.computeGoodsTotal()
    },
    checkImg (isCheck) {
      return isCheck ? require('@images/check.svg') : require('@images/no-check.svg')
    },
    computeGoodsTotal () {
      this.totalData = {
        isAll: true,
        totalPrice: 0,
        goodsNumber: 0
      }
      this.shoppingDatas.map(item => {
        if (item.isCheck) {
          this.totalData.totalPrice += parseFloat(item.price) * parseInt(item.number)
          this.totalData.goodsNumber += parseInt(item.number)
        } else {
          this.totalData.isAll = false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@css/style.scss';

  .shopping{
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    &-content{
      background-color: $bgColor;
      border-top: 1px solid $lineColor;
      height: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      &-list{
        height: 100%;
        overflow: hidden;
        overflow-y: auto;
        &-item{
          background-color: #fff;
          padding: $marginSize;
          display: flex;
          border-bottom: 1px solid $lineColor;
          &-check{
            width: $checkSize;
            align-self: center;
            padding: px2rem(6);
          }
          &-img{
            width: $listGoodsImgSize;
            height: $listGoodsImgSize;
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
            &-data{
              width: 10%;
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-top: $marginSize;
              &-price{
                font-size: $titleSize;
                color: $mainColor;
                font-weight: 500;
              }
            }
          }
        }
      }
      &-total{
        height: px2rem(56);
        box-sizing: border-box;
        display: flex;
        align-items: center;
        background-color: #fff;
        border-top: 1px solid $lineColor;
        &-check{
          display: flex;
          align-items: center;
          margin: 0 $marginSize;
          img{
            width: $checkSize;
            height: $checkSize;
            padding: px2rem(6);
            p{
              font-size: $infoSize;
            }
          }
        }
        &-price{
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          &-total{
            font-size: $titleSize;
            margin-bottom: px2rem(6);
            span{
              font-weight: bold;
            }
          }
          &-all{
            font-size: $minInfoSize;
            span{
              font-weight: bold;
            }
          }
        }
        &-commit{
          width: px2rem(120);
          height: 100%;
          font-size: $titleSize;
          background-color: $mainColor;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
</style>
