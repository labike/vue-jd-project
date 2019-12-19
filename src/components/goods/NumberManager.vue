<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-16 22:21:23
 * @LastEditTime: 2019-10-17 09:48:45
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="number-manager">
    <span :class="{'number-manager-disabled' : number === 1}" class="number-manager-less" @click="onLessClick">-</span>
    <span class="number-manager-number">{{number}}</span>
    <span class="number-manager-add" @click="onAddClick">+</span>
  </div>
</template>

<script>
export default {
  props: {
    defaultNumber: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      number: 1
    }
  },
  methods: {
    onLessClick () {
      if (this.number === 1) {
        return
      }
      this.number -= 1
    },
    onAddClick () {
      this.number += 1
    }
  },
  watch: {
    defaultNumber (newVal) {
      this.number = newVal
    },
    number (newVal) {
      this.$emit('onchangeNumber', newVal)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@css/style.scss';

  .number-manager{
    display: flex;
    font-size: $infoSize;
    height: px2rem(20);
    line-height: px2rem(20);
    span{
      width: px2rem(30);
      text-align: center;
      display: inline-block;
      font-weight: 500;
    }
    &-number{
      background-color: $bgColor;
      padding: 0 px2rem(4);
    }
    &-disabled{
      color: $hintColor;
    }
  }
</style>
