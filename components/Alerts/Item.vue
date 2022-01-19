<template>
  <div class="wrapper item alerts-item">
      {{item}}
  </div>
</template>

<script>
export default {
    props:{
        item:{
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
    .item{
        color:$red;
    }
</style>