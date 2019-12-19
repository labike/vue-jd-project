<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-25 09:50:39
 * @LastEditTime: 2019-10-17 09:43:44
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="my">
    <navigation-bar :pageName="我的"></navigation-bar>
    <div class="my-content">
      <div class="my-content-header" @click="onLoginClick">
        <img class="my-content-header-avatar" src="@images/avatar.png" alt="">
        <p class="my-content-header-login">{{$store.state.username ? $store.state.username : '登录/注册'}}</p>
      </div>
      <div class="my-content-tools">
        <div class="my-content-tools-item" v-for="(item, index) in toolsData" :key="index">
          <p class="my-content-tools-item-name">{{item}}</p>
          <img src="@images/right-arrow.svg" alt="">
        </div>
      </div>
      <div class="my-content-logout page-commit" v-if="$store.state.username" @click="onLogoutClick">
        退出登录
      </div>
    </div>
  </div>
</template>

<script>
import NavigationBar from '@components/common/NavigationBar.vue'

export default {
  components: {
    NavigationBar
  },
  data () {
    return {
      toolsData: [
        '全部订单',
        '我的预约',
        '应用推荐',
        '用户福利'
      ]
    }
  },
  methods: {
    onLoginClick () {
      this.$router.push({
        name: 'login',
        params: {
          routerType: 'push'
        }
      })
    },
    onLogoutClick () {
      if (window.androidJSBrideg) {
        this.onLogoutToAndroid()
      } else if (window.webkit) {
        this.onLogoutToIos()
      }
    },
    onLogoutToAndroid () {
      let result = window.androidJSBrideg.logout()
      this.onLogoutCallback(result)
    },
    onLogoutToIos () {
      window.logoutCallBack = this.onLogoutCallback
      window.webkit.messageHandlers.logout.postMessage({})
    },
    onLogoutCallback (result) {
      if (result) {
        this.$store.commit('clearUsername')
        alert('退出成功')
      } else {
        alert('操作失败, 请重试')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@css/style.scss';

  .my{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: $bgColor;
    &-content{
      height: 100%;
      width: 100%;
      &-heaader{
        margin-top: $marginSize;
        background-color: #fff;
        height: px2rem(68);
        display: flex;
        align-items: center;
        border-top: 1px solid $lineColor;
        border-bottom: 1px solid $lineColor;
        padding: $marginSize;
        &-avatar{
          width: px2rem(52);
          height: px2rem(52);
        }
        &-login{
          margin-left: $marginSize;
          font-size: $titleSize;
        }
      }
      &-tools{
        &-item{
          display: flex;
          height: px2rem(46);
          box-sizing: border-box;
          align-items: center;
          padding: $marginSize;
          background-color: #fff;
          border-bottom: 1px solid $lineColor;
          &-name{
            font-size: $infoSize;
            flex-grow: 1;
          }
          &-arrow{
            width: px2rem(16);
          }
        }
      }
      &-logout{
        margin-top: 20%;
      }
    }
  }
</style>
