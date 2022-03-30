/// <reference types="vite/client" />

// eslint-disable-next-line no-unused-vars
interface ImportMetaEnv {
  readonly VITE_API_BASEURL: string
  readonly VITE_API_PROJECTNAME: string
  // 更多环境变量...
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
