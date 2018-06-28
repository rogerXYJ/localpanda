<template>
    <div class="block">
    <el-slider
      v-model="value"
      :step="1"
      range
      :max="10">
    </el-slider>
  </div>
</template>
<script>
export default {
    data() {
      return {
        value: [4, 8],
        
      }
    }
  }
</script>
<style>
	
</style>