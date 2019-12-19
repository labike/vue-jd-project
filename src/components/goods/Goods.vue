<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-27 11:45:42
 * @LastEditTime: 2019-10-14 14:49:36
 * @LastEditors: Please set LastEditors
  瀑布流布局:
  1. 创建商品列表的基本布局, 让item相对于goods(div)进行排列(相对布局)
  2. 生成不同高度的图片, 撑起不同高度的item
  3. 计算item的位置, 来达到从上到下从左到右依次排列的目的
-->
<template>
  <div @scroll="onScrollChange" ref="goods" class="goods" :class="[layoutClass, {'goods-scroll' : isScroll}]" :style="{height: goodsViewHeight}">
    <div @click="onItemClick(item)" :class="layoutItemClass" :style="goodsAllItemsStyles[index]" ref="goodsItem" class="goods-item" v-for="(item, index) in sortGoodsDatas" :key="index">
      <img class="goods-item-img" :src="item.img" alt="" :style="imgStyles[index]">
      <div class="goods-item-desc">
        <p class="goods-item-desc-name text-line-two" :class="{'goods-item-desc-name-hint' : !item.isHave}">
          <direct v-if="item.isDirect"></direct>
          <no-have v-if="!item.isHave"></no-have>
          {{item.name}}
        </p>
        <div class="goods-item-desc-data">
          <p class="goods-item-desc-data-price">&yen;{{item.price | priceValue}}</p>
          <p class="goods-item-desc-data-volume">销量: {{item.volume}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Direct from '@components/goods/Direct.vue'
import NoHave from '@components/goods/NoHave.vue'

export default {
  components: {
    Direct,
    NoHave
  },
  props: {
    layoutType: {
      type: String,
      default: '1'
    },
    // 是否允许goods单独滑动
    isScroll: {
      type: Boolean,
      default: true
    },
    // 排序规则, 依赖goodsOptions的id, 1默认, 1-2价格由高到低,1-3销量由高到低
    // 2有货优先
    // 3直营优先
    sort: {
      type: String,
      default: '1'
    }
  },
  created () {
    this.initData()
  },
  data () {
    return {
      dataSource: [],
      // 排序数组
      sortGoodsDatas: [],
      MAX_IMG_HEIGHT: 230,
      MIN_IMG_HEIGHT: 178,
      scrollTopVal: 0,
      imgStyles: [],
      ITEM_MARGIN_SIZE: 8,
      goodsAllItemsStyles: [],
      // 默认为0
      goodsViewHeight: '100%',
      layoutClass: 'goods-list',
      layoutItemClass: 'goods-list-item'
    }
  },
  activated () {
    this.$refs.goods.scrollTop = this.scrollTopVal
  },
  methods: {
    initData () {
      this.$http.get('/goods').then(data => {
        this.dataSource = data.list
        this.setSortGoodsData()
        this.initLayout()
      })
    },
    /**
     * 商品排序
     */
    setSortGoodsData () {
      switch (this.sort) {
        case '1':
          // 深拷贝数据源不改变原数组
          this.sortGoodsDatas = this.dataSource.slice(0)
          break
        case '1-2':
          this.getSortGoodsDataFormKey('price')
          break
        case '1-3':
          this.getSortGoodsDataFormKey('volume')
          break
        case '2':
          this.getSortGoodsDataFormKey('isHave')
          break
        case '3':
          this.getSortGoodsDataFormKey('isDriect')
          break
      }
    },
    /**
    * 根据传入的key来进行排序
    * -1表示goods1排列在goods2之前
    */
    getSortGoodsDataFormKey (key) {
      this.sortGoodsDatas.sort((goods1, goods2) => {
        let v1 = goods1[key]
        let v2 = goods2[key]
        if (typeof v1 === 'boolean') {
          if (v1) {
            return -1
          }
          if (v2) {
            return 1
          }
          return 0
        }
        if (parseFloat(v1) >= parseFloat(v2)) {
          return -1
        }
        return 1
      })
    },
    initLayout () {
      // 初始化影响布局的数据googsViewHeight, goodsItemStyles, imgStyles
      this.goodsViewHeight = '100%'
      this.goodsItemsStyle = []
      this.imgStyles = []

      switch (this.layoutType) {
        case '1':
          this.layoutClass = 'goods-list'
          this.layoutItemClass = 'goods-list-item'
          break
        case '2':
          this.layoutClass = 'goods-grid'
          this.layoutItemClass = 'goods-grid-item'
          break
        case '3':
          this.layoutClass = 'goods-waterfall'
          this.layoutItemClass = 'goods-waterfall-item'
          this.initImgStyles()
          // 等到dom创建完成之后才能调用initWaterFall()
          this.$nextTick(() => {
            this.initWaterFall()
          })
          break
      }
    },
    // 返回随机的图片高度
    imgHeight () {
      let result = Math.floor(Math.random() * (this.MAX_IMG_HEIGHT - this.MIN_IMG_HEIGHT) + this.MIN_IMG_HEIGHT)
      return result
    },
    // 根据随即图片高度生成对应的图片样式
    initImgStyles () {
      this.dataSource.map(item => {
        // 随机生成的图片高度
        let imgHeight = this.imgHeight() + 'px'
        // push图片高度到img 样式集合
        this.imgStyles.push({
          height: imgHeight
        })
      })
    },
    // 瀑布流
    initWaterFall () {
      /**
       * 1. 获取所有的item元素
       * 2. 遍历item元素,得到每一个item的高度, 加上一个margin的高度
       * 3. 创建两个变量: leftHeight, rightHeight分别表示左右两侧目前距离顶部的高度,
       * 通过对于左右两侧距离顶部的高度来确定item的放置位置
       * 如果左侧小于等于右侧高度的话(leftHeightTotal <= rightHeightTotal), 那么item就应该放到左侧,
       * 此时item距离左侧的距离为0, 距离顶部为当前的leftHeightTotal.
       * 4. 保存计算出的item的所有样式, 并将其配置到item上.
       */
      let $goodsItems = this.$refs.goodsItem
      if (!$goodsItems) return
      // 左右两侧距离顶部的高度
      let leftHeightTotal = 0
      let rightHeightTotal = 0
      $goodsItems.map(($el, index) => {
        let goodsItemsStyle = {}
        let elHeight = $el.clientHeight + this.ITEM_MARGIN_SIZE
        if (leftHeightTotal <= rightHeightTotal) {
          goodsItemsStyle = {
            left: '0px',
            top: leftHeightTotal + 'px'
          }
          leftHeightTotal += elHeight
        } else {
          goodsItemsStyle = {
            right: '0px',
            top: rightHeightTotal + 'px'
          }
          rightHeightTotal += elHeight
        }
        this.goodsAllItemsStyles.push(goodsItemsStyle)
      })
      if (!this.isScroll) {
        this.goodsViewHeight = (leftHeightTotal > rightHeightTotal ? leftHeightTotal : rightHeightTotal) + 'px'
      }
    },
    onItemClick (item) {
      if (!item.isHave) {
        alert('该商品无库存')
        return
      }
      this.$router.push({
        name: 'goodsDetail',
        params: {
          routerType: 'push'
          // goods: item
        },
        query: {
          goodsId: item.id
        }
      })
    },
    onScrollChange ($event) {
      this.scrollTopVal = $event.target.scrollTop
    }
  },
  watch: {
    layoutType () {
      this.initLayout()
    },
    sort () {
      this.setSortGoodsData()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@css/style.scss';

  .goods{
    background-color: $bgColor;
    &-scroll{
      overflow: hidden;
      overflow-y: auto;
    }
    &-item{
      background-color: #fff;
      padding: $marginSize;
      box-sizing: border-box;
      &-desc{
        width: 100%;
        &-name{
          font-size: $infoSize;
          line-height: px2rem(18);
          &-hint{
            color: $hintColor;
          }
        }
        &-data{
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: $marginSize;
          &-price{
            font-size: $titleSize;
            color: $mainColor;
            font-weight: 500;
          }
          &-volume{
            font-size: $infoSize;
            color: $hintColor;
          }
        }
      }
    }
  }
  .goods-list{
    &-item{
      display: flex;
      border-bottom: 1px solid $lineColor;
      .goods-item-img{
        width: px2rem(120);
        height: px2rem(120px);
      }
      .goods-item-desc{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: $marginSize
      }
    }
  }
  .goods-grid{
    padding: $marginSize;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    &-item{
      width:49%;
      border-radius: $radiusSize;
      margin-bottom: $marginSize;
      .goods-item-img{
        width: 100%;
      }
    }
  }
  .goods-waterfall{
    position: relative;
    margin: $marginSize;
    &-item{
      position: absolute;
      width: 49%;
      border-radius: $radiusSize;
      .goods-item-img{
        width: 100%;
      }
    }
  }
</style>
