import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    shoppingDatas: [],
    isIphoneX: false,
    username: undefined
  },
  mutations: {
    addShoppingData (state, goods) {
      /**
       * 为商品新增属性
       * ischeck是否被选中
       * number商品数量
       */
      let isExist = state.shoppingDatas.some(item => {
        if (item.id === goods.id) {
          item.number += 1
          return true
        }
      })
      if (!isExist) {
        Vue.set(goods, 'isCheck', false)
        Vue.set(goods, 'number', 1)
        state.shoppingDatas.push(goods)
      }
    },
    changeShoppingDataNumber (state, data) {
      // index用于获取指定的商品从而更改该商品的数量
      state.shoppingDatas[data.index].number = data.number
    },
    setIsIphoneX (state, isIphoneX) {
      state.isIphoneX = isIphoneX
    },
    setUsername (state, username) {
      state.username = username
    },
    clearUsername (state) {
      state.username = undefined
    }
  },
  actions: {

  }
})
