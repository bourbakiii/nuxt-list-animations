<template>
  <div class="page animation-page">
      <AnimationSlider/>
      <div class="content">
          <AnimationTodo/>
      </div>
  </div>
</template>

<script>
export default {
  name: 'AnimationPage'
}
</script>
<style lang="scss" scoped>
.content{
    width:100%;
    border-radius: 15px;
}
</style>
