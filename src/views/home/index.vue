<template>
  <h1>Home</h1>
  <!-- <h1>{{ $store.state.count }}</h1> -->
  <h1>{{ store.state.count }}</h1>
  <img src="@/assets/logo.png">
  <div class="box" />
</template>

<script lang='ts' setup>
import { useStore } from '@/store'

const store = useStore()
console.log(store.state.count)

</script>

<style scoped lang='css'>
.box {
  width: 200px;
  height: 200px;
  background: url('@/assets/logo.png');
}
</style>
