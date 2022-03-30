<template>
  <h1>Login</h1>
</template>

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

<style scoped lang='scss'></style>
