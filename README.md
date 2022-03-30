## Vue 3 + Typescript + Vite
  项目使用 Vue 3 + Typescript
  记录当前项目创建流程

### 项目初始化
参考 [Vite 官网](https://vitejs.cn/guide/#scaffolding-your-first-vite-project)

- 执行 `npm init vite@latest`
  - 选择 vue
  - vue + ts

  项目初始化后，在 src/ 下新建如下文件夹
  api  接口封装的模块
  assets  接口相关
  components  组件
  composables  封装的组合式API函数
  layout  布局组件
  plugins  注册给vue的插件(实例原型方法、全局指令等)
  router  路由
  store  vuex模块
  styles  全局样式
  utils  工具相关模块
  views  路由页面

### 代码规范和 ESlint
  vite 创建的项目默认没有集成 eslint
  当前没有提供可用的插件，可以手动添加 eslint 配置

#### 基础配置
  参考 [Eslint 官网](https://eslint.org/docs/user-guide/getting-started)
  安装 eslint
    `npm install eslint --save-dev`
  执行
   `npx eslint --init`

  - 个人选择
  ✔ How would you like to use ESLint? · style
  ✔ Which framework does your project use? · vue
  ✔ Does your project use TypeScript? · Yes
  ✔ Where does your code run? · browser
  ✔ How would you like to define a style for your project? · guide
  ✔ Which style guide do you want to follow? · airbnb
  ✔ What format do you want your config file to be in? · JavaScript
  ✔ Would you like to install them now with npm? · Yes

  - 添加脚本
  package.json
  ```js
  "scripts": {
    ...
    "lint": "eslint ./src/**/*.{vue,ts} --fix"
  }
  ```
  - 修改 eslint 配置
  参考 [eslint-plugin-vue](https://eslint.vuejs.org/user-guide/#usage) 中的 Bundle Configurations

  - vue3 规则配置
  ```js
  extends: [
    // 'plugin:vue/essential',
    'plugin:vue/vue3-strongly-recommended'
  ],
  ```

  - airbnb 规则配置
  .eslintrc.js
  ```js
  rules: {
    semi: ['error', 'never']
  }
  ```

#### 编辑器集成
在 vscode 中校验代码，起到辅助作用，提高编写效率
 - 如何显示不符合规范的错误提示
  1. 禁用 Vetur 插件
  2. 安装 Eslint 插件
    - 只要安装并启用了这个插件，它就会自动查找项目中的 eslint 配置规范，并且给出验证提示
    - 如何格式化？
      Eslint 提供了
      vscode => 设置 => 搜索Eslint
      修改Eslint ›
        Format: Enable ✔
        Eslint: Run onType (编写代码中校验)
  3. 安装 Volar 插件(当前叫做 Vue Language Features)

 - 如何按照项目中的 Eslint 规则要求进行格式化
  - 打开需要格式化的文件 => 右键 => 使用...格式化文档 => 配置默认格式化程序 => 选择 Eslint
  - 右键 => 格式化文档

#### 配置 commit 钩子
  添加 git Commit Hook，commit 时执行 lint 命令，校验代码格式，避免不符合规范的代码提交到远程仓库中

  参考 [lint-staged](https://github.com/okonet/lint-staged)
  - 安装 lint-staged
   `npx mrm@2 lint-staged`
    安装后可以在 package.json 中看到新增了两个依赖 husky 和 lint-staged
    - husky
      提供 git 子脚本的一个工具，拦截 git 操作，在 git 操作之前执行
    - lint-staged
      commit之前拿到暂存区里(git add后)的代码，以备 lint 验证

    脚本中会多个命令 {..."prepare": "husky install"}
      初始的时候会执行 husky install，把相应的钩子脚本初始化到 git 仓库内(本地)，此时在本地仓库中就有了 husky 的钩子
    > 如果不是初始化项目，需要手动添加该脚本，确保其他人在安装依赖时能够有 husky

  - 配置lint-staged
  package.json
  ```js
  "lint-staged": {
    "*.{js,jsx,vue,ts,tsx}": [
      "npm run lint",
      "git add"
    ]
  }
  ```

#### 在开发和构建的时候进行验证
  Vite 目前没有提供这样的插件，需要手动配置
  可以参照 [Vite 插件](https://vitejs.cn/guide/using-plugins.html) 进行配置

  - 这里使用第三方插件 [vite-plugin-eslint](https://github.com/gxmari007/vite-plugin-eslint)
  开箱即用
    - 安装
     `npm install vite-plugin-eslint --save-dev`
    - 配置
    vite.config.ts
    ```js
    ...
    import eslintPlugin from 'vite-plugin-eslint'
    plugins: [
      ...,
      eslintPlugin()
    ]
    ```

### GitCommit规范
相关规范描述 参考 [阮一峰 Commit message 和 Change log 编写指南](https://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)

规范 commit 格式
按照格式添加 commit，在某些情况下还可以自动生成版本差异文档
feat、fix可以出现在版本差异文档中

添加强制验证工具
参考[commitlint](https://github.com/conventional-changelog/commitlint)

- 安装
  `npm install --save-dev @commitlint/{config-conventional,cli}`

- 执行
  `echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js`

- 执行
  `npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'`

规范参考 [commitlint规范](https://github.com/conventional-changelog/commitlint/#what-is-commitlint)

- commit type must be one of
  - build: 和构建流程、持续集成等有关的改动
  - feat: feature - 所有实现新功能、新行为的 commit 都属这个类型
  - fix: 修复bug
  - docs: documentation - 对文档的改进，包括对外文档和代码注释
  - style: 对代码风格的修正（仅限缩进、空行一类的简单改动，对结构有影响的用 refactor）
  - refactor: 代码重构，没有加新功能或者修复bug
  - test: 与测试有关的改动，包括单元测试、集成测试等
  - chore: 构建过程或辅助工具的变动，比如改变构建流程、或者增加依赖库、工具等
  - perf: 优化相关，比如提升性能、体验
  - ci: 开发类，持续集成和部署脚本、设置或工具相关

### Vite 中的 TS 环境说明
  参考 [Vite-typescript](https://vitejs.cn/guide/features.html#typescript)

  配置
  tsconfig.json
  ```js
  "compilerOptions": {
    ...,
    "isolatedModules": true
  }
  ```

  项目内使用 .vue 文件，vue文件后缀名需要写上

### Vue3 中的 TS 支持
  参考[Vue3-typescript](https://v3.cn.vuejs.org/guide/typescript-support.html)

  - 在 .vue 文件中使用 ts
  1. lang=“ts”
  2. 要让 TypeScript 正确推断 Vue 组件选项中的类型，需要使用 defineComponent 全局方法定义组件

  - 在组合式 API 中使用
    - components/HelloWorld.vue
    ```ts
    import {
      ref, defineProps, onMounted, PropType
    } from 'vue'

    interface IUser {
      name: string,
      age: number
    }
    const props = defineProps({
      obj: {
        // PropType 转换 props 类型
        type: Object as PropType<IUser>,
        required: true
      }
    })

    const title = ref<HTMLTitleElement | null>(null)

    onMounted(() => {
      console.log(title.value)
    })

    ```

    - App.vue
    ```ts
    import { ref, onMounted } from 'vue'

    // InstanceType 运算类型
    const helloWorld = ref<InstanceType<typeof HelloWorld> | null>(null)
    onMounted(() => {
      console.log('helloWorld', helloWorld.value)
    })

    ```
### Vite 中的 script-setup 语法
组合式 API 语法糖: script-setup
可参考 [script-setup](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md)

```vue
<script setup lang="ts">
// setup 内容
</script>
```

```ts
import {
  defineEmits
} from 'vue'

// 自定义事件
const emit = defineEmits(['increment'])

const increment = () => {
  emit('increment')
}

```

> script-setup 支持顶层的 async 函数，在 script-setup 内可以直接使用 await
> script-setup 可以和 `<script></script>` 共存

### script-setup 中的编译宏
script-setup 中内置的有编译宏
包括 defineProps defineEmits defineExpose withDefaults
配置参考 [eslint-plugin-vue](https://eslint.vuejs.org/user-guide/#faq)

.eslintrc.js
```ts
env: {
  ...,
  'vue/setup-compiler-macros': true
}
```

或者

.eslintrc.js
```ts
globals: {
  defineProps: 'readonly',
  defineEmits: 'readonly',
  defineExpose: 'readonly',
  withDefaults: 'readonly'
}
```
### 配置转换 JSX 和 TSX
  使用 JS/TS 方式渲染页面，例如递归生成模版，使用JSX编程性更强
  > 建议: 大多数情况下建议使用 template

  参考 [vue3-jsx](https://v3.cn.vuejs.org/guide/render-function.html#jsx)

  [babel-plugin-jsx](https://github.com/vuejs/babel-plugin-jsx#installation)

  - Vite 创建的项目不能直接使用 JSX，需要配置才可以使用
  参考 [vite jsx](https://vitejs.cn/guide/features.html#jsx)

  插件参考 [vite plugin-vue-jsx](https://vitejs.cn/plugins/#vitejsplugin-vue-jsx)

  - 安装
    `npm install @vitejs/plugin-vue-jsx -D`

  - 配置
  vite.config.js
  ```ts
  import vueJsx from '@vitejs/plugin-vue-jsx'
  plugins: [
    ...,
    vueJsx()
  ]
  ```
  - 使用
    - 在 .vue 中使用 tsx
    TsxHelloWorld.vue
    ```vue
    <template>
      <h1>Hello World</h1>
      <abc />
    </template>

    <script lang='tsx' setup>
    const abc = <h1>Hello World</h1>
    </script>
    ```

    foo.tsx 直接导入到 .vue 文件中使用
    ```tsx
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
    ```


### 初始化 VueRouter
Vite 创建的项目默认没有集成 VueRouter，需要手动配置
参考 [VueRouter](https://router.vuejs.org/zh/introduction.html)
- 安装
  `npm install vue-router@4`
  `npm install eslint-import-resolver-typescript -D`
- 配置
router/index.ts
```ts
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/home/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(), // 路由模式
  routes // 路由规则
})

export default router
```

main.ts
```ts
import router from './router'
createApp(App)
  .use(router)
  .mount('#app')
```

views/home/index.vue
```vue
<template>
  <h1>Home</h1>
</template>

<script lang='ts' setup>

</script>

<style scoped lang='scss'></style>
```

views/login/index.vue
```vue
<template>
  <h1>Login</h1>
</template>

<script lang='ts' setup>

</script>

<style scoped lang='scss'></style>
```

App.vue
```vue
<template>
  <!-- 路由的渲染出口 -->
  <router-view />
</template>

<script lang='ts' setup>

</script>

<style scoped lang='scss'></style>
```

.eslintrc.js
```ts
rules: {
  ...,
  'import/no-unresolved': [2, { ignore: ['^@/'] }],
  'import/extensions': [
    2,
    'ignorePackages',
    {
      js: 'never',
      ts: 'never',
      tsx: 'never',
      json: 'never'
    }
  ],
  'vue/multi-word-component-names': 'off'
},
settings: {
  'import/resolver': {
    typescript: {}
  }
}
```

### 初始化 Vuex
Vite 创建的项目默认没有集成 Vuex
参考 [Vuex](https://vuex.vuejs.org/zh/index.html)
- 安装
  `npm install vuex@next --save`
- 配置
store/index.ts
```ts
import { createStore } from 'vuex'

// 创建一个新的 store 实例
const store = createStore({
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

export default store
```

main.ts
```ts
import store from './store'
createApp(App)
  .use(router)
  .use(store)
  .mount('#app')
```

views/home/index.vue
```vue
<template>
  <h1>Home</h1>
  <!-- <h1>{{ $store.state.count }}</h1> -->
  <h1>{{ store.state.count }}</h1>
</template>

<script lang='ts' setup>
import { useStore } from 'vuex'

const store = useStore()
console.log(store.state.count)

</script>

<style scoped lang='scss'></style>
```

- 类型问题
> Vuex4 依然没有很好的解决 TS 类型问题，官方宣称会在 Vuex5 中提供更好的方案
参考 [vuex typescript](https://vuex.vuejs.org/zh/guide/typescript-support.html)

  - 给 $store 添加类型声明
  新建文件 src/vuex.d.ts
  ```ts
  // vuex.d.ts
  /* eslint-disable no-unused-vars */
  import { ComponentCustomProperties } from 'vue'
  import { Store } from 'vuex'

  declare module '@vue/runtime-core' {
    // 声明自己的 store state
    interface State {
      count: number
    }

    // 为 `this.$store` 提供类型声明
    // eslint-disable-next-line no-shadow
    interface ComponentCustomProperties {
      $store: Store<State>
    }
  }
  ```

  views/home/index.vue
  ```vue
  <template>
    <h1>Home</h1>
    <h1>{{ $store.state.count }}</h1>
  </template>

  <script lang='ts' setup>

  </script>

  <style scoped lang='scss'></style>
  ```

  简化写法
  src/store/index.ts
  ```ts
  ...
  export interface IState {
    count: number
  }

  // 创建一个新的 store 实例
  const store = createStore<IState>({
    ...
  })

  ```

  src/vuex.d.ts
  ```ts
  ...
  import { IState } from './store'

  declare module '@vue/runtime-core' {
    ...
    interface ComponentCustomProperties {
      $store: Store<IState>
    }
  }
  ```

  - 给 useStore 添加类型声明
  首先，使用 Vue 的 InjectionKey 接口和自己的 store 类型定义来定义 key
  src/store/index.ts
  ```ts
  import { InjectionKey } from 'vue'
  import { createStore, Store } from 'vuex'
  // 为 store state 声明类型
  export interface IState {
    count: number
  }

  // 定义 injection key
  export const key: InjectionKey<Store<IState>> = Symbol('store')

  ...

  ```

  然后，将 store 安装到 Vue 应用时传入定义好的 injection key
  src/main.ts
  ```ts
  ...
  import { store, key } from './store'

  createApp(App)
  .use(router)
  .use(store, key)
  .mount('#app')
  ```

  views/home/index.vue
  ```vue
  <script lang='ts' setup>
  import { useStore } from 'vuex'
  import { key } from '@/store'

  const store = useStore(key)
  console.log(store.state.count)

  </script>
  ```

  简化 useStore 用法
  src/store/index.ts
  ```ts
  ...
  import { createStore, Store, useStore as baseUseStore } from 'vuex'

  ...
  // 定义自己的 `useStore` 组合式函数
  export function useStore() {
    return baseUseStore(key)
  }
  ```

  views/home/index.vue
  ```vue
  <script lang='ts' setup>
  import { useStore } from '@/store'

  const store = useStore()
  console.log(store.state.count)

  </script>
  ```

### 配置模块路径别名
  使用路径别名避免使用大量的相对路径
  Vite 中默认没有配置路径别名，使用时需要手动配置
  参考 [vite resolve-alias](https://vitejs.cn/config/#resolve-alias)

  vite.config.ts
  ```ts
  // eslint 报错
  // 安装(可以不安装) npm install -D @types/node
  // 在 tsconfig.node.json 中添加
  // "compilerOptions": {
  //   "allowSyntheticDefaultImports": true,
  // },
  import path from 'path'

  export default defineConfig({
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    ...
  })
  ```

  tsconfig.json
  ```ts
  "compilerOptions": {
    ...
    "baseUrl": "./",
    "paths": {
      "@/*": [
        "src/*" // 相对位置需要配置baseUrl才能识别，否则会报错
      ]
    }
  }
  ```

### css 样式管理

[vite Css](https://vitejs.cn/guide/features.html#css)

[vite Postcss](https://vitejs.cn/guide/features.html#postcss)

由于 Vite 的目标仅为现代浏览器，因此建议使用原生 CSS 变量和实现 CSSWG 草案的 PostCSS 插件（例如 postcss-nesting）来编写简单的、符合未来标准的 CSS。
[vite Css预处理器](https://vitejs.cn/guide/features.html#css-pre-processors)

> 建议使用 scss/sass
安装 `npm install -D sass`

Vite 为 Sass 和 Less 改进了 @import 解析，以保证 Vite 别名也能被使用。另外，url() 中的相对路径引用的，与根文件不同目录中的 Sass/Less 文件会自动变基以保证正确性。

> 常见的工作流程是，全局样式都写在 src/styles 目录下，每个页面自己对应的样式都写在自己的 .vue 文件中

- 使用示例
styles 文件夹下新建
  variables.scss 全局 Sass 变量
  common.scss 全局公共样式
  mixin.scss 全局 mixin, 工具函数
  transition.scss 全局过渡动画样式
  index.scss 组织统一导出

styles/index.scss
```scss
// 组织统一导出
@import './variables.scss';
@import './mixin.scss';
@import './transition.scss';
@import './common.scss';
```
main.ts
```ts
// 加载全局样式
// 只能加载非变量的样式
import './styles/index.scss'
```

- 使用样式变量
styles/variables.scss
```scss
// 全局 Sass 变量
$color: red;
```

views/home.index.vue
```vue
<style scoped lang='scss'>
@import '@/styles/variables.scss';

.box {
  width: 200px;
  height: 200px;
  color: $color;
  background: url('@/assets/logo.png');
}
</style>
```

利用构建工具自动注入到单文件组件中
[css-preprocessoroptions](https://vitejs.cn/config/#css-preprocessoroptions)

vite.config.ts
```ts
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: `$injectedColor: orange;`
        additionalData: '@import "@/styles/variables.scss";'
      }
    }
  }
})
```

views/home.index.vue
```vue
<style scoped lang='scss'>
.box {
  width: 200px;
  height: 200px;
  color: $color;
  background: url('@/assets/logo.png');
}
</style>
```

### 基于 axios 封装请求模块
参考 [axios](https://github.com/axios/axios)

- 安装 axios
  `npm install axios`

- 使用
utils/request.ts
```ts
import axios from 'axios'

const request = axios.create({
  // baseURL: 'http://localhost:3001'
  baseURL: 'https://shop.fed.lagounews.com'
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 统一设置用户身份
    console.log(config)
    return config
  },
  (error) => {
    // Do something with request error
    console.log(error)
    return Promise.reject(error)
  }
)

// Add a response interceptor
request.interceptors.response.use(
  (response) => {
    // 统一处理接口响应错误
    console.log(response)
    return response
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log(error)
    return Promise.reject(error)
  }
)

export default request
```

api/common.ts
```ts
/**
 * 公共基础请求模块
 */
import request from '@/utils/request'

// eslint-disable-next-line import/prefer-default-export
export const getLoginInfoService = () => request({
  method: 'GET',
  url: '/login/info'
})
```
views/login/index.vue
```vue
<script lang='ts' setup>
import { getLoginInfoService } from '@/api/common'
import { onMounted } from 'vue'

onMounted(() => {
  getLoginInfoService().then((res) => {
    // res: axios包装的响应对象，data、status
    // res.data: 后端真实返回的数据
    // res.data 时没有智能提示
    console.log(res)
  })
})
</script>
```

### 关于接口类型
#### 基本处理

api/common.ts
```ts
export const getLoginInfoService = () => request.get<{
  code: number
  data: {
    login_logo: string
  }
  message: string
}>('/login/info')
```

views/login/index.vue
```vue
<script lang='ts' setup>
...
onMounted(() => {
  getLoginInfoService().then((res) => {
    // res.data. 时有智能提示
    console.log(res.data.message)
  })
})
</script>
```

再次封装
api/common.ts
```ts
interface ResponseData<T = any> {
  code: number
  message: string
  data: T
}

// eslint-disable-next-line import/prefer-default-export
export const getLoginInfoService = () => request.get<ResponseData<{
  login_logo: string
}>>('/login/info')
```

#### 封装泛型请求方法
- request 不支持泛型
- request.get post put 支持响应数据泛型，由于后端又包装了一层自定义的数据，导致访问数据比较麻烦
- 所以自己封装了一个 request

api/common.ts
```ts
interface ResponseData<T = any> {
  code: number
  message: string
  data: T
}

// eslint-disable-next-line import/prefer-default-export
export const getLoginInfoService = () => request.get<ResponseData<{
  login_logo: string
}>>('/login/info').then(res => res.data.data)
```

views/login/index.vue
```vue
<script lang='ts' setup>
onMounted(() => {
  getLoginInfoService().then(data => {
    console.log(data.login_logo)
  })
})
</script>
```

再次封装
utils/request.ts
```ts
import axios, { AxiosRequestConfig } from 'axios'
...
interface ResponseData<T = any> {
  code: number
  message: string
  data: T
}

export default <T = any>(config: AxiosRequestConfig) => request(config)
  .then(res => res.data as ResponseData<T>)
```

api/common.ts
```ts
export const getLoginInfoService = () => request<{
  login_logo: string
}>({
  method: 'GET',
  url: '/login/info'
})
```

#### 提取接口类型模块
提取接口类型，方便类型重用

接口命名建议以 I 开头
api/types/common.ts
```ts
export interface ILoginInfo {
  login_logo: string
}

```

api/common.ts
```ts
import { ILoginInfo } from './types/common'

// eslint-disable-next-line import/prefer-default-export
export const getLoginInfoService = () => request<ILoginInfo>({
  method: 'GET',
  url: '/login/info'
}).then(res => res.data)
```

views/login/index.vue
```vue
<script lang='ts' setup>
import { getLoginInfoService } from '@/api/common'
// 引入类型需要加 type 说明
import type { ILoginInfo } from '@/api/types/common'
import { onMounted, ref } from 'vue'

const userInfo = ref<ILoginInfo | null>(null)

onMounted(() => {
  getLoginInfoService().then(data => {
    console.log(data)
    userInfo.value = data
  })
})
</script>
```

### 环境变量和模式
开发、测试、预发、生产等不同的环境会有不同的变量
根据不同环境需要对这些变量进行配置

参考 [环境变量和模式](https://vitejs.cn/guide/env-and-mode.html)
Vite 在一个特殊的 import.meta.env 对象上暴露环境变量。这里有一些在所有情况下都可以使用的内建变量：

- import.meta.env.MODE: {string} 应用运行的模式。

- import.meta.env.BASE_URL: {string} 部署应用时的基本 URL。他由base 配置项决定。

- import.meta.env.PROD: {boolean} 应用是否运行在生产环境。

- import.meta.env.DEV: {boolean} 应用是否运行在开发环境 (永远与 import.meta.env.PROD相反)。

使用 .env 文件 进行配置
加载的环境变量也会通过 import.meta.env 暴露给客户端源码。
Vite 使用 dotenv 从你的 环境目录 中的下列文件加载额外的环境变量：
```ts
.env                # 所有情况下都会加载
.env.local          # 所有情况下都会加载，但会被 git 忽略
.env.development    # 开发模式下加载(执行 vite dev 时，会自动加载)
.env.production     # 生产模式下加载(执行 vite build 时，会自动加载)
.env.[mode]         # 只在指定模式下加载
.env.[mode].local   # 只在指定模式下加载，但会被 git 忽略
```

为了防止意外地将一些环境变量泄漏到客户端，只有以 VITE_ 为前缀的变量才会暴露给经过 vite 处理的代码。例如下面这个文件中：

```ts
DB_PASSWORD=foobar
VITE_SOME_KEY=123
```
只有 VITE_SOME_KEY 会被暴露为 import.meta.env.VITE_SOME_KEY 提供给客户端源码，而 DB_PASSWORD 则不会。

- 示例
新建文件 .env  .env.local .env.development .env.production

.env.development
```ts
# 开发模式下加载(执行 vite dev 时，会自动加载)
VITE_API_BASEURL=http://localhost:3001
```

env.d.ts
```ts
interface ImportMetaEnv {
  readonly VITE_API_BASEURL: string
  readonly VITE_API_PROJECTNAME: string
  // 更多环境变量...
}
```

utils/request.ts
```ts
const request = axios.create({
  // baseURL: 'http://localhost:3001'
  baseURL: import.meta.env.VITE_API_BASEURL
})

```

环境变量文件全部放到外面看起来有些多，不便于区分环境，可以配置到一个文件夹里面，便于管理
参考 [envDir](https://vitejs.cn/config/#envdir)

配置 envDir
- 新建 environment 文件夹，将上面创建的 环境变量文件挪进去
vite.config.ts
```ts
export default defineConfig({
  envDir: path.resolve(__dirname, 'environment')
})
```

### 关于跨域
CORS 全称为 Cross Origin Resource Sharing（跨域资源共享）。这种方案对于前端来说没有什么工作量，和正常发送请求写法上没有任何区别，工作量基本都在后端（其实也没啥工作量，就是配置一些 HTTP 协议）。

- 开发环境
  - 在服务端配置 CORS
  - 配置开发服务器代理，比如 [vite-server.proxy](https://www.yuque.com/r/goto?url=https%3A%2F%2Fcn.vitejs.dev%2Fconfig%2F%23server-proxy)
- 生产环境
  - 在服务端配置 CORS
  - 配置生产服务器代理，比如 nginx

> 在开发模式下可以下使用开发服务器的 proxy 功能，比如 [vite-server.proxy](https://www.yuque.com/r/goto?url=https%3A%2F%2Fcn.vitejs.dev%2Fconfig%2F%23server-proxy)
> 但这种方法在生产环境是不能使用的。在生产环境中需要配置生产服务器（比如 nginx、Apache 等）进行反向代理。在本地服务和生产服务配置代理的原理都是一样的，通过搭建一个中转服务器来转发请求规避跨域的问题。

vite.config.ts
```ts
export default defineConfig({
  server: {
    proxy: {
      // 字符串简写写法
      // '/foo/123': 'http://localhost:4567/foo/123',
      '/foo': 'http://localhost:4567/foo',
      // 选项写法
      '/api': {
        target: 'http://jsonplaceholder.typicode.com', // 代理的目标地址

        // changeOrigin 兼容基于名字的虚拟主机
        // a.com localhost:xxx
        // b.com localhost:xxx
        // HTTP 请求头部的 origin 字段
        // 我们在开发模式: 默认的 origin 是真实的 origin: localhost:3000
        // changeOrigin: true, 代理服务会把 origin 修改为目标地址 http://jsonplaceholder.typicode.com
        changeOrigin: true,

        // rewrite 路径重写
        // http://jsonplaceholder.typicode.com/api/xxx
        // /api/xxx => http://jsonplaceholder.typicode.com/api/xxx
        // 可以不设置 rewrite
        // /api/xxx => http://jsonplaceholder.typicode.com/xxx
        // apiPath.replace(/^\/api/, '')
        rewrite: apiPath => apiPath.replace(/^\/api/, '')
      }
    }
  }
})
```

environment/.env.development
```ts
# 开发模式下加载(执行 vite dev 时，会自动加载)
# VITE_API_BASEURL=http://localhost:3001
VITE_API_BASEURL=/api
```

tsconfig.json 注释
```ts
{
  "compilerOptions": {
    "target": "esnext", // 编译目标ES版本
    "useDefineForClassFields": true,
    "module": "esnext", // 编译目标模块系统
    "moduleResolution": "node", // 模块解析策略
    "strict": true, // 严格模式开关 等价于noImplicitAny、strictNullChecks、strictFunctionTypes、strictBindCallApply等设置true
    "jsx": "preserve",
    "sourceMap": true,
    "resolveJsonModule": true,
    "esModuleInterop": true, // 许编译生成文件时，在代码中注入工具类(__importDefault、__importStar)对ESM与commonjs混用情况做兼容处理
    "lib": ["esnext", "dom"], // 编译过程中需要引入的库文件列表
    "isolatedModules": true,
    "allowSyntheticDefaultImports": false, // 允许从没有设置默认导出的模块中默认导入，仅用于提示，不影响编译结果
    "baseUrl": "./",
    "paths": {
      "@/*": [
        "src/*" // 相对位置需要配置baseUrl才能识别，否则会报错
      ]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```
