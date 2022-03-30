// vuex.d.ts
/* eslint-disable no-unused-vars */
import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'
import { IState } from './store'

declare module '@vue/runtime-core' {
  // 声明自己的 store state
  // interface State {
  //   count: number
  // }

  // 为 `this.$store` 提供类型声明
  // eslint-disable-next-line no-shadow
  interface ComponentCustomProperties {
    $store: Store<IState>
  }
}
