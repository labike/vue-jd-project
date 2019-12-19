<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-25 21:31:19
 * @LastEditTime: 2019-10-13 15:54:12
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="mode-options">
    <div class="mode-options-item" v-for="(item, index) in dataSource" :key="index" @click="onItemClick(item)">
      <img class="mode-options-item-icon" :src="item.icon" alt="">
      <p class="mode-options-item-title">{{item.title}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataSource: [
        {
          id: '1',
          icon: require('@images/jingDongChaoShi.png'),
          title: '京东超市'
        },
        {
          id: '2',
          icon: require('@images/haiTunQuanQiu.png'),
          title: '海屯全球'
        },
        {
          id: '3',
          icon: require('@images/jingDongFuShi.png'),
          title: '京东服饰'
        },
        {
          id: '4',
          icon: require('@images/jingDongShengXian.png'),
          title: '京东生鲜'
        },
        {
          id: '5',
          icon: require('@images/jingDongDaoJia.png'),
          title: '京东到家'
        },
        {
          id: '6',
          icon: require('@images/chongZhiJiaoFei.png'),
          title: '充值缴费'
        },
        {
          id: '7',
          icon: require('@images/jingDongPinGou.png'),
          title: '9.9元拼'
        },
        {
          id: '8',
          icon: require('@images/lingJuan.png'),
          title: '领券'
        },
        {
          id: 'p',
          icon: require('@images/zhuanQian.png'),
          title: '赚钱'
        },
        {
          id: '10',
          icon: require('@images/quanBu.png'),
          title: '全部'
        }
      ]
    }
  },
  methods: {
    onItemClick (item) {
      this.$router.push({
        name: 'goodsList',
        params: {
          routerType: 'push'
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@css/style.scss';

  .mode-options{
    display: flex;
    flex-wrap: wrap;
    background-color: #fff;
    padding-bottom: px2rem(4);
    &-item{
      width: 20%;
      text-align: center;
      margin-top: px2rem(10);
      &-icon{
        width: px2rem(40);
        height: px2rem(40);
      }
      &-title{
        font-size: $minInfoSize;
        margin-top: px2rem(6);
      }
    }
  }
</style>
