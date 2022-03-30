// import { createStore } from 'vuex'

// // 创建一个新的 store 实例
// const store = createStore({
//   state() {
//     return {
//       count: 0
//     }
//   },
//   mutations: {
//     increment(state) {
//       // eslint-disable-next-line no-param-reassign
//       state.count += 1
//     }
//   }
// })

// export default store

import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'

// 为 store state 声明类型
export interface IState {
  count: number
}

// 定义 injection key
export const key: InjectionKey<Store<IState>> = Symbol('store')

// 创建一个新的 store 实例
export const store = createStore<IState>({
  state() {
    return {
      count: 0
    }
  },
  mutations: {
    increment(state) {
      // eslint-disable-next-line no-param-reassign
      state.count += 1
    }
  }
})

// 定义自己的 `useStore` 组合式函数
export function useStore() {
  return baseUseStore(key)
}
