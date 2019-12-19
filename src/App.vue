<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-24 09:16:58
 * @LastEditTime: 2019-10-17 21:53:37
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div id="app">
    <!--页面过度效果, 监听路由对象$router, 通过判断是否携带params-->
    <transition :name='transitionName'>
      <keep-alive :include="virtualTaskStack">
        <router-view/>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      transitionName: 'fold-left',
      virtualTaskStack: [
        'shop'
      ]
    }
  },
  watch: {
    '$router' (to, from) {
      // 获取params
      const routerType = to.params.routerType
      if (routerType === 'push') {
        this.virtualTaskStack.push(to.name)
        this.transitionName = 'fold-left'
      } else {
        this.virtualTaskStack.pop()
        this.transitionName = 'fold-right'
      }
      if (to.params.clearTask) {
        this.virtualTaskStack = ['shop']
      }
    }
  },
  created () {
    this.$store.commit('setIsIphoneX', window.isIphoneX)
    // native主动调用的方法
    window.nativeFunctionUserLogin = this.nativeFunctionUserLogin
  },
  methods: {
    nativeFunctionUserLogin (username) {
      // 保存当前自动登录的用户名到vuex
      this.$store.commit('setUsername', username)
    }
  }
}
</script>

<style lang="scss">
@import '@css/style.scss';

#app{
  width: 100%;
  height: 100%;
  // 跳转
  .fold-left-enter-active{
    animation-name: fold-left-in;
    animation-duration: .4s;
    -moz-animation-duration: .4s;
  }
  @keyframes fold-left-in {
    0%{
      transform: translate(100%, 0);
    }
    100%{
      transform: translate(0, 0);
    }
  }
  // 后退即将展示
  .fold-left-leave-active{
    animation-name: fold-left-out;
    animation-duration: .4s;
    -moz-animation-duration: .4s;
  }
  @keyframes fold-left-out {
    0%{
      transform: translate(0, 0);
    }
    100%{
      transform: translate(-100%, 0);
    }
  }
  // 后退页面动画
  .fold-right-enter-active{
    animation-name: fold-right-in;
    animation-duration: .4s;
    -moz-animation-duration: .4s;
  }
  @keyframes fold-right-in {
    0%{
      transform: translate(-100%, 0);
    }
    100%{
      transform: translate(0, 0);
    }
  }
  // 后退完成
  .fold-right-leave-active{
    animation-name: fold-right-out;
    animation-duration: .4s;
    -moz-animation-duration: .4s;
  }
  @keyframes fold-right-out {
    0%{
      transform: translate(0, 0);
    }
    100%{
      transform: translate(100%, 0);
    }
  }
}
</style>
