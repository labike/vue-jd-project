<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-25 21:10:00
 * @LastEditTime: 2019-09-26 09:25:13
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="activity">
    <!--通过插槽展示需要展示的内容-->
    <slot></slot>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
  @import '@css/style.scss';

  .activity{
    max-height: px2rem(160);
    position: relative;
    z-index: 2;
  }
</style>
