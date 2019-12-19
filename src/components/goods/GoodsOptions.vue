<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-02 09:46:54
 * @LastEditTime: 2019-10-10 09:50:50
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="goods-options z-index-2">
    <ul class="goods-options-list">
      <li class="goods-options-list-item" v-for="(item, index) in optionsDatas" :key="index">
        <a class="goods-options-list-item-content" @click="onOptionsItemClick(item, index)">
          <span class="goods-options-list-item-content-name" :class="{'goods-options-list-item-content-name-active' : selectOptions.id === item.id}">{{item.name}}</span>
          <span class="goods-options-list-item-content-caret caret" v-if="item.subs.length > 0" :class="[isShowSubContent && selectOptions.id === item.id ? 'goods-options-list-item-content-caret-open' : 'goods-options-list-item-content-caret-close']"></span>
        </a>
      </li>
    </ul>
    <transition name="fold-height">
      <div class="options-sub-content z-index-2" v-show="isShowSubContent">
        <ul class="options-sub-content-list">
          <li class="options-sub-content-list-item" v-for="(item, index) in selectOptions.subs" :key="index">
            <a class="options-sub-content-list-item-content" @click="onSubOptionsItemClick(item, index)">
              <span class="options-sub-content-list-item-content-name" :class="{'options-sub-content-list-item-content-name-active' : selectOptions.id === item.id}">
                {{item.name}}
              </span>
              <img class="options-sub-content-list-item-content-select" src="@images/options-select.svg" alt="" v-show="selectOptions.id === item.id">
            </a>
          </li>
        </ul>
      </div>
    </transition>
    <div class="cover" v-show="isShowSubContent" @click="isShowSubContent = false"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      optionsDatas: [
        {
          id: '1',
          name: '默认',
          subs: [
            {
              id: '1',
              name: '默认'
            },
            {
              id: '1-2',
              name: '价格由高到低'
            },
            {
              id: '1-3',
              name: '销量由高到低'
            }
          ]
        },
        {
          id: '2',
          name: '有货优先',
          subs: []
        },
        {
          id: '3',
          name: '直营优先',
          subs: []
        }
      ],
      // 当前选中的
      selectOptions: {},
      // 标记子选项是否为展开
      isShowSubContent: false
    }
  },
  created () {
    this.selectOptions = this.optionsDatas[0]
  },
  methods: {
    /**
     * 1. 如果自选项打开则关闭
     * 2. 如果包含子选项并且当前item处于选中状态下的时候则展示子选项
     * 3. 设置选中项为用户点击的item
     */
    onOptionsItemClick (item, index) {
      if (this.isShowSubContent) {
        this.isShowSubContent = false
        return
      }
      if (item.subs.length > 0 && this.selectOptions.id === item.id) {
        this.isShowSubContent = true
      }
      this.selectOptions = item
    },
    /**
     * 1. 设置选中项为用户点击的选项
     * 2. 将选中项置顶到一级选项
     * 3. 关闭选中项
     */
    onSubOptionsItemClick (item, index) {
      this.selectOptions = item
      this.optionsDatas.map(options => {
        options.subs.map(subOptions => {
          if (subOptions.id === this.selectOptions.id) {
            options.id = subOptions.id
            options.name = subOptions.name
          }
        })
      })
      this.isShowSubContent = false
    }
  },
  watch: {
    /**
     * 监听筛选项改变
     */
    selectOptions (newVal) {
      this.$emit('optionChange', newVal.id)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@css/style.scss';

  .goods-options{
    width: 100%;
    border-bottom: 1px solid $lineColor;
    &-list{
      display: flex;
      width: 100%;
      height: px2rem(46);
      background-color: #fff;
      &-item{
        flex-grow: 1;
        &-content{
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          &-name{
            font-size: $infoSize;
            margin-right: $marginSize;
            color: $hintColor;
            &-active{
              color: $mainColor;
            }
          }
          // 三角形动画
          &-caret{
            &-open{
              transform: rotate(180deg);
              transition: all .3s;
            }
            &-close{
              transform: rotate(0);
              transition: all .3s;
            }
          }
        }
      }
    }
    .options-sub-content{
      position: absolute;
      width: 100%;
      max-height: px2rem(180);
      overflow: hidden;
      overflow-y: auto;
      background-color: #fff;
      &-list{
        &-item{
          &-content{
            display: flex;
            align-items: center;
            border-top: 1px solid $lineColor;
            padding: $marginSize;
            height: px2rem(44);
            box-sizing: border-box;
            text-decoration: none;
            color: $hintColor;
            &-name{
              font-size: $infoSize;
              display: inline-block;
              flex-grow: 1;
              &-active{
                color: $mainColor;
              }
            }
            &-select{
              width: px2rem(18);
              height: px2rem(18);
            }
          }
        }
      }
    }
    // 子选项内容展开时动画 v-if=true
    .fold-height-enter-active{
      animation-duration: .3s;
      animation-name: fold-height-open;
    }
    @keyframes fold-height-open {
      0%{
        max-height: 0;
      }
      100%{
        max-height: px2rem(180);
      }
    }
    // 关闭
    fold-height-leave-active{
      animation-duration: .3s;
      animation-delay: fold-height-close;
    }
    @keyframes fold-height-close {
      0%{
        max-height: px2rem(180);
      }
      100%{
        max-height: 0;
      }
    }
  }
</style>
