<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-24 22:23:57
 * @LastEditTime: 2019-10-17 14:21:41
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="main">
    <keep-alive>
      <component :is="currentComponent"></component>
    </keep-alive>
    <tool-bar ref="toolbar" @changeTab="changeTab"></tool-bar>
  </div>
</template>

<script>
export default {
  name: 'mainPage',
  components: {
    'tool-bar': () => import('@components/common/ToolBar'),
    'home': () => import('@components/Home'),
    'shopping': () => import('@components/Shopping'),
    'my': () => import('@components/My')
  },
  data () {
    return {
      currentComponent: 'home'
    }
  },
  activated () {
    this.pushFragment()
  },
  methods: {
    changeTab (componentName) {
      this.currentComponent = componentName
    },
    pushFragment () {
      let componentIndex = this.$router.params.componentIndex
      if (componentIndex === undefined) return
      /**
       * 通过toolbar切换对应的组件
       */
      this.$refs.toolbar.changeTab(componentIndex)
    }
  }
}
</script>

<style lang="scss" scoped>
  .main{
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
