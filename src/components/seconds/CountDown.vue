<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-26 21:29:56
 * @LastEditTime: 2019-09-27 09:19:53
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="count-down">
    <span class="count-down-end-time">{{endHours}}点场</span>
    <span class="count-down-surplus">{{surplus | filterTime}}</span>
  </div>
</template>

<script>
export default {
  props: {
    endHours: {
      type: Number,
      required: true,
      default: 0
    }
  },
  data () {
    return {
      surplus: '',
      diffSeconds: 0,
      interval: undefined
    }
  },
  created () {
    this.componentSurplusTime()
  },
  methods: {
    componentSurplusTime () {
      if (this.interval) {
        clearInterval(this.interval)
      }
      const date = new Date()
      if (date.getHours() > this.endHours) {
        this.surplus = '活动已结束'
        return
      }
      if (date.getHours() === this.endHours) {
        this.surplus = '活动进行中'
        return
      }
      // 距离多长时间开始
      const diffHours = this.endHours - date.getHours() - 1
      const diffMinutes = 60 - date.getMinutes() - 1
      const diffSeconds = 60 - date.getSeconds()
      // 总秒数
      this.diffSeconds = diffHours * 3600 + diffMinutes * 60 + diffSeconds
      this.interval = setInterval(() => {
        this.diffSeconds -= 1
      }, 1000)
    }
  },
  watch: {
    diffSeconds (newValue) {
      const hours = Math.floor(newValue / 3600)
      const minutes = Math.floor(newValue / 60) % 60
      const seconds = newValue % 60
      this.surplus = hours + ':' + minutes + ':' + seconds
      if (newValue === 0) {
        this.componentSurplusTime()
      }
    },
    endHours () {
      this.componentSurplusTime()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@css/style.scss';

  .count-down{
    display: inline-block;
    font-size: $infoSize;
    margin-left: $marginSize;
    span{
      display: inline-block;
      padding: px2rem(2) px2rem(4);
    }
    &-end-time{
      background-color: $mainColor;
      border-top-left-radius: px2rem(4);
      border-bottom-left-radius: px2rem(4);
      border: 1px solid $mainColor;
      color: #fff;
    }
    &-surplus{
      background-color: #fff;
      border-top-right-radius: px2rem(4);
      border-bottom-right-radius: px2rem(4);
      border: 1px solid $mainColor;
      color: $mainColor;
    }
  }
</style>
