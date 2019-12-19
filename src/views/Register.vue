<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-16 23:20:31
 * @LastEditTime: 2019-10-18 16:34:57
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="register-page">
    <navigation-bar pageName="注册" @onLeftClick="onBackClick"></navigation-bar>
    <div class="register-page-content">
      <div class="input-container">
        <input type="text" v-model="username" placeholder="用户名">
      </div>
      <div class="input-container">
        <input type="password" v-model="password" placeholder="密码">
      </div>
      <div class="input-container">
        <input type="password" v-model="confirmPassword" placeholder="确认密码">
      </div>
      <div onClick="onRegisterClick" class="register-page-content-register page-commit">
        注册
      </div>
    </div>
  </div>
</template>

<script>
import NavigationBar from '@components/common/NavigationBar'
import md5 from '@js/md5.js'

export default {
  name: 'register',
  components: {
    NavigationBar
  },
  data () {
    return {
      username: '',
      password: '',
      confirmPassword: '',
      md5Password: ''
    }
  },
  methods: {
    onBackClick () {
      this.$router.go(-1)
    },
    onRegisterClick () {
      if (this.username.length === 0) {
        alert('用户名不能为空')
      }
      if (this.password.length === 0 || this.password !== this.confirmPassword) {
        alert('两次密码输入不一致')
      }
      // 与原生交互
      this.md5Password = md5(this.password)
      if (window.androidJSBridge) {
        // window下存在android注入的对象
        this.onRegisterToAndroid()
      } else if (window.webkit) {
        this.onRegisterToIos()
      }
    },
    onRegisterToAndroid () {
      // android只能接收基本类型
      let userJson = JSON.stringify({
        'username': this.username,
        'password': this.md5Password
      })
      let result = window.androidJSBridge.register(userJson)
      this.onRegisterCallback(result)
    },
    onRegisterToIos () {
      // ios可直接接收对象类型, 不能直接返回返回值
      // 所以ios操作完成之后会调用对应的回调方法
      // 同时原生调用js的方法只能使用调用绑定到window对象中的方法
      let userObj = {
        'username': this.username,
        'password': this.md5Password
      }
      window.registerCallback = this.onRegisterCallback
      window.webkit.messageHandlers.register.postMessage(userObj)
    },
    onRegisterCallback (result) {
      if (result) {
        alert('注册成功')
      } else {
        alert('注册失败')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .register-page{
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: #fff;
    &-content{
      width: 100%;
      height: 100%;
      &-register{
        margin-top: 40%;
      }
    }
  }
</style>
