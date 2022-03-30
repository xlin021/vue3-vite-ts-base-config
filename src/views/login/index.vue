<template>
  <h1>Login</h1>
</template>

<script lang='ts' setup>
import { getLoginInfoService } from '@/api/common'
import { onMounted } from 'vue'

onMounted(() => {
  getLoginInfoService().then(data => {
    // console.log(res.data.data.login_logo)
    console.log(data.message)
  })
})
</script>

<style scoped lang='scss'></style>
