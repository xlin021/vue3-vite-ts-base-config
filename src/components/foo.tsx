// 直接导出
// export default () => (
//   <div>
//     <h1>foo 组件</h1>
//   </div>
// )

// 获取状态
import { defineComponent, ref } from 'vue'

interface PropsType {
  msg: string
}

// setup 语法
export default defineComponent({
  props: {
    msg: {
      type: String,
      default: 'msg2'
    }
  },
  setup() {
    const count = ref(10)
    return (props: PropsType) => (
      <div>
        <h1>foo 组件msg{props.msg}</h1>
        <h1>foo 组件count{count.value}</h1>
      </div>
    )
  }
})

// export default defineComponent({
//   props: {
//     msg: {
//       type: String,
//       default: 'msg2'
//     }
//   },
//   data() {
//     return {
//       count: 10
//     }
//   },
//   render() {
//     return (
//       <div>
//         <h1>foo 组件msg{this.msg}</h1>
//         <h1>foo 组件count{this.count}</h1>
//       </div>
//     )
//   }
// })
