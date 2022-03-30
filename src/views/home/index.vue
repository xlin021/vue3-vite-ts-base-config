<template>
  <h1>Home</h1>
  <!-- <h1>{{ $store.state.count }}</h1> -->
  <h1>{{ store.state.count }}</h1>
</template>

<script lang='ts' setup>
import { useStore } from '../../store'

const store = useStore()
console.log(store.state.count)

</script>

<style scoped lang='scss'></style>
