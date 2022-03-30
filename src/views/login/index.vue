<template>
  <h1>Login</h1>
</template>

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

<style scoped lang='scss'></style>
