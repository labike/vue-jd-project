<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-02 09:17:35
 * @LastEditTime: 2019-10-13 22:08:34
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="goods-list-page">
    <navgation-bar @onLeftClick="onBackClick" pageName="商品列表">
      <template v-slot:nav-right>
        <img :src="layoutType.icon" @click="onChangeLayoutTypeClick()" alt="切换">
      </template>
    </navgation-bar>
    <div class="goods-list-page-content" :class="{'iphonex-bottom' : $store.state.isIphoneX}">
      <goods-options @optionChange="onGoodsOptionChange"></goods-options>
      <goods :layoutType="layoutType.type" :sort="sortType"></goods>
    </div>
  </div>
</template>

<script>
import NavgationBar from '@components/common/NavigationBar.vue'
import GoodsOptions from '@components/goods/GoodsOptions.vue'
import Goods from '@components/goods/Goods.vue'

export default {
  name: 'goodsList',
  components: {
    NavgationBar,
    GoodsOptions,
    Goods
  },
  data () {
    return {
      layoutTypeDatas: [
        {
          type: '1',
          icon: require('@images/list-type.svg')
        },
        {
          type: '2',
          icon: require('@images/grid-type.svg')
        },
        {
          type: '3',
          icon: require('@images/waterfall-type.svg')
        }
      ],
      layoutType: {},
      sortType: '1'
    }
  },
  created () {
    this.layoutType = this.layoutTypeDatas[0]
  },
  methods: {
    onBackClick () {
      this.$router.go(-1)
    },
    onChangeLayoutTypeClick () {
      if (this.layoutType.type === '1') {
        this.layoutType = this.layoutTypeDatas[1]
      } else if (this.layoutType.type === '2') {
        this.layoutType = this.layoutTypeDatas[2]
      } else {
        this.layoutType = this.layoutTypeDatas[0]
      }
    },
    /**
     * 当筛选项改变时被调用
     */
    onGoodsOptionChange (sortType) {
      this.sortType = sortType
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@css/style.scss';

  .goods-list-page{
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    &-content{
      height: 100%;
      display: flex;
      flex-direction: column;
    }
  }
</style>
