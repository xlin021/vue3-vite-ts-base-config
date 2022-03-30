<template>
  <h1>Login</h1>
</template>

<script lang='ts' setup>
import { getLoginInfoService } from '@/api/common'
import { onMounted } from 'vue'

onMounted(() => {
  getLoginInfoService().then((res) => {
    // res.data 时有智能提示
    console.log(res.data.data.login_logo)
  })
})
</script>

<style scoped lang='scss'></style>
