<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-16 23:20:26
 * @LastEditTime: 2019-10-18 15:37:26
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="login-page">
    <navigation-bar pageName="登录" @onLeftClick="onBackClick"></navigation-bar>
    <div class="login-page-content">
      <div class="input-container">
        <input type="text" v-model="username" placeholder="用户名">
      </div>
      <div class="input-container">
        <input type="password" v-model="password" placeholder="密码">
      </div>
      <div class="login-page-content-login page-commit" @click="onLoginClick">
        登录
      </div>
      <a class="login-page-content-register" @click="onToRegisterClick">注册</a>
    </div>
  </div>
</template>

<script>
import NavigationBar from '@components/common/NavigationBar'
import md5 from '@js/md5.js'

export default {
  name: 'login',
  components: {
    NavigationBar
  },
  data () {
    return {
      username: '',
      password: '',
      md5Password: ''
    }
  },
  methods: {
    onBackClick () {
      this.$router.go(-1)
    },
    onLoginClick () {
      if (this.username.length === 0 || this.password.length === 0) {
        alert('用户名或密码不能为空!')
      }
      // 与原生交互
      this.md5Password = md5(this.password)
      if (window.androidJSBridge) {
        this.onLoginToAndroid()
      } else if (window.webkit) {
        this.onLoginToIos()
      }
    },
    onToRegisterClick () {
      this.$router.push({
        name: 'register',
        params: {
          routerType: 'push'
        }
      })
    },
    onLoginToAndroid () {
      let userJson = JSON.stringify({
        'username': this.username,
        'password': this.md5Password
      })
      let result = window.androidJSBridge.login(userJson)
      this.onLoginCallback(result)
    },
    onLoginToIos () {
      let userObj = {
        'username': this.username,
        'password': this.md5Password
      }
      window.loginCallback = this.onLoginCallback
      window.webkit.messageHandlers.login.postMessage(userObj)
    },
    onLoginCallback (result) {
      switch (result) {
        case '-1':
          alert('系统内部出错')
          break
        case '0':
          // 保存主动登录的用户名到vuex
          this.$store.commit('setUsername', this.username)
          this.onBackClick()
          break
        case '1':
          alert('用户不存在')
          break
        case '2':
          alert('密码错误')
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@css/style.scss';

  .login-page{
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: #fff;
    &-content{
      width: 100%;
      height: 100%;
      &-login{
        margin-top: 40%;
      }
      &-register{
        font-size: $infoSize;
        color: $hintColor;
        margin-top: $marginSize;
        padding: $marginSize;
        float: right;
      }
    }
  }
</style>
