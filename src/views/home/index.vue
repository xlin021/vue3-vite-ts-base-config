<template>
  <h1>Home</h1>
  <!-- <h1>{{ $store.state.count }}</h1> -->
  <h1>{{ store.state.count }}</h1>
  <img src="@/assets/logo.png">
  <div class="box">
    Test
  </div>
</template>

<script lang='ts' setup>
import { useStore } from '@/store'

const store = useStore()
console.log(store.state.count)

</script>

<style scoped lang='scss'>
// @import '@/styles/variables.scss';

.box {
  width: 200px;
  height: 200px;
  color: $color;
  background: url('@/assets/logo.png');
}
</style>
