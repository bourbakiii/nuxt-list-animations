<template>
  <div class="page underline-page">
      <span class="underline bebas">
          UNDERLINE
      </span>
  </div>
</template>

<script>
export default {
  name: "UnderlinePage"
  }
</script>
<style lang="scss" scoped>
.page{
    display: flex;align-items: center;justify-content: center;
    .underline{
        font-size: 80px;
        &:hover::before{
            animation: move_left 10s 
        }
        &::before{
            position: absolute;top:100%;
            left:0px; content:'';
            width:300%;
            height:0px;
            border: 1px dashed black;
        }
    }
}

</style>
